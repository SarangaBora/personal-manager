
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Contact from './components/Contacts'
import { LoginProvider } from './contexts/loginContext'

function App() {


  return (
    <>
      <BrowserRouter>
      <LoginProvider>
        <NavBar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contacts' element={<Contact />} />

          {/* <Route path='/signIn' element={<LoginPage/>}/> */}
        </Routes>
      </LoginProvider>
      </BrowserRouter>
    </>
  )
}

export default App
