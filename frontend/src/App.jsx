
import './App.css'
import { lazy,Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
// import Home from './pages/home '
// import Login from './pages/login'
// import Dashboard from './pages/dashboard'
// import Register from './pages/register'
// import CreateBooks from './pages/createBooks'
// import UpdateAndDelete from './pages/update&delete'
// import DisplayBook from './pages/displayBook'

const Home = lazy(()=>import("./pages/home "))
const Login = lazy(()=>import("./pages/login"))
const Dashboard = lazy(()=>import("./pages/dashboard"))
const Register = lazy(()=>import("./pages/register"))
const CreateBooks = lazy(()=>import("./pages/createBooks"));
const UpdateAndDelete = lazy(()=>import("./pages/update&delete"));
const DisplayBook = lazy(()=>import("./pages/displayBook"))



function App() {
  

  return (
    <>
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/dashboard' element={<Dashboard/>}/>
<Route path='/create' element={<CreateBooks/>}/>
<Route path='/update&delete' element={<UpdateAndDelete/>}/>
<Route path='/displayBook/:id' element={<DisplayBook/>}/>
      </Routes>
      </Suspense>
    </>
  )
}

export default App
