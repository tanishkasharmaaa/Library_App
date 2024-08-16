
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home '
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Register from './pages/register'
import CreateBooks from './pages/createBooks'
import UpdateAndDelete from './pages/update&delete'


function App() {
  

  return (
    <>
      <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/dashboard' element={<Dashboard/>}/>
<Route path='/create' element={<CreateBooks/>}/>
<Route path='/update&delete' element={<UpdateAndDelete/>}/>
      </Routes>
    </>
  )
}

export default App
