import { useDispatch, useSelector } from "react-redux";

import styles from "./Aside.module.css";
import {
  resetFilters,
  resetMedicines,
  resetPage,
  setFilters,
  setPharmacyType,
} from "../../redux/medicines/slice";
import {
  selectFilters,
  selectPharmacyType,
} from "../../redux/medicines/selectors";
import Button from "../Button/Button";

const Aside = () => {
  const dispatch = useDispatch();
  const currentPharmacyType = useSelector(selectPharmacyType);

  const { priceFilter, dateFilter, nameFilter } = useSelector(selectFilters);

  const handleTypeClick = (filterName) => {
    if (filterName !== currentPharmacyType) {
      dispatch(setPharmacyType(filterName));
      dispatch(resetMedicines());
      dispatch(resetPage());
    }
  };

  const handleFiltersChange = (filterType, value) => {
    switch (filterType) {
      case "priceFilter":
        dispatch(setFilters({ filterType, value }));
        dispatch(resetMedicines());
        dispatch(resetPage());
        break;
      case "dateFilter":
        dispatch(setFilters({ filterType, value }));
        dispatch(resetMedicines());
        dispatch(resetPage());
        break;
      case "nameFilter":
        dispatch(setFilters({ filterType, value }));
        dispatch(resetMedicines());
        dispatch(resetPage());
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.aside}>
      <div>
        <h2>Shops:</h2>

        <ul className={styles.filters}>
          <li>
            <button
              type="button"
              className={`${styles.filterBtn} ${
                currentPharmacyType === "all" ? styles.selected : ""
              }`}
              onClick={() => handleTypeClick("all")}
            >
              All
            </button>
          </li>

          <li>
            <button
              type="button"
              className={`${styles.filterBtn} ${
                currentPharmacyType === "drugs" ? styles.selected : ""
              }`}
              onClick={() => handleTypeClick("drugs")}
            >
              Drugs
            </button>
          </li>

          <li>
            <button
              type="button"
              className={`${styles.filterBtn} ${
                currentPharmacyType === "pharmacy" ? styles.selected : ""
              }`}
              onClick={() => handleTypeClick("pharmacy")}
            >
              Pharmacy
            </button>
          </li>

          <li>
            <button
              type="button"
              className={`${styles.filterBtn} ${
                currentPharmacyType === "favorite" ? styles.selected : ""
              }`}
              onClick={() => handleTypeClick("favorite")}
            >
              Favorites
            </button>
          </li>
        </ul>
      </div>

      <div>
        <h2>Sort:</h2>

        <form>
          <label className={styles.label}>
            By price
            <select
              className={priceFilter !== "" ? styles.selectedFilter : ""}
              name="price-filter"
              value={priceFilter}
              onChange={(event) =>
                handleFiltersChange("priceFilter", event.target.value)
              }
            >
              <option value="" disabled hidden>
                Select filter
              </option>

              <option>Lowest to highest</option>
              <option>Highest to lowest</option>
            </select>
          </label>
          <label className={styles.label}>
            By date added
            <select
              className={dateFilter !== "" ? styles.selectedFilter : ""}
              name="date-filter"
              value={dateFilter}
              onChange={(event) =>
                handleFiltersChange("dateFilter", event.target.value)
              }
            >
              <option value="" disabled hidden>
                Select filter
              </option>

              <option>Latest to oldest</option>
              <option>Oldest to latest</option>
            </select>
          </label>
          <label className={styles.label}>
            By name
            <select
              className={nameFilter !== "" ? styles.selectedFilter : ""}
              name="name-filter"
              value={nameFilter}
              onChange={(event) =>
                handleFiltersChange("nameFilter", event.target.value)
              }
            >
              <option value="" disabled hidden>
                Select filter
              </option>

              <option>Alphabetically</option>
              <option>Reverse alphabetical order</option>
            </select>
          </label>
          <Button
            type={"button"}
            onClick={() => dispatch(resetFilters())}
            disabled={!priceFilter && !dateFilter && !nameFilter}
          >
            Reset filters
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Aside;
