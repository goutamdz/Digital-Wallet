import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { SendMoney } from './pages/SendMoney'
import {Dashboard} from './pages/Dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/send' element={<SendMoney/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </>
  )
}

export default App
