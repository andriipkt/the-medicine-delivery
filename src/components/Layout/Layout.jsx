import { Suspense } from "react";
import { useLocation } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { TailSpin } from "react-loader-spinner";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <NavLink
            className={location.pathname === "/" ? styles.active : ""}
            to="/"
          >
            Shop
          </NavLink>
          <NavLink
            className={
              location.pathname === "/shopping-cart" ? styles.active : ""
            }
            to="/shopping-cart"
          >
            Shopping Cart
          </NavLink>
        </nav>
      </header>

      <Suspense
        fallback={
          <div className={styles.loaderWrapper}>
            <TailSpin />
          </div>
        }
      >
        <div className={styles.container}>
          <Outlet />
        </div>
      </Suspense>
    </>
  );
};

export default Layout;
