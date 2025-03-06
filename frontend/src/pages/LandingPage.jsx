import { 
  Flex, Text, Box, Heading, Button, Image, 
  SimpleGrid, Input, Accordion, AccordionItem,
  AccordionButton, AccordionPanel, AccordionIcon, Link
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'
import "../styles/background.scss";
import { useLocation } from 'react-router-dom';
import { TbFreeRights } from "react-icons/tb";
import { BsPersonArmsUp } from "react-icons/bs";
import { MdConnectWithoutContact } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { FaCirclePlay, FaS } from "react-icons/fa6";
import { FaShuffle } from "react-icons/fa6";
import { GiBottomRight3dArrow } from "react-icons/gi";
import { IoPlayOutline } from "react-icons/io5";
import { IoPlayBackOutline } from "react-icons/io5";
import { IoPlayForwardOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";


// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

const fadeInDelay = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
}

const scaleHover = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.3 }
}

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MotionBox = motion(Box);

  useEffect(() => {
      const fetchEmailCount = async () => {
          try {
              const response = await fetch("/api/users/emailCount");
              const data = await response.json();

              setCount(data.count);
          } catch (error) {
              console.error("Error fetching email count:", error);
          }
      };
  
      fetchEmailCount();
  }, []);

  const handleSubmit = async () => {
      if (!email) {
        setStatus("Please enter a valid email.");
        return;
      }

      if (!emailRegex.test(email)) {
          setStatus("Please enter a valid email address.");
          return;
        }
    
      try {
        const response = await fetch("/api/users/sub", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
    
        const data = await response.json();

        if (data.error) {
          setStatus("Something went wrong. Try again.");
          return;
        }
          setStatus("Successfully joined the waitlist! Thank you! ");
          setCount(count + 1);
          setEmail("");
      
      } catch (error) {
        setStatus("Failed to submit. Check your connection.");
      }
    };


  return (
    <Box className='landing-page' w="100%" position={"relative"} minH="100vh" p={4}>
      {isLandingPage && (
      <Box className="gradient-bg" top="0" left="0" w="100%" h="100%" zIndex="-1">
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
        </div>
      </Box>
    )}
      {/* Hero Section */}
      <Box textAlign="center" py={16} as={motion.div} initial="hidden" animate="visible" variants={fadeIn}>
        <Flex justifyContent="center" alignItems="center" mb={4}>
          <Heading size="2xl">
            Learn. <Heading size="2xl" as="span" color="#99a661"> Connect. </Heading> Grow Together.
          </Heading>
        </Flex>
        <Text fontSize="lg" mb={6}>
          Break barriers, build connections, and thrive in a supportive community designed for growth and productivity.
        </Text>
        <Flex direction="column" align="center" w="100%">
          <Flex
          w="100%"
          maxW="500px"
          p={4}
          flexDirection="column"
          alignItems="center"
          >
          <Text fontSize="lg" mb={3} fontWeight="bold">
              {count} people have joined the waitlist!
          </Text>
          <Input
              w="100%"
              placeholder="Enter your email"
              size="md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              as={motion.input}
              initial="hidden"
              animate="visible"
              variants={fadeInDelay}
              bg={useColorModeValue("white", "gray.800")}
              color={useColorModeValue("black", "white")}
              border="1px solid"
              borderColor={useColorModeValue("gray.300", "gray.600")}
              mb={3}
          />
          <Button 
              size="lg" 
              bg="#f4a258" 
              color="black" 
              _hover={{ bg: "#ffbf86" }}
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              onClick={handleSubmit}
              w="100%"
          >
              Join the waitlist for launch updates!
          </Button>
          {status && <Text mt={3} fontSize="sm" color="gray.500">{status}</Text>}
          </Flex>
      </Flex>
      </Box>

      {/* Video Section */}
      <Flex justify="center" align="center" flexDirection="column" mt={12} mb={12} textAlign="center">
      {/* Heading with Animated Icon */}
      <Flex align="center" gap={2}>
        <Heading size="lg" fontWeight="bold">
          Watch Current Stage Demo
        </Heading>
        <motion.div 
          initial={{ rotate: 0 }} 
          animate={{ rotate: [0, -10, 10, 0] }} 
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <BsStars size={24} color="#99a661" />
        </motion.div>
      </Flex>

      <Text fontSize="md" color="gray.500" mt={2} mb={3}>
        See how CodeOasis works in action!
      </Text>

      {/* Video Container with Soft Rounded Frame */}
      <MotionBox
        as="iframe"
        src="https://player.vimeo.com/video/1063322542?autoplay=1&loop=1&transparent=1&background=0"
        width="80%"
        maxW="800px"
        height= {{ base: "200px", md: "450px" }}
        mt={6}
        borderRadius="12px"
        bg={"transparent"}
        boxShadow="0px 8px 24px rgba(0, 0, 0, 0.2)"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      ></MotionBox>
        <Flex mb={16} mt={4} flexDirection={"row"} gap={6} justifyContent={"center"} alignItems={"center"}>
          <FaShuffle size={24} />
          <IoPlayBackOutline size={24} />
          <FaCirclePlay size={35} />
          <IoPlayOutline size={24} />
          <IoPlayForwardOutline size={24} />
        </Flex>
      </Flex>

      {/* About Section */}
      <Flex w="100%" textAlign="center"  my={12} as={motion.div} initial="hidden" animate="visible" variants={fadeInDelay}>
        <Flex flex={6} flexDirection="column" justifyContent="center" alignItems="center" mx={5}>
          <Heading size="md" mb={4}>
            Stronger Together—More Than Just a Network, a Community
          </Heading>
          <Text maxW="xl" fontSize="sm">
            CodeOasis is where mentorship and collaboration fuel real growth. More than just a platform, 
            it's a space where meaningful connections turn into opportunities, and ideas become impact. 
            Whether you're mentoring, learning, or building together, we create a future where everyone thrives.
          </Text>
        </Flex>
        <Flex flex={4} alignItems="center" justifyContent="center">
          <Image src="/people.png" alt="people" maxW="100%" as={motion.img} initial="hidden" animate="visible" variants={fadeInDelay} />
        </Flex>
      </Flex>

      {/* Features Section */}
      <Box py={16}>
        <Heading size="lg" textAlign="center" mb={8} as={motion.div} initial="hidden" animate="visible" variants={fadeIn}>
          Features
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {[
            { title: "Meaningful Connections", text: "Easily connect with like-minded tech enthusiasts, mentors, and peers. Build relationships that inspire, support, and push each other forward in a welcoming, uplifting space.", color: "#f4a258", img: "connect.png" },
            { title: "Peer-to-Peer Mentorship", text: "Everyone has something to learn and something to share. Whether you're guiding others or seeking advice, CodeOasis makes mentorship accessible, casual, and impactful—without the formality.", color: "#99a661", img: "/peer.png" },
            { title: "Career Resources", text: "Find career development tools that prepare you for industry challenges.", color: "#f7e6cf", img: "/career.png" },
            { title: "Stay Ahead with Tech News", text: "Keep up with the latest trends, breakthroughs, and updates in the tech world—all in one place. Stay informed and ready for what's next.", color: "#f7e6cf", img: "/news.png" },
            { title: "Gamified Productivity", text: "Stay motivated with a fun, gamified to-do list where you earn points for completing tasks, track progress on leaderboards, and celebrate achievements with the community.", color: "#f4a258", img: "/todo.png" },
            { title: "Shared Event Calendar", text: "Stay in the loop with upcoming hackathons, workshops, conferences, and networking events.", color: "#99a661", img: "calendar.png" },
            { title: "Discover Your Coding Personality", text: "Take the CodeOasis quiz to uncover your unique mascot! Learn your coding style and connect with others who share similar strengths.", color: "#99a661", img: "/quiz.png"}
          ].map((feature, index) => (
            <Flex 
              key={index} 
              bg={feature.color} 
              color="black" 
              boxShadow="md" 
              borderRadius="lg" 
              p={6} 
              height={"100%"}
              flexDirection={"column"}
              alignItems="center"
              justifyContent="space-between"
              textAlign="center"
              as={motion.div}
              initial="hidden"
              animate="visible"
              variants={fadeInDelay}
              whileHover="whileHover"
              {...scaleHover}
            >
              <Heading size="md" mb={4}>{feature.title}</Heading>
              <Image src={feature.img} alt="image" maxW="50%" mb={4} mx="auto" />
              <Text fontSize="sm" flexGrow={1}>{feature.text}</Text>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
      <Flex flexDirection={{ base: "column", md: "row" }} >
        <Flex flexDirection={"column"} flex={3}>
          <Text fontSize="2xl" fontWeight="bold">Any Question?</Text> 
          <Text fontSize="2xl" fontWeight="bold">We got you.</Text>
          <Image src="/characters/hugo_question.png" alt="hugo" maxW={{ base: "60%", md: "80%"}} as={motion.img} initial="hidden" animate="visible" variants={fadeInDelay} mt={4} />         
        </Flex>
        <Flex flex={7}>
          <Accordion allowToggle w="100%">
            <AccordionItem>
              <AccordionButton>
                <Flex flex="1" textAlign="left" fontWeight={"bold"} flexDirection={"row"} gap={2}>
                  <BsPersonArmsUp size={20} />
                  Who is CodeOasis for?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                CodeOasis is for tech enthusiasts, high school students interested in tech, and anyone looking for mentorship, resources, and events in the field.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Flex flex="1" textAlign="left" fontWeight={"bold"} flexDirection={"row"} gap={2}>
                  <MdConnectWithoutContact size={20} />
                  How can I join CodeOasis?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                You can sign up by joining the waitlist and be the first to access the platform when it launches!
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Flex flex="1" textAlign="left" fontWeight={"bold"} flexDirection={"row"} gap={2}>
                  <IoShareSocialOutline size={20} />
                  How can I stay updated on CodeOasis?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                Follow us on 
                <Link color={"#3b82f6"} href="https://www.linkedin.com/company/codeoasis/" target="_blank"> LinkedIn</Link> or
                <Link color={"#3b82f6"} href="https://www.instagram.com/codeoasis.official/" target="_blank"> Instagram</Link> to stay updated on CodeOasis! 
                
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Flex flex="1" textAlign="left" fontWeight={"bold"} flexDirection={"row"} gap={2}>
                  <TbFreeRights size={20} />
                  Is CodeOasis free to use?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                Yes! CodeOasis is free for everyone to use.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Flex flex="1" textAlign="left" fontWeight={"bold"} flexDirection={"row"} gap={2}>
                  <FaMobileAlt size={20} />
                  Is there a mobile app for CodeOasis?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                Currently, CodeOasis is web-based, but we plan to explore a mobile version in the future!
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Flex flex="1" textAlign="left" fontWeight={"bold"} flexDirection={"row"} gap={2}>
                  <MdOutlineFeedback size={20} />
                  How do I report an issue or give feedback?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                We value your feedback and love to hear from you! Contact us at hello.codeoasis@gmail.com for any feedback or issues.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Flex flex="1" textAlign="left" fontWeight={"bold"} flexDirection={"row"} gap={2}>
                  <MdOutlineRocketLaunch size={20} />
                  When will CodeOasis launch?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                We're aiming to release a beta version by May 2025! 
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Flex>
    </Box>
)
}  
export default LandingPage
