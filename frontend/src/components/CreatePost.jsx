import React from 'react'
import { Button, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, Textarea, Text, Input, Flex, CloseButton, Image } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { BsFillImageFill } from 'react-icons/bs'
import { useState, useRef } from 'react'
import usePreviewImg from '../hooks/usePreviewImg'

const MAX_CHAR = 500;

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [postText, setPostText] = useState("")
    const { handleImageChange, imgUrl, setImgurl } = usePreviewImg();
    const imageRef = useRef(null);
    const [remainingChar, setRemainingChar] = useState(MAX_CHAR);

    const handleTextChange = (e) => {
        const inputText = e.target.value;
    };

    const handleCreatePost = async() => {

    };
    
  return (
    <>
        <Button position={"fixed"} bottom={10} right={10} leftIcon={<AddIcon/>} bg={useColorModeValue("gray.300", "gray.dark")} onClick={onOpen}>
            Post
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
                <Textarea placeholder="Post content goes here ..." onChange={{handleTextChange}} value={postText}/>
                <Text fontSize={"sxs"} fontWeight={"bold"} textAlign={"right"} m={"1"} color={"gray.800"}>
                  500/500
                </Text>
                <Input type='file' hidden ref={imageRef} onChange={handleImageChange}/>
                <BsFillImageFill style={{marginLeft:"5px", cursor:"pointer"}} size={16} onClick={() => imageRef.current.click()}/>
            </FormControl>
            {imgUrl && (
              <Flex mt={5} w={"full"} position={"relative"}> 
                <Image src={imgUrl} alt='post image' />
                <CloseButton onClick={()=> setImgUrl("")} bg={"gray.800"} position={"absolute"} top={2} right={2}/>
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleCreatePost}>
              Post
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost