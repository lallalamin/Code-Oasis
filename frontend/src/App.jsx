import { Button } from "@chakra-ui/button"
import { Container } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import HomePage from "./pages/HomePage"
import Header from "./components/Header"

function App() {

  return (
    <>
      <Container maxW="620px">
        <Header></Header>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/:username' element={<UserPage/>} /> 
          <Route path='/:username/post/:pid' element={<PostPage/>} /> 
        </Routes>
      </Container>
    </>
  )
}

export default App
