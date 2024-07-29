import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { deleteCategory, fetchCategories, resetCategoryDelStatus, updateCategoryFetch } from "../../redux/categoriesSlice"
import { toggleChangeCategory, toggleNewCategory } from "../../redux/toggleSlice"
import { AnswerModal, ChangeCategory, NewCategory } from "../../components"
import styles from './Categories.module.scss'


export const Categories = () => {
  const dispatch = useDispatch()
  const { categories, update, delStatus } = useSelector(state => state.categories)
  const {newCategory, changeCategory} = useSelector(state => state.toggle)
  const [answerToggle, setAnswerToggle] = useState(false)
  const [isStiring, setIsString] = useState()
  const [isChangeId, setIsChangeId] = useState()

  // получение списка категорий
  useEffect(() => {
    dispatch(fetchCategories())
  }, [update])


  // открытие модалки добавления новой категории
  const onToggle = () => {
    dispatch(toggleNewCategory(true))
  }

  // открытие модалки изменения категории
  const onChangeCategory = (id) => {
    dispatch(toggleChangeCategory(true))
    setIsChangeId(id)
  }

  //  функция удаления категории
  const onDeleteCategory = (id) => {
    dispatch(deleteCategory(id))
    dispatch(updateCategoryFetch(true))
  }

  // функция открытия окна Modal ответа на удаление
  useEffect(() => {
    if (delStatus === true) {
      setAnswerToggle(true)
      setIsString('Category deleted!')
    }
  }, [delStatus])

  // функция закрытия окна Modal ответа на удаление
  const handleClickOK = () => {
    setAnswerToggle(false)
    dispatch(resetCategoryDelStatus(false))
    dispatch(updateCategoryFetch(false))
  }

  // функция закрытия окна Modal ответа на добавление с помощью Enter
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      setAnswerToggle(false)
      dispatch(resetCategoryDelStatus(false))
      dispatch(updateCategoryFetch(false))
    }
  }


  return (
    <div className="layout">
      {
        newCategory &&
        <NewCategory />
      }
      {
        changeCategory &&
        <ChangeCategory id={isChangeId} />
      }
      {
        answerToggle &&
        <AnswerModal string={isStiring} onClickOK={handleClickOK} onKeyDown={onKeyDown} />
      }
      <h1 className="text-xl">Categories page</h1>
      <header className="header">
        <button className={`button text-md ${styles.button}`} onClick={onToggle}>New category</button>
      </header>
      <main className="main">
        <table className="text-md">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>image</th>
              <th>create</th>
              <th>update</th>
              <th colSpan={2}>actions</th>
            </tr>
          </thead>
          <tbody>
            {
              Array.isArray(categories) &&
              categories.map(categories => {
                return (
                  <tr key={categories.id}>
                    <td>{categories.id}</td>
                    <td>{categories.name}</td>
                    <td>
                      <img src={categories.image} alt="img" />
                    </td>
                    <td>{categories.creationAt?.slice(0, 10)}</td>
                    <td>{categories.updatedAt?.slice(0, 10)}</td>
                    <td>
                      <button onClick={() => onChangeCategory(categories.id)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => onDeleteCategory(categories.id)}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </main>
    </div>
  )
}