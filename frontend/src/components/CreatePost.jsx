import React from 'react'
import { Button, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, Textarea } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import 

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [postText, setPostText] = useState("")
    const { handleImageChange, imgurl } = usePreviewImg();
    const imageRef = useRef(null);

    const handleTextChnage = (e) => {
        
    }
    
  return (
    <>
        <Button position={"fixed"} bottom={10} right={10} leftIcon={<AddIcon/>} bg={useColorModeValue("gray.300", "gray.dark")} onclick={onOpen}>
            Post
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
                <Textarea placeholder="Post content goes here ..." onChange={{handleTextChnage}} value={postText}/>
                <Text fontSize={"sxs"} fontWeight={"bold"} textAlign={"right"} m={"1"} color={"gray.800"}>
                  500/500
                </Text>
                <Input type='file' hidden ref={imageRef} onChange={handleImageChange}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost