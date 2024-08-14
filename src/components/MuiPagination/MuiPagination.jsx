import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';

import { addOffset } from '../../redux/filtersSlice';


export const MuiPagination = () => {
  const dispatch = useDispatch()
  const goods = useSelector(state => state.goods.goods)
  const allGoods = useSelector(state => state.goods.allGoods)
  let categoryId = useSelector(state => state.filters.categoryId)


  const onClick = (e) => {
    const num = e.target.innerText
    dispatch(addOffset(`${num}0`))
  }
  return (
    <Stack spacing={2} style={{marginTop: '48px'}}>
      <Pagination
        count={
          categoryId === "" 
          ?
          Math.floor(allGoods.length / 10)
          :
          Math.floor(goods.length / 10)
        }
        variant="outlined"
        color='warning'
        hidePrevButton
        hideNextButton
        // showFirstButton
        // showLastButton
        onClick={onClick}
      />
    </Stack>
  )
}