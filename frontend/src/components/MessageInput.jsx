import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { IoSendSharp } from 'react-icons/io5'
import useShowToast from '../hooks/useShowToast'
import { useRecoilValue } from 'recoil'
import { selectedConversationAtom } from '../atoms/messagesAtom'

const MessageInput = (setMessages) => {


  const handleSendMessage = async(e) => {
    cont [messageText, setMessageText] = useState("");
    const showToast = useShowToast();
    const selectedConversation = useRecoilValue(selectedConversationAtom);

    e.preventDefault()
    if(!messageText)  return;

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },        
        body: JSON.stringify({
          message: messageText, 
          recipientId: selectedConversation._id,
        }),
      })

      const data = await res.json();

      if(data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      setMessages((messages) => [...messages, data]);

      setMessageText("");

    } catch (error) {
      showToast("Error", error.message, "error");
    }
    
  }

  return (
    <form onSubmit={handleSendMessage}>
        <InputGroup>
            <Input w={"full"} placeholder='Type a message...'/>
            <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
                <IoSendSharp/>
            </InputRightElement>
        </InputGroup>
    </form>
  )
}

export default MessageInput