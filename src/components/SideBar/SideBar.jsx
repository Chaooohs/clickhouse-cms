import { NavLink } from "react-router-dom"

import styles from './SideBar.module.scss'


export const SideBar = () => {
  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <NavLink to='/admin/dashboard'> Dashboard</NavLink>
        <NavLink to='/admin/categories'> Categories</NavLink>
        <NavLink to='/admin/goods'> Goods</NavLink>
      </nav>
    </aside>
  )
}