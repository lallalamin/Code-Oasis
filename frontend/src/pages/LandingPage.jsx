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
  import React from 'react'
  import { useNavigate } from 'react-router-dom'
  import { useColorModeValue } from '@chakra-ui/react'
  import { useState } from 'react'
  
  
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
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
          if (data.success === true) {
            setStatus("Successfully joined the waitlist!");
            setEmail("");
          } else {
            setStatus("Something went wrong. Try again.");
          }
        } catch (error) {
          setStatus("Failed to submit. Check your connection.");
        }
      };


    return (
      <Box w="100%" minH="100vh" p={4}>
        {/* Hero Section */}
        <Box textAlign="center" py={16} as={motion.div} initial="hidden" animate="visible" variants={fadeIn}>
          <Flex justifyContent="center" alignItems="center" mb={4}>
            <Image src="/flower.png" alt="flower" maxW="22%" as={motion.img} initial="hidden" animate="visible" variants={fadeInDelay} />
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
  
        {/* About Section */}
        <Flex w="100%" textAlign="center" my={10} as={motion.div} initial="hidden" animate="visible" variants={fadeInDelay}>
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
  
        {/* Footer */}
        <Box bg="#99a661" color="black" py={12} textAlign="center" borderRadius="md" as={motion.div} initial="hidden" animate="visible" variants={fadeIn}>
          <Text fontSize="md"> CodeOasis: Empowering students to Connect, Collaborate, and Excel </Text>
        </Box>
      </Box>
  )
}  
  export default LandingPage
  