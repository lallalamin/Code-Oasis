import React from 'react'
import { Button, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, Textarea, Text, Input, Flex, CloseButton, Image } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { BsFillImageFill } from 'react-icons/bs'
import { useState, useRef } from 'react'
import usePreviewImg from '../hooks/usePreviewImg'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast'
import postsAtom from '../atoms/postsAtom'
import { useParams } from 'react-router-dom'

const MAX_CHAR = 500;

const CreatePost = ({user}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [postText, setPostText] = useState("")
    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
    const imageRef = useRef(null);
    const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
    const currentUser = useRecoilValue(userAtom);
    const showToast = useShowToast();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useRecoilState(postsAtom);
    const {username} = useParams();

    const handleTextChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length > MAX_CHAR) {
          const truncatedText = inputText.slice(0, MAX_CHAR);
          setPostText(truncatedText);
          setRemainingChar(0);
        }
        else {
          setPostText(inputText);
          setRemainingChar(MAX_CHAR - inputText.length);
        }
    };

    const handleCreatePost = async() => {
      setLoading(true);
      try {
        const res = await fetch("/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({postedBy: currentUser._id, text: postText, img: imgUrl}),
        })
  
        const data = await res.json();
        if(data.error){
          showToast("Error", data.error, "error");
          return;
        }
  
        showToast("Success", "Post created successfully", "success");
        if(username === currentUser.username){
          setPosts([data, ...posts]);
        }
        onClose();
        setPostText("");
        setImgUrl("");
      } catch (error) {
          showToast("Error", data.error, "error");
      } finally{
        setLoading(false);
      }
    };
    
  return (
    <>
        {currentUser?._id === user._id && (
          <>
          <Button leftIcon={<AddIcon/>} bg={useColorModeValue("gray.300", "gray.dark")} onClick={onOpen}>
              Create Post
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                  <Textarea placeholder="Post content goes here ..." onChange={handleTextChange} value={postText}/>
                  <Text fontSize={"sxs"} fontWeight={"bold"} textAlign={"right"} m={"1"} color={"gray.500"}>
                    {remainingChar}/{MAX_CHAR}
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
              <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
                Create Post
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
          </>
        )}
    </>
  )
}

export default CreatePost