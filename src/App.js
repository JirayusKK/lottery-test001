import './App.scss'
import { BrowserRouter, Route, Routes, Outlet} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Lotter from './components/Rand/Lottery'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Lotter />} />
          <Route path='*' element={<Outlet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
  