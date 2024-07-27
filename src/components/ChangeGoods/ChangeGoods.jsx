import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { toggleChangeGoods } from '../../redux/toggleSlice'
import { CloseButton } from '../CloseButton/CloseButton'
import { editSingleProduct, fetchSingleProduct } from '../../redux/singleProductSlice'
import { updateGoodsFetch } from '../../redux/goodsSlice'
import styles from './ChangeGoods.module.scss'


export const ChangeGoods = ({ id }) => {
  const dispatch = useDispatch()
  const product = useSelector(state => state.product.product)

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

  return (
    <div className="modal">
      {
        // questToggle &&
        // <AnswerModal string={isString} onClickOK={handleClickOK} />
      }
      <div className="modal__content">
        <CloseButton onClickClose={onClickClose} />
        <form className="form" id="newForm" onClick={onSubmit}>
          <label htmlFor="el1">title</label>
          <input type="text" name="title" id="el1" placeholder={product.title} />

          <label htmlFor="el2">price</label>
          <input type="number" name="price" id="el2" placeholder={product.price} />

          <label htmlFor="el3">description</label>
          <textarea type="textarea" name="description" id="el3" placeholder={product.description} />

          <input type="submit" placeholder="Create" defaultValue={'Create'} />
        </form>
      </div>
    </div>
  )
}