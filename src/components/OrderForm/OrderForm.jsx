import { useState } from "react";
import styles from "./OrderForm.module.css";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { sendOrder } from "../../redux/shoppingCart/operations";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import Notiflix from "notiflix";
import {
  selectCartItems,
  selectTotalPrice,
} from "../../redux/shoppingCart/selectors";
import { resetCart } from "../../redux/shoppingCart/slice";

const OrderForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;

      case "email":
        setEmail(value);
        break;

      case "phone":
        setPhone(value);
        break;

      case "address":
        setAddress(value);
        break;

      default:
        return "invalid input name";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const phoneRegex = /^[+]?[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]\d{4,6}$/im;
    if (!phoneRegex.test(phone)) {
      Notify.warning("Please enter a valid phone number");
      setPhone("");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Notify.warning("Please enter a valid email address");
      setEmail("");
      return;
    }

    if (!name.trim()) {
      Notify.warning("Please enter your name");
      setName("");
      return;
    }

    const addressRegex =
      /^[a-zA-Zа-яА-Я\s]+,\s*[a-zA-Zа-яА-Я\s]+,\s*\d+[a-zA-Zа-яА-Я\d\s]*$/;
    if (!addressRegex.test(address)) {
      Notify.warning(
        "Please enter a valid address in the format: City, street, building number"
      );
      setAddress("");
      return;
    }

    const itemsToSend = cartItems.map((item) => {
      const { name, price, type, favorite, quantity } = item;
      return { name, price, type, favorite, quantity };
    });

    const order = {
      name,
      email,
      phone,
      address,
      medicines: itemsToSend,
      totalPrice,
    };

    dispatch(sendOrder(order))
      .unwrap()
      .then(() => {
        Notiflix.Report.success(
          "Order submitted",
          "Please wait until our sales representative contacts you.",
          "Close"
        );

        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        dispatch(resetCart());
      })
      .catch(() => {
        Notiflix.Report.failure(
          "Order was not submitted",
          "Please contact our support team",
          "Close"
        );
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Name
        <input
          name="name"
          type="text"
          required
          placeholder="Please enter your name"
          onChange={handleChange}
          value={name}
        />
      </label>

      <label className={styles.label}>
        Email
        <input
          name="email"
          type="text"
          required
          placeholder="example@example.com"
          onChange={handleChange}
          value={email}
        />
      </label>

      <label className={styles.label}>
        Phone
        <input
          name="phone"
          type="text"
          required
          placeholder="123-456-7890"
          onChange={handleChange}
          value={phone}
        />
      </label>

      <label className={styles.label}>
        Address
        <input
          name="address"
          type="text"
          required
          placeholder="Please enter your address"
          onChange={handleChange}
          value={address}
        />
      </label>

      <Button type={"submit"} disabled={cartItems.length === 0}>
        Submit order
      </Button>
    </form>
  );
};

export default OrderForm;
