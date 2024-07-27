import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import qs from 'qs'

import { deleteGoods, fetchGoods, resetDelStatus, updateGoodsFetch } from "../../redux/goodsSlice"
import { NewGoods, Pagination, AnswerModal, SearchByTitle, Select, ChangeGoods } from "../../components"
import { toggleChangeGoods, toggleNewGoods } from "../../redux/toggleSlice"
import { resetOffset } from "../../redux/filtersSlice"


export const Goods = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { goods, update, delStatus } = useSelector(state => state.goods)
  const { categoryId, title, offset, limit, } = useSelector(state => state.filters)
  const { newGoods, changeGoods } = useSelector(state => state.toggle)
  const [answerToggle, setAnswerToggle] = useState(false)
  const [isStiring, setIsString] = useState()
  const [isChangeId, setIsChangeId] = useState()


  // отправка запроса
  useEffect(() => {
    const params = {
      categoryId,
      title,
      offset,
      limit,
    }
    dispatch(fetchGoods(params))
    dispatch(updateGoodsFetch(false))
  }, [categoryId, title, offset, update])

  // запись в адресную строку
  useEffect(() => {
    const queryString = qs.stringify({
      categoryId: categoryId === "" ? null : categoryId,
      title: title === "" ? null : title,
      offset,
      limit,
    }, { skipNulls: true })
    navigate(`?${queryString}`)
  }, [categoryId, title, offset])

  // обнуление offset при смене категории
  useEffect(() => {
    dispatch(resetOffset(0))
  }, [categoryId])

  // открытие модалки добавления нового товара
  const onToggle = () => {
    dispatch(toggleNewGoods(true))
  }

  const onChangeGoods = (id) => {
    dispatch(toggleChangeGoods(true))
    setIsChangeId(id)
  }

  //  функция удаления продукта
  const onDeleteGoods = (id) => {
    dispatch(deleteGoods(id))
    dispatch(updateGoodsFetch(true))
  }

  // функция открытия окна Modal ответа на удаление
  useEffect(() => {
    if (delStatus) {
      setAnswerToggle(true)
      setIsString('Product deleted!')
    }
  }, [delStatus])

  // функция закрытия окна Modal ответа на удаление
  const handleClickOK = () => {
    setAnswerToggle(false)
    dispatch(resetDelStatus(false))
  }

  // функция закрытия окна Modal ответа на добавление с помощью Enter
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      setAnswerToggle(false)
      dispatch(resetDelStatus(false))
    }
  }

  return (
    <div>
      {
        newGoods &&
        <NewGoods />
      }
      {
        changeGoods &&
        <ChangeGoods id={isChangeId} />
      }
      {
        answerToggle &&
        <AnswerModal string={isStiring} onClickOK={handleClickOK} onKeyDown={onKeyDown}/>
      }
      <header className="header">
        <nav>
          <Select />
        </nav>
        <SearchByTitle />
        <button onClick={onToggle}>New Product</button>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>category</th>
              <th>title</th>
              <th>price $</th>
              <th>image</th>
              <th>create</th>
              <th>update</th>
              <th colSpan={2}>actions</th>
            </tr>
          </thead>
          <tbody>
            {
              Array.isArray(goods) &&
              goods.map(prod => {
                return (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>{prod.category.name}</td>
                    <td>{`${prod.title.slice(0, 20)}...`}</td>
                    <td>{prod.price}</td>
                    <td className='images'>
                      {
                        prod.images?.map((img, index) => {
                          return (
                            <img src={img} alt="img" key={index} />
                          )
                        })
                      }
                    </td>
                    <td>{prod.creationAt.slice(0, 10)}</td>
                    <td>{prod.updatedAt.slice(0, 10)}</td>
                    <td>
                      <button onClick={() => onChangeGoods(prod.id)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => onDeleteGoods(prod.id)}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <Pagination />
      </main>
    </div>
  )
}