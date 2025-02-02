import { 
    Flex, 
    Text, 
    Box, 
    Heading, 
    Button, 
    Image, 
    SimpleGrid, 
    Input
  } from '@chakra-ui/react'
  import { Link as RouterLink } from 'react-router-dom'
  import { motion } from 'framer-motion'
  import React, { useEffect } from 'react'
  import { useNavigate } from 'react-router-dom'
  import { useColorModeValue } from '@chakra-ui/react'
  import { useState } from 'react'
  import "../styles/background.scss";
  import { useLocation } from 'react-router-dom';
  
  
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
              Connect. Learn. Grow Together.
            </Heading>
          </Flex>
          <Text fontSize="lg" mb={6}>
            Break barriers, build connections, and thrive in a supportive community designed for growth and productivity.
          </Text>
          <Flex direction="column" align="center" w="100%">
            <Flex
            w="100%"
            maxW="500px"
            bg={useColorModeValue("gray.100", "gray.700")}
            p={4}
            borderRadius="md"
            flexDirection="column"
            alignItems="center"
            boxShadow="md"
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

        <Box mt={12} textAlign="center">
          <Heading size="lg" mb={4}>
            Watch Current Stage Demo
          </Heading>
          <Box
            as="iframe"
            src="https://www.youtube.com/embed/BjSgUg7vUHM"
            width="100%"
            maxW="800px"
            height="450px"
            mx="auto"
            borderRadius="md"
            boxShadow="lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></Box>
        </Box>
  
        {/* About Section */}
        <Flex w="100%" textAlign="center" my={12} as={motion.div} initial="hidden" animate="visible" variants={fadeInDelay}>
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
  
      </Box>
  )
}  
  export default LandingPage
  