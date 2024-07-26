import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import qs from 'qs'

import { fetchGoods } from "../../redux/goodsSlice"
import { Pagination, SearchByTitle, Select } from "../../components"


export const Goods = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const goods = useSelector(state => state.goods.goods)
  const { categoryId, title, offset, limit } = useSelector(state => state.filters)


  useEffect(() => {
    const params = {
      categoryId,
      title,
      offset,
      limit,
    }
    dispatch(fetchGoods(params))
  }, [categoryId, title, offset])


  useEffect(() => {
    const queryString = qs.stringify({
      categoryId: categoryId === "" ? null : categoryId,
      title: title === "" ? null : title,
      offset,
      limit,
    }, { skipNulls: true })
    navigate(`?${queryString}`)
  }, [categoryId, title, offset])


  return (
    <div>
      <header className="header">
        <nav>
          <Select />
        </nav>
        <SearchByTitle />
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
              <th colspan='2'>actions</th>
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
                    <td>Edit</td>
                    <td>Delete</td>
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