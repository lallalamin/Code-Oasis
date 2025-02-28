import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, FormControl,
  FormLabel, Input, VStack, useDisclosure, Text, Select, Flex, Box, List, ListItem,
  Textarea
} from '@chakra-ui/react';
import { useJsApiLoader } from '@react-google-maps/api';
import { FaPlus } from 'react-icons/fa';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import 'react-datepicker/dist/react-datepicker.css';
import debounce from 'lodash.debounce';

const MAX_CHAR = 50;
const libraries = ['places'];
const timezones = ['CST', 'EST', 'PST', 'MST'];
const eventTypes = ['Workshop', 'Conference', 'Hackathon', 'Fellowship', 'Meetup', 'Networking Event', 'Career Fair', 'Panel Discussion', 'Other'];
const eligibilityOptions = ['Open to All', 'Undergraduates Only', 'Professionals Only', 'Graduate Students Only', 'High School Students Only'];

const AddEventModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const [eventInfo, setEventInfo] = useState({
    title: '',
    eventType: '',
    eligibility: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    registrationDeadline: new Date(),
    time: '',
    timezone: '',
    location: '',
    lat: null,
    lng: null,
    isVirtual: false,
    isInPerson: false,
    link: ''
  });

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setEventInfo((prev) => ({ ...prev, title: truncatedText }));
      setRemainingChar(0);
    } else {
      setEventInfo((prev) => ({ ...prev, title: inputText }));
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  }

  const handleSelect = async (address) => {
    setEventInfo((prev) => ({ ...prev, location: address }));
  
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
  
      setEventInfo((prev) => ({
        ...prev,
        location: address,
        lat: latLng.lat,
        lng: latLng.lng,
      }));
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const debouncedSetLocation = useCallback(
    debounce((address) => {
      setEventInfo((prev) => ({ ...prev, location: address }));
    }, 3000), 
    []
  );
  
  const handleLocationChange = (address) => {
    setEventInfo((prev) => ({ ...prev, location: address }));
    if (address.length >= 3) {
      debouncedSetLocation(address); 
    }
  };

  return (
    <>
      <Button leftIcon={<FaPlus />} onClick={onOpen}>
        Add Event
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Event Title</FormLabel>
                <Input
                  value={eventInfo.title}
                  onChange={handleTextChange}
                  placeholder="Enter event title"
                />
                <Text fontSize="sm">{remainingChar}/{MAX_CHAR}</Text>
              </FormControl>

              <FormControl>
                <FormLabel>Location</FormLabel>
                {!isLoaded ? (
                  <Text>Loading...</Text> // Show a loading message until the API is ready
                ) : (
                  <PlacesAutocomplete
                    value={eventInfo.location}
                    onChange={handleLocationChange}
                    onSelect={handleSelect}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <Box position="relative">
                        <Input
                          {...getInputProps({ placeholder: "Enter location... (min 3 chars)" })}
                          _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
                        />
                        {eventInfo.location.length < 3 && <Text fontSize="sm" color="gray.500">Type at least 3 characters...</Text>}
                        {suggestions.length > 0 && eventInfo.location.length >= 3 && (
                          <List
                            position="absolute"
                            w="100%"
                            borderRadius="md"
                            boxShadow="md"
                            zIndex="10"
                            mt={1}
                            overflow="hidden"
                            bg="white"
                          >
                            {loading && <ListItem p={2}>Loading...</ListItem>}
                            {suggestions.map((suggestion, index) => {
                              const { key, ...suggestionProps } = getSuggestionItemProps(suggestion);
                              return (
                                <ListItem
                                  key={suggestion.placeId || index}
                                  {...suggestionProps}
                                  p={2}
                                  cursor="pointer"
                                  fontWeight="bold"
                                  color={"black"}
                                  _hover={{ bg: "gray.100" }}
                                >
                                  {suggestion.description}
                                </ListItem>
                              );
                            })}
                          </List>
                        )}
                      </Box>
                    )}
                  </PlacesAutocomplete>
                )}
              </FormControl>


              <FormControl>
                <FormLabel>Event Link</FormLabel>
                <Input
                  value={eventInfo.link}
                  onChange={(e) => setEventInfo({ ...eventInfo, link: e.target.value })}
                  placeholder="Enter URL"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Event Type</FormLabel>
                <Select
                  placeholder="Select event type"
                  onChange={(e) => setEventInfo({ ...eventInfo, eventType: e.target.value })}
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Eligibility</FormLabel>
                <Select
                  placeholder="Select eligibility"
                  onChange={(e) => setEventInfo({ ...eventInfo, eligibility: e.target.value })}
                >
                  {eligibilityOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={eventInfo.description}
                  onChange={(e) => setEventInfo({ ...eventInfo, description: e.target.value })}
                  placeholder="Enter event description"
                >
                </Textarea>
              </FormControl>

              {/* Event Dates */}
              <Flex justify="space-between" gap={4}>
                <FormControl>
                  <FormLabel>Event Start Date</FormLabel>
                  <Input
                    type="date"
                    value={eventInfo.startDate ? eventInfo.startDate.toISOString().split("T")[0] : ""}
                    onChange={(e) =>
                      setEventInfo({ ...eventInfo, startDate: new Date(e.target.value) })
                    }
                    min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Event End Date</FormLabel>
                  <Input
                    type="date"
                    value={eventInfo.endDate ? eventInfo.endDate.toISOString().split("T")[0] : ""}
                    onChange={(e) =>
                      setEventInfo({ ...eventInfo, endDate: new Date(e.target.value) })
                    }
                    min={eventInfo.startDate ? eventInfo.startDate.toISOString().split("T")[0] : ""}
                  />
                </FormControl>
              </Flex>


              <FormControl>
                <FormLabel>Registration Deadline</FormLabel>
                <Input
                    type="date"
                    value={eventInfo.registrationDeadline ? eventInfo.registrationDeadline.toISOString().split("T")[0] : ""}
                    onChange={(e) =>
                      setEventInfo({ ...eventInfo, registrationDeadline: new Date(e.target.value) })
                    }
                    min={eventInfo.registrationDeadline ? eventInfo.registrationDeadline.toISOString().split("T")[0] : ""}
                  />
              </FormControl>

              {/* Time and Timezone */}
              <Flex justify="space-between" gap={4}>
                <FormControl>
                  <FormLabel>Time</FormLabel>
                  {/* <Select
                    placeholder="Select time"
                    onChange={(e) => setEventInfo({ ...eventInfo, time: e.target.value })}
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </Select> */}
                  <Input
                    placeholder="Enter time"
                    onChange={(e) => setEventInfo({ ...eventInfo, time: e.target.value })}
                    value={eventInfo.time}
                    type='time'
                  >
                  </Input>
                </FormControl>

                <FormControl>
                  <FormLabel>Timezone</FormLabel>
                  <Select
                    placeholder="Select timezone"
                    onChange={(e) => setEventInfo({ ...eventInfo, timezone: e.target.value })}
                  >
                    {timezones.map((timezone) => (
                      <option key={timezone} value={timezone}>{timezone}</option>
                    ))}
                  </Select>
                </FormControl>
              </Flex>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" isLoading={isLoading} onClick={() => {
              setIsLoading(true);
              console.log('Event Info:', eventInfo);
              setIsLoading(false);
              onClose();
            }}>
              Add Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEventModal;
