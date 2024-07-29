import { NavLink } from "react-router-dom"

import styles from './SideBar.module.scss'


export const SideBar = () => {
  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <NavLink className='text-lg text-cap text-bd' to='/admin/dashboard'> Dashboard</NavLink>
        <NavLink className='text-lg text-cap text-bd' to='/admin/categories'> Categories</NavLink>
        <NavLink className='text-lg text-cap text-bd' to='/admin/goods'> Goods</NavLink>
      </nav>
    </aside>
  )
}