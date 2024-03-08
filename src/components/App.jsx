import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Shop from "../pages/Shop";
import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect } from "react";
import {
  selectFilters,
  selectPage,
  selectPharmacyType,
} from "../redux/medicines/selectors";
import { fetchMedicines } from "../redux/medicines/operations";

const ShoppingCart = lazy(() => import("../pages/ShoppingCart"));

function App() {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const pharmacyType = useSelector(selectPharmacyType);
  const { priceFilter, dateFilter, nameFilter } = useSelector(selectFilters);

  useEffect(() => {
    dispatch(
      fetchMedicines({
        page,
        type: pharmacyType,
        price: priceFilter,
        date: dateFilter,
        name: nameFilter,
      })
    );
  }, [dateFilter, dispatch, nameFilter, page, pharmacyType, priceFilter]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Shop />} />
          <Route path="shopping-cart" element={<ShoppingCart />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
