import React from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'


const MAX_CHAR = 50;

const AddEventModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
    const [eventInfo, setEventInfo] = useState({
        title: "",
        eventType: "",
        eligibility: "",
        description: "",
        date: "",
        time: "",
        timezone: "",
        location: "",
        link: "",
    });
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
                value={eventInfo.title}
                placeholder="Enter event title"
                />
                <Text fontSize={"sm"} mt={2}>
                {remainingChar}/{MAX_CHAR}
                </Text>
            </FormControl>
            </ModalBody>
            <ModalFooter>
            <Button colorScheme="blue" isLoading={isLoading}>
                Add Event
            </Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
  )
}

export default AddEventModal