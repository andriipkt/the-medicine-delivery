import styles from "./Button.module.css";

const Button = ({ children, disabled, ...restProps }) => {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
