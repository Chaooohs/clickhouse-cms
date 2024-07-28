import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { categoryPostStatus, newCategory } from "../../redux/categoriesSlice"
import { updateCategoryFetch } from "../../redux/categoriesSlice"
import { CloseButton } from "../CloseButton/CloseButton"
import { toggleNewCategory } from "../../redux/toggleSlice"
import { AnswerModal } from "../AnswerModal/AnswerModal"




export const NewCategory = () => {
  const dispatch = useDispatch()
  const postStatus = useSelector(state => state.categories.postStatus)
  const [answerToggle, setAnswerToggle] = useState(false)
  const [isString, setIsString] = useState(false)

  // функция закрытия
  const onClickClose = () => {
    dispatch(toggleNewCategory(false))
  }

  // функция отправки формы на сервер
  const onSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(newForm)

    const name = data.get('name')
    const image = data.get('image')

    if (name && image) {

      const a = {
        name,
        image,
      }
      dispatch(newCategory(a))
      dispatch(updateCategoryFetch(true))
    }
  }

  // функция открытия окна Modal ответа на добавление
  useEffect(() => {
    if (postStatus === 'success') {
      setAnswerToggle(true)
      setIsString('Category created!')
    }
  }, [postStatus])

  // функция закрытия окна Modal ответа на добавление
  const handleClickOK = () => {
    setAnswerToggle(false)
    dispatch(categoryPostStatus('idle'))
    dispatch(updateCategoryFetch(false))
  }

  // функция закрытия окна Modal ответа на добавление с помощью Enter
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      setAnswerToggle(false)
      dispatch(categoryPostStatus('idle'))
      dispatch(updateCategoryFetch(false))
    }
  }

  return (
    <div className="modal">
      {
        answerToggle &&
        <AnswerModal string={isString} onClickOK={handleClickOK} onKeyDown={onKeyDown} />
      }
      <div className="modal__content">
        <CloseButton onClickClose={onClickClose} />
        <form className="form" id="newForm" >
          <label className="text-md text-cap" htmlFor="el1">name</label>
          <input type="text" name="name" id="el1" />

          <label className="text-md text-cap" htmlFor="el5">image</label>
          <input type="text" name="image" id="el5" />

          <input
            type="submit"
            placeholder="Create"
            defaultValue={'Create'}
            onClick={onSubmit}
            className="button"
          />
        </form>
      </div>
    </div>
  )
}