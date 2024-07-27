import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { toggleNewGoods } from "../../redux/toggleSlice"
import { CloseButton } from '../CloseButton/CloseButton'
import { newGood, togglePostStatus, updateGoodsFetch } from "../../redux/goodsSlice"
import { AnswerModal } from "../AnswerModal/AnswerModal"


export const NewGoods = () => {
  const dispatch = useDispatch()
  const postStatus = useSelector(state => state.goods.postStatus)
  const [questToggle, setQuestToggle] = useState(false)
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
    if(postStatus === 'success'){
      setQuestToggle(true)
      setIsString('Product saved!')
    } 
  }, [postStatus])
  
  // функция закрытия окна Modal ответа на добавление
  const handleClickOK = () => {
    setQuestToggle(false)
    dispatch(togglePostStatus('idle'))
  }


  return (
    <div className="modal">
      {
        questToggle &&
        <AnswerModal string={isString} onClickOK={handleClickOK} />
      }
      <div className="modal__content">
        <CloseButton onClickClose={onClickClose} />
        <form className="form" id="newForm" onClick={onSubmit}>
          <label htmlFor="el1">title</label>
          <input type="text" name="title" id="el1" />

          <label htmlFor="el2">price</label>
          <input type="number" name="price" id="el2" />

          <label htmlFor="el3">description</label>
          <input type="textarea" name="description" id="el3" />

          <label htmlFor="el4">categoryId</label>
          <input type="number" name="categoryId" id="el4" />

          <label htmlFor="el5">images</label>
          <input type="text" name="images" id="el5" />

          <input type="submit" placeholder="Create" defaultValue={'Create'} />
        </form>
      </div>
    </div>
  )
}