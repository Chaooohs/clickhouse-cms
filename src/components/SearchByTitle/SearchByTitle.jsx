import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce"

import { addTitle } from "../../redux/filtersSlice";
import { CloseButton } from '../CloseButton/CloseButton'
import search from '/public/image/svg/search.svg'
import styles from './SearchByTitle.module.scss'


export const SearchByTitle = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [isSearch, setIsSearch] = useState(false)


  // очищает инпут поиска
  useEffect(() => {
    if (!isSearch) {
      setValue('')
      dispatch(addTitle(''))
    }
  }, [isSearch])

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
      setIsSearch(true)
    }
  };

  // заменяет кнопку очистки поля ввода
  const handleClearSearch = () => {
    setIsSearch(false)
  }

  return (
    <form className={styles.search}>
      <input
        className={styles.search__input}
        type="text"
        id="byName"
        value={value}
        onChange={onSearchByTitle}
        placeholder="Search by title"
      />
      <div className={styles.search__button}>
        {
          !isSearch
            ?
            <img className={styles.search__icon} src={search} alt="search" />
            :
            <CloseButton onClickClose={handleClearSearch} />
        }
      </div>
    </form>
  )
}