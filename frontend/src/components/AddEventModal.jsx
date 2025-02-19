import React from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'

const AddEventModal = () => {
    const [isLoading, setIsLoading] = useState(false);
  return (
    <>
        <Button leftIcon={<FaPlus />} size="sm" onClick={onOpen}>
        Add Event
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Add New Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <FormControl>
                <FormLabel>Event Title</FormLabel>
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
            <Button colorScheme="blue" isLoading={loading}>
                Add Event
            </Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
  )
}

export default AddEventModal