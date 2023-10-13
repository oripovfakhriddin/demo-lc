import { Fragment, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashboardPage from "./pages/DashboardPage/DashboardPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import TeachersPage from "./pages/TeachersPage/TeachersPage"
import StudentsPage from "./pages/StudentsPage/StudentsPage"
import AdminLayout from "./components/adminLayout/AdminLayout"


function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("token"))

  return (
  <Fragment>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element= { <LoginPage setIsLogin = {setIsLogin} /> } />
        {isLogin ? <Route element={ <AdminLayout setIsLogin = {setIsLogin} /> }>
          <Route path="/dashboard" element={ <DashboardPage /> } />
          <Route path="/teachers" element={ <TeachersPage /> } />
          <Route path="/teachers:/teachersId"  element={ <StudentsPage /> } />
          <Route path="/students" element={ <StudentsPage /> } />
        </Route> : null}
        <Route path="*" element={ <NotFoundPage /> } />
      </Routes>
    </BrowserRouter>
  </Fragment>
  )
}

export default App
