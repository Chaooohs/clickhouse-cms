import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import { fetchCategories } from "../../redux/categories"



export const Categories = () => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.categories)


  useEffect(() => {
    dispatch(fetchCategories())
  }, [])


  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>image</th>
            <th>create</th>
            <th>update</th>
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
                  <td>{categories.creationAt.slice(0, 10)}</td>
                  <td>{categories.updatedAt.slice(0, 10)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </main>
  )
}