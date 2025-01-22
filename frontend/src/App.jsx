import { Button } from "@chakra-ui/button"
import { Container } from "@chakra-ui/react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import SettingsPage from "./pages/SettingsPage"
import NewsPage from "./pages/NewsPage"
import Header from "./components/Header"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import LogoutButton from "./components/LogoutButton"
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";
import { Box } from "@chakra-ui/react"

function App() {
  const user = useRecoilValue(userAtom);
  const {pathname} = useLocation();
  return (
    <>
      <Box position={"relative"} w='full'>
        <Container maxW={pathname === "/" ? {base: "700px", md: "900px"} : "700px"}>
          <Header></Header>
          <Routes>
            <Route path='/' element={user ? <HomePage /> : <Navigate to="/auth" />}></Route>
            <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to="/" />}></Route>
            <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}></Route>

            <Route path='/:username' element={user ? (
              <>
                <UserPage />
                <CreatePost />
              </>
            )
              : (
                <UserPage />
              )
            } /> 
            <Route path='/:username/post/:pid' element={<PostPage/>} /> 
            <Route path='/chat' element={user ? <ChatPage/> : <Navigate to={"/auth"} />} /> 
            <Route path='/settings' element={user ? <SettingsPage/> : <Navigate to={"/auth"} />} /> 
            <Route path='/news' element={user ? <NewsPage/> : <Navigate to={"/auth"} />} /> 
          </Routes>
          
        </Container>
      </Box>
    </>
  )
}

export default App
