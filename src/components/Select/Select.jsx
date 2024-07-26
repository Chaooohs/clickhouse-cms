import { useDispatch, useSelector } from "react-redux"
import { addCategoryId } from "../../redux/filtersSlice"


export const Select = () => {
  const dispatch = useDispatch()
  const categories  = useSelector(state => state.categories.categories)

  const onSelect = (e) => { 
      const id = e.target.value
      dispatch(addCategoryId(id))
  }

  return (
    <select name="categories" id="cat" onChange={onSelect}>
      <option value='' selected >All</option>
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