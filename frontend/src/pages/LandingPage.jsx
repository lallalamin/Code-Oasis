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
import { GrResources } from "react-icons/gr";
import { IoPlayOutline } from "react-icons/io5";
import { IoPlayBackOutline } from "react-icons/io5";
import { IoPlayForwardOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { SiCodementor } from "react-icons/si";
import { ImNewspaper } from "react-icons/im";


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

const validateEmail = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!inputs.email.match(emailRegex)) {
    setInputsError((prev) => ({
      ...prev,
      email: 'Please enter a valid email address',
    }));
  } else {
    setInputsError((prev) => ({
      ...prev,
      email: '',
    }));
  } 
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
          setStatus(data.error);
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
          <Button as={RouterLink} to="/about" mt={6} size="md" borderRadius="full" bg="#f4a258"color="black" _hover={{ bg: "#ffbf86" }} >
            Story behind CodeOasis🌱
          </Button>
        </Flex>
        <Flex flex={4} alignItems="center" justifyContent="center">
          <Image src="/people.png" alt="people" maxW="100%" as={motion.img} initial="hidden" animate="visible" variants={fadeInDelay} />
        </Flex>
      </Flex>

      {/* Features Section */}
      <Box py={16} >
        <Heading size="lg" textAlign="center" mb={8} as={motion.div} initial="hidden" animate="visible" variants={fadeIn}>
          Features
        </Heading>
        
        <Flex flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" alignItems="center">
          <Box
            w="16rem"
            bg="rgba(255, 255, 255, 0.1)"
            boxShadow="0px 0px 15px rgba(0,0,0,0.09)"
            p="9"
            spaceY="3"
            position="relative"
            overflow="hidden"
            borderRadius="lg"
            mb={8}
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={fadeInDelay}
            whileHover="whileHover"
            {...scaleHover}
          >
            {/* Circle with Number */}
            <Box
              w="6rem"
              h="6rem"
              bg={"#99a661"}
              borderRadius="full"
              position="absolute"
              top="-1.75rem"
              right="-1.25rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="2xl" fontWeight="bold">
                01
              </Text>
            </Box>

            {/* Icon */}
            <Box color="violet.500" w="3rem">
              <SiCodementor size={65} />
            </Box>

            {/* Title */}
            <Heading as="h1" fontSize="xl" fontWeight="bold" pb={2}>
              Peer-to-Peer Mentorship.
            </Heading>

            {/* Description */}
            <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")} lineHeight="1.5">
              Everyone has something to learn and share. Whether guiding or seeking advice, CodeOasis makes mentorship easy, casual, and impactful—without the formality.
            </Text>
          </Box>

          <Box
          w="16rem"
          bg="rgba(255, 255, 255, 0.1)"
          boxShadow="0px 0px 15px rgba(0,0,0,0.09)"
          p="9"
          spaceY="3"
          position="relative"
          overflow="hidden"
          borderRadius="lg"
          mb={8}
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={fadeInDelay}
          whileHover="whileHover"
          {...scaleHover}
        >
          {/* Circle with Number */}
          <Box
            w="6rem"
            h="6rem"
            bg={"#99a661"}
            borderRadius="full"
            position="absolute"
            top="-1.75rem"
            right="-1.25rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="2xl" fontWeight="bold">
              02
            </Text>
          </Box>

          {/* Icon */}
          <Box color="violet.500" w="3rem">
            <IoCalendarOutline size={62} />
          </Box>

          {/* Title */}
          <Heading as="h1" fontSize="xl" fontWeight="bold" pb={2}>
            Shared Event Calendar.
          </Heading>

          {/* Description */}
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")} lineHeight="1.5">
            Explore and contribute to a shared calendar of hackathons, workshops, conferences, and networking events—all in one place to help you stay connected.
          </Text>
        </Box>

        <Box
          w="16rem"
          bg="rgba(255, 255, 255, 0.1)"
          boxShadow="0px 0px 15px rgba(0,0,0,0.09)"
          p="9"
          spaceY="3"
          position="relative"
          overflow="hidden"
          borderRadius="lg"
          mb={8}
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={fadeInDelay}
          whileHover="whileHover"
          {...scaleHover}
        >
          {/* Circle with Number */}
          <Box
            w="6rem"
            h="6rem"
            bg={"#99a661"}
            borderRadius="full"
            position="absolute"
            top="-1.75rem"
            right="-1.25rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="2xl" fontWeight="bold">
              03
            </Text>
          </Box>

          {/* Icon */}
          <Box color="violet.500" w="3rem">
            <ImNewspaper size={65} />
          </Box>

          {/* Title */}
          <Heading as="h1" fontSize="xl" fontWeight="bold" pb={2}>
            Stay Ahead with Tech News.
          </Heading>

          {/* Description */}
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")} lineHeight="1.5">
          Keep up with the latest trends, breakthroughs, and updates in the tech world—all in one place. Stay informed and ready for what's next.
          </Text>
        </Box>
        </Flex>

        <Flex flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" alignItems="center">
          <Box
            w="30rem"
            bg="rgba(255, 255, 255, 0.1)"
            boxShadow="0px 0px 15px rgba(0,0,0,0.09)"
            p="9"
            spaceY="3"
            position="relative"
            overflow="hidden"
            borderRadius="lg"
            mb={12}
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={fadeInDelay}
            whileHover="whileHover"
            {...scaleHover}
          >
            {/* Circle with Number */}
            <Box
              w="6rem"
              h="6rem"
              bg={"#99a661"}
              borderRadius="full"
              position="absolute"
              top="-1.75rem"
              right="-1.25rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="2xl" fontWeight="bold">
                04
              </Text>
            </Box>
            {/* Title */}
            <Heading as="h1" fontSize="xl" fontWeight="bold" pb={2}>
              Gamified Productivity
            </Heading>

            {/* Description */}
            <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")} lineHeight="1.5">
              Stay motivated with a fun, gamified to-do list where you earn points for completing tasks
            </Text>
            <Image src="/dailytask.png" alt="news"mx="auto" mt={4} borderRadius={15} />
          </Box>

          <Box
            w="20rem"
            bg="rgba(255, 255, 255, 0.1)"
            boxShadow="0px 0px 15px rgba(0,0,0,0.09)"
            p="9"
            spaceY="3"
            position="relative"
            overflow="hidden"
            borderRadius="lg"
            mb={12}
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={fadeInDelay}
            whileHover="whileHover"
            {...scaleHover}
          >
            {/* Circle with Number */}
            <Box
              w="6rem"
              h="6rem"
              bg={"#99a661"}
              borderRadius="full"
              position="absolute"
              top="-1.75rem"
              right="-1.25rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="2xl" fontWeight="bold">
                05
              </Text>
            </Box>
            {/* Title */}
            <Heading as="h1" fontSize="xl" fontWeight="bold" pb={2}>
              Leaderboard
            </Heading>

            {/* Description */}
            <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")} lineHeight="1.5">
              Track progress on leaderboards, and celebrate achievements with the community
            </Text>
            <Flex flexDirection="column" gap={4} align="center" >
              {/* Podium Display */}
              <Flex justifyContent="flex-end" alignItems="flex-end" >
                  <Box textAlign="center" mx={2}>

                      <Flex flexDirection="column" alignItems="center" mt={2}>
                          <Image src="/leaderboard/silver-cup.png" w="40px" />
                          <Flex bg="gray.400" w="80px" h="160px" borderRadius="md" alignItems="flex-end" justifyContent="center" >
                              <Text color={"black"} w={"full"} bg="gray.200" m={3} borderRadius="md" fontSize="sm" fontWeight="bold"></Text>
                          </Flex>
                      </Flex>
                  </Box>
                  <Box textAlign="center" mx={2}>
                      <Flex flexDirection="column" alignItems="center" mt={2}>
                          <Image src="/leaderboard/gold-cup.png" w="40px" />
                          <Flex bg="gold" w="80px" h="195px" borderRadius="md" alignItems="flex-end" justifyContent="center" >
                              <Text color={"black"} w={"full"} bg="yellow.100" m={3} borderRadius="md" fontSize="sm" fontWeight="bold"></Text>
                          </Flex>
                      </Flex>
                  </Box>
                  <Box textAlign="center" mx={2}>
                      <Flex flexDirection="column" alignItems="center" mt={2}>
                          <Image src="/leaderboard/bronze-cup.png" w="40px" />
                          <Flex bg="orange.800" w="80px" h="120px" borderRadius="md" alignItems="flex-end" justifyContent="center" >
                              <Text color={"black"} w={"full"} bg="orange.200" m={3} borderRadius="md" fontSize="sm" fontWeight="bold"></Text>
                          </Flex>
                      </Flex>
                  </Box>
              </Flex>
            </Flex>
          </Box>
        </Flex>

        <Flex flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" alignItems="center">
          <Box
            w="16rem"
            bg="rgba(255, 255, 255, 0.1)"
            boxShadow="0px 0px 15px rgba(0,0,0,0.09)"
            p="9"
            spaceY="3"
            position="relative"
            overflow="hidden"
            borderRadius="lg"
            mb={8}
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={fadeInDelay}
            whileHover="whileHover"
            {...scaleHover}
          >
            {/* Circle with Number */}
            <Box
              w="6rem"
              h="6rem"
              bg={"#99a661"}
              borderRadius="full"
              position="absolute"
              top="-1.75rem"
              right="-1.25rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="2xl" fontWeight="bold">
                06
              </Text>
            </Box>

            {/* Icon */}
            <Box color="violet.500" w="3rem">
              <GrResources size={65} />
            </Box>

            {/* Title */}
            <Heading as="h1" fontSize="xl" fontWeight="bold" pb={2}>
              Career + Upskills Resources Bank
            </Heading>

            {/* Description */}
            <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")} lineHeight="1.5">
              Explore coding tutorials, interview prep materials, project-building guides, networking tips, and job search strategies—all in one place. 
            </Text>
          </Box>

          <Box
            w={{ base: "16rem", md: "34rem" }}
            bg="rgba(255, 255, 255, 0.1)"
            boxShadow="0px 0px 15px rgba(0,0,0,0.09)"
            p="9"
            spaceY="3"
            position="relative"
            overflow="hidden"
            borderRadius="lg"
            mb={8}
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={fadeInDelay}
            whileHover="whileHover"
            {...scaleHover}
          >
            {/* Circle with Number */}
            <Box
              w="6rem"
              h="6rem"
              bg={"#99a661"}
              borderRadius="full"
              position="absolute"
              top="-1.75rem"
              right="-1.25rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="2xl" fontWeight="bold">
                07
              </Text>
            </Box>

            {/* Title */}
            <Heading as="h1" fontSize="xl" fontWeight="bold" pb={2}>
              Discover Your Coding Personality
            </Heading>

            {/* Content*/}
            <Flex flexDirection={{ base: "column", md: "row" }} justifyContent={"space-between"} alignItems="center" gap={2} >
              <Image src="/characters/everyone.png" alt="connect" w={"250px"} my={7}/>
              <Flex flexDirection={"column"}>
                <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")} lineHeight="1.5" mb={6} textAlign={"center"}>
                  Take the CodeOasis quiz to uncover your unique mascot! Learn your coding style and connect with others who share similar strengths.
                </Text>
                <Button borderRadius={"full"}>Coming Soon!</Button>
              </Flex>
            </Flex>
          </Box>
        </Flex>
        

          
{/* 
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {[
            { title: "Meaningful Connections", text: "Easily connect with like-minded tech enthusiasts, mentors, and peers. Build relationships that inspire, support, and push each other forward in a welcoming, uplifting space.", color: "#f4a258", img: "connect.png" },
            { title: "Career Resources", text: "Find career development tools that prepare you for industry challenges.", color: "#f7e6cf", img: "/career.png" },
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
        </SimpleGrid> */}
        
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
                We're aiming to release a beta version by Fall 2025! 
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Flex>
      
    </Box>
)
}  
export default LandingPage
