import Aside from "../components/Aside/Aside";
import DrugsList from "../components/DrugsList/DrugsList";

const Shop = () => {
  return (
    <main>
      <section>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Aside />
          <DrugsList />
        </div>
      </section>
    </main>
  );
};

export default Shop;
