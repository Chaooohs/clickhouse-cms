import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { toggleChangeGoods } from '../../redux/toggleSlice'
import { CloseButton } from '../CloseButton/CloseButton'
import { editSingleProduct, fetchSingleProduct, toggleEditStatus } from '../../redux/singleProductSlice'
import { updateGoodsFetch } from '../../redux/goodsSlice'
import { AnswerModal } from '../AnswerModal/AnswerModal'
import styles from './ChangeGoods.module.scss'


export const ChangeGoods = ({ id }) => {
  const dispatch = useDispatch()
  const {product, editStatus} = useSelector(state => state.product)
  const [answerToggle, setAnswerToggle] = useState(false)
  const [isString, setIsString] = useState(false)

  // фунция получения продукта по id
  useEffect(() => {
    dispatch(fetchSingleProduct(id))
  }, [id])

  // функция закрытия
  const onClickClose = () => {
    dispatch(toggleChangeGoods(false))
  }

  //функция отправки формы на сервер
  const onSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(newForm)

    const title = data.get('title')
    const price = data.get('price')
    const description = data.get('description')

    const a = {
      id,
      title: title === '' ? product.title : title,
      price: price === '' ? product.price : price,
      description: description === '' ? product.description : description,
    }
    dispatch(editSingleProduct(a))
    dispatch(updateGoodsFetch(true))
  }

  // функция открытия окна Modal ответа на добавление
  useEffect(() => {
    if(editStatus === 'success'){
      setAnswerToggle(true)
      setIsString('Product updated!')
    } 
  }, [editStatus])
  
  // функция закрытия окна Modal ответа на добавление
  const handleClickOK = () => {
    setAnswerToggle(false)
    dispatch(toggleEditStatus('idle'))
  }

  return (
    <div className="modal">
      {
        answerToggle &&
        <AnswerModal string={isString} onClickOK={handleClickOK} />
      }
      <div className="modal__content">
        <CloseButton onClickClose={onClickClose} />
        <form className="form" id="newForm" >
          <label htmlFor="el1">title</label>
          <input type="text" name="title" id="el1" placeholder={product.title} />

          <label htmlFor="el2">price</label>
          <input type="number" name="price" id="el2" placeholder={product.price} />

          <label htmlFor="el3">description</label>
          <textarea type="textarea" name="description" id="el3" placeholder={product.description} />

          <input type="submit" placeholder="Create" defaultValue={'Create'} onClick={onSubmit} />
        </form>
      </div>
    </div>
  )
}