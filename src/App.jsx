import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'
import List from './Pages/List'
import Hotel from './Pages/Hotel'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Success from './Pages/Success'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
        <Route path='/Hotels' element={<List/>}></Route>
        <Route path='/Hotel/:id' element={<Hotel/>}></Route>
        <Route path='/paymentsuccess' element={<Success/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
