import React, { useState, useCallback } from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, FormControl,
  FormLabel, Input, VStack, useDisclosure, Text, Select, Flex, Box, List, ListItem,
  Textarea, Checkbox
} from '@chakra-ui/react';
import { useJsApiLoader } from '@react-google-maps/api';
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
const eligibilityOptions = ['Open to All', 'Undergraduates Only', 'Professionals Only', 'Recent Graduates Only', 'High School Students Only', 'Masters Students Only', 'PhD Students Only', 'Freshman and Sophomore Students Only', 'Junior and Senior Students Only',  'Other'];

const EditEventModal = ({ event, isOpen, onClose, onEventUpdate }) => {
  const currentUser = useRecoilValue(userAtom); 
  console.log(currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [eventInfo, setEventInfo] = useState({
    postedBy: event?.postedBy || '',
    title: event?.title || '',
    eventType: event?.eventType || '',
    eligibility: event?.eligibility || '',
    description: event?.description || '',
    startDate: event?.startDate ? new Date(event.startDate) : '',
    endDate: event?.endDate ? new Date(event.endDate) : '',
    registrationDeadline: event?.registrationDeadline ? event.registrationDeadline : '',
    time: event?.time || '',
    timezone: event?.timezone || '',
    location: event?.location || '',
    lat: event?.lat || null,
    lng: event?.lng || null,
    isVirtual: event?.isVirtual || false,
    link: event?.link || ''
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

  const handleUpdateEvent = async () => {
    setIsLoading(true);
    console.log("Event Info:", eventInfo);
    try {
        const response = await fetch(`/api/events/update/${event._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventInfo),
        });

        const data = await response.json();
        console.log(data);
        if (data.error) {
            showToast("Error", data.error, "error");
            return;
        }

        onEventUpdate(event._id, eventInfo);
        showToast("Success", "Event updated successfully", "success");
        onClose();
    } catch (error) {
        showToast("Error", error.message, "error");
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
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
                <Text fontSize="sm" color="gray.500" mt={1}>{!eventInfo.title ? 0 : eventInfo.title.length}/{MAX_CHAR.title}</Text>
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
                  value={eventInfo.eventType}
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
                  value={eventInfo.eligibility}
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
                <Text fontSize="sm" color="gray.500" mt={1}>{!eventInfo.description ? 0 : eventInfo.description.length}/{MAX_CHAR.description}</Text>
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
                    min={eventInfo.startDate}
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
                    min={new Date().toISOString().split("T")[0]}
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
            <Button colorScheme="blue" isLoading={isLoading} onClick={handleUpdateEvent}>
              Save Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditEventModal;
