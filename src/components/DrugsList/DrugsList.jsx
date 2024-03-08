import { useDispatch, useSelector } from "react-redux";

import styles from "./DrugsList.module.css";
import DrugsItem from "./DrugsItem/DrugsItem";
import { TailSpin } from "react-loader-spinner";
import {
  selectError,
  selectIsLoading,
  selectMedicines,
} from "../../redux/medicines/selectors";
import { setPage } from "../../redux/medicines/slice";
import { useRef } from "react";

const DrugsList = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectMedicines);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const listEndRef = useRef(null);

  const onLoadMore = () => {
    dispatch(setPage());

    setTimeout(() => {
      if (listEndRef.current) {
        listEndRef.current.scrollTop = listEndRef.current.scrollHeight;
      }
    }, 200);
  };

  return (
    <>
      {data.length !== 0 && !error ? (
        <div className={styles.listWrapper}>
          <ul className={styles.list} ref={listEndRef}>
            {data.map((item) => {
              return <DrugsItem key={item._id} item={item} page={"shop"} />;
            })}
          </ul>

          {data.length % 8 === 0 &&
            (isLoading ? (
              <TailSpin
                width={50}
                height={50}
                wrapperStyle={{
                  marginTop: "30px",
                  justifyContent: "center",
                }}
              />
            ) : (
              <button onClick={onLoadMore}>Load more</button>
            ))}
        </div>
      ) : (
        <div className={styles.statusInfo}>
          <p>{error && error.message}</p>
        </div>
      )}
    </>
  );
};

export default DrugsList;
