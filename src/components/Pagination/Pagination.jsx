import { useDispatch, useSelector } from "react-redux";

import styles from "./Pagination.module.scss";
import { addOffset } from "../../redux/filtersSlice";

export const Pagination = () => {
  const dispatch = useDispatch();
  let offset = useSelector(state => state.filters.offset);


  const increment = () => {
    let a = parseInt(offset)
    dispatch(addOffset(a += 10))
  }
  const decrement = () => dispatch(addOffset(Math.max(0, offset -= 10)))


  return (
    <div className={styles.box}>
      <button className={`text-id ${styles.button}`} onClick={decrement}>
        prev
      </button>
      <button className={`text-id ${styles.button}`} onClick={increment}>
        next
      </button>

    </div>
  );
};
