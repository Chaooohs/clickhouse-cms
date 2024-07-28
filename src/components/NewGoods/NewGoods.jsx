import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { toggleNewGoods } from "../../redux/toggleSlice"
import { CloseButton } from '../CloseButton/CloseButton'
import { newGood, togglePostStatus, updateGoodsFetch } from "../../redux/goodsSlice"
import { AnswerModal } from "../AnswerModal/AnswerModal"


export const NewGoods = () => {
  const dispatch = useDispatch()
  const postStatus = useSelector(state => state.goods.postStatus)
  const [answerToggle, setAnswerToggle] = useState(false)
  const [isString, setIsString] = useState(false)


  // функция закрытия
  const onClickClose = () => {
    dispatch(toggleNewGoods(false))
  }

  // функция отправки формы на сервер
  const onSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(newForm)

    const title = data.get('title')
    const price = data.get('price')
    const description = data.get('description')
    const categoryId = data.get('categoryId')
    const images = data.get('images')

    if (title && price && description && categoryId && images) {

      const a = {
        title,
        price,
        description,
        categoryId,
        images: [images],
      }
      dispatch(newGood(a))
      dispatch(updateGoodsFetch(true))
    }
  }

  // функция открытия окна Modal ответа на добавление
  useEffect(() => {
    if (postStatus === 'success') {
      setAnswerToggle(true)
      setIsString('Product created!')
    }
  }, [postStatus])

  // функция закрытия окна Modal ответа на добавление
  const handleClickOK = () => {
    setAnswerToggle(false)
    dispatch(togglePostStatus('idle'))
  }

  // функция закрытия окна Modal ответа на добавление с помощью Enter
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      setAnswerToggle(false)
      dispatch(togglePostStatus('idle'))
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
          <label className="text-md text-cap" htmlFor="el1">title</label>
          <input type="text" name="title" id="el1" />

          <label className="text-md text-cap" htmlFor="el2">price</label>
          <input type="number" name="price" id="el2" />

          <label className="text-md text-cap" htmlFor="el3">description</label>
          <input type="textarea" name="description" id="el3" />

          <label className="text-md text-cap" htmlFor="el4">categoryId</label>
          <input type="number" name="categoryId" id="el4" />

          <label className="text-md text-cap" htmlFor="el5">images</label>
          <input type="text" name="images" id="el5" />

          <input
            className="button"
            type="submit"
            placeholder="Create"
            defaultValue={'Create'}
            onClick={onSubmit}
          />
        </form>
      </div>
    </div>
  )
}