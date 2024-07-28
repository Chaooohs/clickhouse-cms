import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import { addCategoryId } from "../../redux/filtersSlice"
import { fetchCategories } from "../../redux/categoriesSlice"


export const Select = () => {
  const dispatch = useDispatch()
  const categories  = useSelector(state => state.categories.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const onSelect = (e) => { 
      const id = e.target.value
      dispatch(addCategoryId(id))
  }

  return (
    <select name="categories" id="cat" onChange={onSelect}>
      <option value='' defaultValue >All</option>
      {
        Array.isArray(categories) &&
        categories.map(category => {
          return (
            <option value={category.id} key={category.id} >{category.name}</option>
          )
        })
      }
    </select>
  )
}