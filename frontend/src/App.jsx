import { Button } from "@chakra-ui/button"
import { Container } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import Header from "./components/Header"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import LogoutButton from "./components/LogoutButton"
import UpdateProfilePage from "./pages/UpdateProfilePage";

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <>
      <Container maxW="620px">
        <Header></Header>
        <Routes>
          <Route path='/' element={user ? <HomePage /> : <Navigate to="/auth" />}></Route>
          <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to="/" />}></Route>
          <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}></Route>

          <Route path='/:username' element={<UserPage/>} /> 
          <Route path='/:username/post/:pid' element={<PostPage/>} /> 
        </Routes>
        {user && <LogoutButton/>}
      </Container>
    </>
  )
}

export default App
