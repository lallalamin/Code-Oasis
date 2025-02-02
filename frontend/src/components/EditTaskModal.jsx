import React, { useState } from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";

const EditTaskModal = ({ task, isOpen, onClose, onUpdate }) => {
  const [newTitle, setNewTitle] = useState(task.title);
  const showToast = useShowToast();

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/tasks/update/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });

      const data = await response.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      onUpdate(task._id, { title: newTitle });
      showToast("Success", "Task updated successfully!", "success");
      onClose(); // Close the modal
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter new task title"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTaskModal;
