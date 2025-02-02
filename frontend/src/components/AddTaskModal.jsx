import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Text
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import useShowtoast from "../hooks/useShowToast";
import { useRecoilValue, useRecoilState,  } from "recoil";
import userAtom from "../atoms/userAtom.js";
import tasksAtom from "../atoms/tasksAtom.js";
import { useParams } from "react-router-dom";

const MAX_CHAR = 50;

const AddTaskModal = ({ onTaskAdd }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const user = useRecoilValue(userAtom);
  const showToast = useShowtoast();
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const {username} = useParams();

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setTitle(truncatedText);
      setRemainingChar(0);
    } else {
      setTitle(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const handleAddTasK = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      const data = await response.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      
      if(username === user.username) {
        setTasks([data, ...tasks]);
        onTaskAdd(data);
      }
      onClose();
      setTitle("");
      showToast("Success", "Task added successfully", "success");

    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button leftIcon={<FaPlus />} size="sm" onClick={onOpen}>
        Add Task
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Task Title</FormLabel>
              <Input
                value={title}
                onChange={handleTextChange}
                placeholder="Enter task title"
              />
              <Text fontSize={"sm"} mt={2}>
                {remainingChar}/{MAX_CHAR}
              </Text>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddTasK} isLoading={loading}>
              Add Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTaskModal;
