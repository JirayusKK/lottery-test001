import { Outlet } from 'react-router-dom'
import '../SASS/Layout.scss'

const Layout = () => {
  return (
    <>
      <div className="App">
        <Outlet />
      </div>
    </>
  )
}

export default Layout

//เหมือนจะไม่ได้ใช้แต่ใส่ไปก่อนเผื่อมีหลายหน้า