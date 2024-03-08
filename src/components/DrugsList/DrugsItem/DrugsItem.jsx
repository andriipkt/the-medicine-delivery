import { useDispatch, useSelector } from "react-redux";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import styles from "./DrugsItem.module.css";
import placeholder from "../../../assets/drug-1674890_1280.webp";
import { addOrder } from "../../../redux/shoppingCart/slice";
import { selectCartItems } from "../../../redux/shoppingCart/selectors";
import Button from "../../Button/Button";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { updateFavorite } from "../../../services/updateFavorite";
import { useState } from "react";
import { selectPharmacyType } from "../../../redux/medicines/selectors";
import { removeNonFavorites } from "../../../redux/medicines/slice";

const DrugsItem = ({ item }) => {
  const dispatch = useDispatch();
  const shoppingCartItems = useSelector(selectCartItems);
  const [isFavorite, setIsFavorite] = useState(item.favorite);
  const pharmacyType = useSelector(selectPharmacyType);

  const onFavoriteClick = async (id, isFavorite) => {
    try {
      await updateFavorite(id, { favorite: !isFavorite });
      setIsFavorite(!isFavorite);
      if (!isFavorite) {
        Notify.success("Added to favorites");
      } else {
        Notify.warning("Removed from favorites");
      }

      if (pharmacyType === "favorite") {
        dispatch(removeNonFavorites(id));
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const onAddBtnClick = () => {
    dispatch(addOrder(item));
    Notify.success("Added to shopping cart");
  };

  const isItemInCart =
    shoppingCartItems.length !== 0
      ? shoppingCartItems.some((cartItem) => cartItem._id === item._id)
      : null;

  const { name, type, price, _id } = item;

  return (
    <li className={styles.item}>
      <img src={placeholder} alt="pills" />

      <span className={styles.favWrapper}>
        <button
          type="button"
          className={`${styles.favBtn} ${isFavorite ? styles.favorite : ""}`}
          onClick={() => onFavoriteClick(_id, isFavorite)}
        >
          <FaHeart style={{ width: "25px", height: "25px" }} />
        </button>
      </span>

      <div className={styles.info}>
        <div>
          <h3>{name}</h3>
          <p className={styles.type}>{type}</p>
        </div>
        <p className={styles.price}>${price}</p>
      </div>

      {isItemInCart ? (
        <p className={styles.note}>Product is added</p>
      ) : (
        <Button type={"button"} onClick={onAddBtnClick}>
          Add to cart
          <FaShoppingCart />
        </Button>
      )}
    </li>
  );
};

export default DrugsItem;
