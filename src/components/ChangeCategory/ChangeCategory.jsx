import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { editCategory, fetchCategories, fetchSingleCategory, resetCategoryChangeStatus, updateCategoryFetch } from '../../redux/categoriesSlice'
import { toggleChangeCategory } from '../../redux/toggleSlice'
import { CloseButton } from '../CloseButton/CloseButton'
import { AnswerModal } from '../AnswerModal/AnswerModal'


export const ChangeCategory = ({ id }) => {
  const dispatch = useDispatch()
  const { singleCategory, editStatus } = useSelector(state => state.categories)
  const [answerToggle, setAnswerToggle] = useState(false)
  const [isString, setIsString] = useState(false)

  // фунция получения продукта по id
  useEffect(() => {
    dispatch(fetchSingleCategory(id))
  }, [id])

  // функция закрытия
  const onClickClose = () => {
    dispatch(toggleChangeCategory(false))
  }

  //функция отправки формы на сервер
  const onSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(newForm)

    const name = data.get('name')

    const a = {
      id,
      name: name === '' ? singleCategory.name : name,
    }
    dispatch(editCategory(a))
    dispatch(updateCategoryFetch(true))
  }

  // функция открытия окна Modal ответа на добавление
  useEffect(() => {
    if (editStatus === 'success') {
      setAnswerToggle(true)
      setIsString('Product updated!')
    }
  }, [editStatus])

  // функция закрытия окна Modal ответа на добавление
  const handleClickOK = () => {
    setAnswerToggle(false)
    dispatch(resetCategoryChangeStatus('idle'))
    dispatch(updateCategoryFetch(false))
  }

  // функция закрытия окна Modal ответа на добавление с помощью Enter
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      setAnswerToggle(false)
      dispatch(resetCategoryChangeStatus('idle'))
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
          <label htmlFor="el1" className='text-md text-cap'>name</label>
          <input type="text" name="name" id="el1" placeholder={singleCategory.name} />

          <input
            type="submit"
            placeholder="Create"
            defaultValue={'Create'}
            onClick={onSubmit}
            className='button'
          />
        </form>
      </div>
    </div>
  )
}