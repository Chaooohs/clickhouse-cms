import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce"

import { addTitle } from "../../redux/filtersSlice";


export const SearchByTitle = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')

  // задержка поиска и отправка запроса
  const searchValueByTimer = useCallback(
    debounce((value) => {
      dispatch(addTitle(value))
    }, 1000),
    []
  );

  // проверка на отсутствие цифр
  const regSearch = (value) => {
    let rgx = /^[a-zа-я]*$/gi;
    return rgx.test(value);
  };

  // получение водимого поиска
  const onSearchByTitle = (e) => {
    const value = e.target.value;
    if (regSearch(value)) {
      searchValueByTimer(value);
      setValue(value)
    }
  };

  return (
    <form>
      <label htmlFor="byName">Search by title</label>
      <input type="text" id="byName" defaultValue={value} onChange={onSearchByTitle} />
    </form>
  )
}