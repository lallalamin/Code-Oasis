import React from 'react'
import { Button, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, Textarea } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                <Textarea placeholder="Post content goes here ..." onChange={{handleTextChnage}}/>
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