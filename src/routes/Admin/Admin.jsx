import { Outlet } from "react-router-dom"
import { SideBar } from "../../components"

export const Admin = () => {

  return (
    <div className="page">
      <SideBar />
      <Outlet />
    </div>
  )
}