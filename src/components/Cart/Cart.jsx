import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectTotalPrice,
} from "../../redux/shoppingCart/selectors";
import styles from "./Cart.module.css";
import placeholder from "../../assets/drug-1674890_1280.webp";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeOrder, updateQuantity } from "../../redux/shoppingCart/slice";

const Cart = () => {
  const shoppingCartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  const handleRemoveOrder = (id) => {
    dispatch(removeOrder(id));
  };

  const handleQuantityChange = ({ target: { value } }, id) => {
    const quantity = value > 1 ? value : 1;
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div>
      <p className={styles.totalPrice}>
        Total Price: <span>{totalPrice}</span>
      </p>

      {shoppingCartItems.length !== 0 ? (
        <ul className={styles.cartItemsWrapper}>
          {shoppingCartItems.map(({ _id, name, price, quantity }) => (
            <li key={_id} className={styles.cartItem}>
              <img src={placeholder} alt="pills" />

              <div className={styles.info}>
                <div className={styles.itemHeader}>
                  <h3>{name}</h3>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleRemoveOrder(_id)}
                  >
                    <MdDelete style={{ width: "30px", height: "30px" }} />
                  </button>
                </div>

                <p className={styles.price}>
                  Price: <span>{price * quantity}</span>
                </p>

                <label className={styles.label}>
                  Quantity
                  <input
                    min="1"
                    type="number"
                    value={quantity > 0 ? quantity : 1}
                    onChange={(event) =>
                      handleQuantityChange(event, _id, price)
                    }
                  />
                </label>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>Cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
