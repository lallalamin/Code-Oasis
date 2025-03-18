import React, { useState, useCallback } from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, FormControl,
  FormLabel, Input, VStack, useDisclosure, Text, Select, Flex, Box, List, ListItem,
  Textarea, Checkbox
} from '@chakra-ui/react';
import { useJsApiLoader } from '@react-google-maps/api';
import { FaPlus } from 'react-icons/fa';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import 'react-datepicker/dist/react-datepicker.css';
import debounce from 'lodash.debounce';
import useShowToast from '../hooks/useShowToast';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import userEventsAtom from '../atoms/userEventsAtom';

const MAX_CHAR = {
  title: 100,
  description: 500
};
let libraries = ['places'];
const timezones = ['CST', 'EST', 'PST', 'MST'];
const eventTypes = ['Workshop', 'Conference', 'Hackathon', 'Fellowship', 'Meetup', 'Networking Event', 'Career Fair', 'Panel Discussion', 'Job Fair', 'Incubator/Accelerator Program', 'Coding Competition', 'Other'];
const eligibilityOptions = ['Open to All', 'Members','Undergraduates Only', 'Professionals Only', 'Recent Graduates Only', 'High School Students Only', 'Masters Students Only', 'PhD Students Only', 'Freshman and Sophomore Students Only', 'Junior and Senior Students Only',  'Other'];

const AddEventModal = ({ onEventAdd }) => {
  const currentUser = useRecoilValue(userAtom); 
  console.log(currentUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [eventInfo, setEventInfo] = useState({
    postedBy: currentUser._id,
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
    link: ''
  });
  const [userEvents, setUserEvents] = useRecoilState(userEventsAtom);

  const showToast = useShowToast();

  const handleTextChange = (field) => (e) => {
    const inputText = e.target.value;
    const maxLimit = MAX_CHAR[field];
  
    if (inputText.length > maxLimit) {
      setEventInfo((prev) => ({ ...prev, [field]: inputText.slice(0, maxLimit) }));
    } else {
      setEventInfo((prev) => ({ ...prev, [field]: inputText }));
    }
  };


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

  const handleAddEvent = async () => {
    console.log(eventInfo);
    try {
      const response = await fetch("/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventInfo),
      });
      const data = await response.json();
      console.log(data);

      if (!data) {
        showToast("error", data.error);
        return;
      }
      
      setUserEvents([data, ...userEvents]);
      onEventAdd(data);
      onClose();
      setEventInfo({
        postedBy: currentUser._id,
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
        link: ''
      });
      showToast("success", "Event added successfully! You earned 10 xp ⭐️", "success");
    } catch (error) {
      showToast("error", "An error occurred while adding the event");
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
                  onChange={handleTextChange("title")}
                  placeholder="Enter event title"
                />
                <Text fontSize="sm" color="gray.500" mt={1}>{eventInfo.title.length}/{MAX_CHAR.title}</Text>
              </FormControl>

              <Flex>
                <FormControl flex={5}>
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

                <FormControl flex={1}>
                  <Flex justify="center" align="center" flexDirection={"column"}>
                    <FormLabel m={0} pb={2}>Virtual</FormLabel>
                  
                    <Checkbox 
                      size={"lg"}
                      isChecked={eventInfo.isVirtual}
                      onChange={(e) => setEventInfo({ ...eventInfo, isVirtual: e.target.checked })}
                    />
                  </Flex>
                </FormControl>
              </Flex>

              <FormControl>
                <FormLabel>Link</FormLabel>
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
                  onChange={handleTextChange("description")}
                  placeholder="Enter event description"
                >
                </Textarea>
                <Text fontSize="sm" color="gray.500" mt={1}>{eventInfo.description.length}/{MAX_CHAR.description}</Text>
              </FormControl>

              {/* Event Dates */}
              <Flex justify="space-between" gap={4}>
                <FormControl>
                  <FormLabel>Event Start Date</FormLabel>
                  <Input
                    type="date"
                    onChange={(e) =>
                      setEventInfo({ ...eventInfo, startDate: e.target.value ? new Date(e.target.value) : null })
                    }
                    min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Event End Date</FormLabel>
                  <Input
                    type="date"
                    onChange={(e) =>
                      setEventInfo({ ...eventInfo, endDate: e.target.value ? new Date(e.target.value) : null })
                    }
                    min={eventInfo.startDate ? eventInfo.startDate.toISOString().split("T")[0] : ""}
                  />
                </FormControl>
              </Flex>

              <FormControl>
                <FormLabel>Registration Deadline</FormLabel>
                <Input
                    type="date"
                    onChange={(e) =>
                      setEventInfo({ ...eventInfo, registrationDeadline: e.target.value ? new Date(e.target.value) : null })
                    }
                  />
              </FormControl>

              {/* Time and Timezone */}
              <Flex justify="space-between" gap={4}>
                <FormControl>
                  <FormLabel>Event Time</FormLabel>
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
            <Button colorScheme="blue" isLoading={isLoading} onClick={handleAddEvent}>
              Add Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEventModal;
