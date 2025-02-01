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
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import useShowtoast from "../hooks/useShowToast";
import { useRecoilValue, useRecoilState,  } from "recoil";
import userAtom from "../atoms/userAtom.js";
import tasksAtom from "../atoms/tasksAtom.js";
import { useParams } from "react-router-dom";

const MAX_CHAR = 50;

const AddTaskModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const user = useRecoilValue(userAtom);
  const showToast = useShowtoast();
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const {username} = useParams();

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
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddTasK}>
              Add Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTaskModal;
