import { Button } from "@chakra-ui/button"
import { Container } from "@chakra-ui/react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import SettingsPage from "./pages/SettingsPage"
import NewsPage from "./pages/NewsPage"
import EventPage from "./pages/EventPage"
import LandingPage from "./pages/LandingPage"
import LeaderboardPage from "./pages/LeaderboardPage"
import MentorshipPage from "./pages/MentorshipPage"
import ResourcePage from "./pages/ResourcePage"
import Header from "./components/Header"
import Footer from "./components/Footer"
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
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        position="relative"
        w="full"
      >
        <Container
          as="header"
          maxW={pathname === "/home" || pathname === "/" || pathname === "/events" ? { base: "620px", md: "900px" } : "620px"}
          py={4}
        >
          <Header />
        </Container>

        <Container
          as="main"
          flex="1"
          maxW={pathname === "/home" || pathname === "/" || pathname === "/events" ? { base: "620px", md: "900px" } : "620px"}
          py={4}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={user ? <HomePage /> : <Navigate to="/auth" />} />
            <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/home" />} />
            <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />
            <Route path="/:username" element={user ? <><UserPage /></> : <UserPage />} />
            <Route path="/:username/post/:pid" element={<PostPage />} />
            <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/auth" />} />
            <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/auth" />} />
            <Route path="/news" element={user ? <NewsPage /> : <Navigate to="/auth" />} />
            <Route path="/events" element={user ? <EventPage /> : <Navigate to="/auth" />} />
            <Route path="/leaderboard" element={user ? <LeaderboardPage /> : <Navigate to="/auth" />} />
            <Route path="/mentorship" element={user ? <MentorshipPage /> : <Navigate to="/auth" />} />
            <Route path="/resources" element={user ? <ResourcePage /> : <Navigate to="/auth" />} />
          </Routes>
        </Container>

        <Container
          as="footer"
          maxW={pathname === "/home" || pathname === "/"  || pathname === "/events"  ? { base: "700px", md: "900px" } : "700px"}
          py={4}
          mt="auto"
          position={"relative"}
        >
          <Footer />
        </Container>
      </Box>
    </>
  )
}

export default App
