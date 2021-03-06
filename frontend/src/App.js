import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
// components
import About from 'components/About'
import Admin from 'components/Admin'
import { Login } from 'components/login/Login'
import Error from 'components/Error'
import Form from 'components/Form'
import Home from 'components/Home'
import Layout from 'components/Layout'
import List from 'components/List'
import { Register } from 'components/login/Register'
import { ResetPassword } from 'components/login/ResetPassword'
import { ProtectedRoute } from 'components/ProtectedRoute'
// Context
import { AuthProvider } from './context/AuthContext'

function App () {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route
                path='list'
                element={
                  <ProtectedRoute>
                    <List />
                  </ProtectedRoute>
                }
              />
              <Route path='add' element={<ProtectedRoute><Form /></ProtectedRoute>} />
              <Route path='edit/:id' element={<ProtectedRoute><Form edit /></ProtectedRoute>} />
              <Route path='delete/:id' element={<ProtectedRoute><List /></ProtectedRoute>} />
              <Route path='*' element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </>
  )
}

export default App
