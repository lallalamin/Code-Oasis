import React, { useState } from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, FormControl,
  FormLabel, Input, VStack, useDisclosure, Text, Select, Checkbox, Flex
} from '@chakra-ui/react';
import { LoadScript } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { FaPlus } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const libraries = ['places'];
const MAX_CHAR = 50;
const timeOptions = [
  '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM',
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM',
  '11:00 PM', '11:30 PM'
];
const timezones = ['CST', 'EST', 'PST', 'MST'];
const eventTypes = ['Workshop', 'Conference', 'Hackathon', 'Fellowship', 'Meetup', 'Networking Event', 'Career Fair', 'Panel Discussion', 'Other'];
const eligibilityOptions = ['Open to All', 'Undergraduates Only', 'Professionals Only', 'Graduate Students Only', 'High School Students Only', 'Freshmen Only', 'Sophomores Only', 'Juniors Only', 'Seniors Only', 'Freshmen and Sophomores Only', 'Juniors and Seniors Only'];

const FullEventForm = () => {
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

  const handleLocationChange = (address) => {
    setEventInfo({ ...eventInfo, location: address });
  };

  const handleSelectLocation = async (address) => {
    setEventInfo({ ...eventInfo, location: address });
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setEventInfo({ ...eventInfo, lat: latLng.lat, lng: latLng.lng });
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
                  onChange={(e) => {
                    setEventInfo({ ...eventInfo, title: e.target.value });
                    setRemainingChar(MAX_CHAR - e.target.value.length);
                  }}
                  placeholder="Enter event title"
                />
                <Text fontSize="sm">{remainingChar}/{MAX_CHAR}</Text>
              </FormControl>

              <FormControl>
                <FormLabel>Event Link</FormLabel>
                <Input
                  value={eventInfo.link}
                  placeholder="Enter url"
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

              {/* Event Dates */}
              <Flex justify="space-between" gap={4}>
                <FormControl>
                  <FormLabel>Event Start Date</FormLabel>
                  <DatePicker
                    selected={eventInfo.startDate}
                    onChange={(date) => setEventInfo({ ...eventInfo, startDate: date })}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Event End Date</FormLabel>
                  <DatePicker
                    selected={eventInfo.endDate}
                    onChange={(date) => setEventInfo({ ...eventInfo, endDate: date })}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                  />
                </FormControl>
              </Flex>


              <FormControl>
                <FormLabel>Registration Deadline</FormLabel>
                <DatePicker
                  selected={eventInfo.registrationDeadline}
                  onChange={(date) => setEventInfo({ ...eventInfo, registrationDeadline: date })}
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
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
  
              <FormControl>
                <FormLabel>Event Format</FormLabel>
                <Checkbox isChecked={eventInfo.isVirtual} onChange={(e) => setEventInfo({ ...eventInfo, isVirtual: e.target.checked })}>Virtual</Checkbox>
                <Checkbox isChecked={eventInfo.isInPerson} onChange={(e) => setEventInfo({ ...eventInfo, isInPerson: e.target.checked })}>In-Person</Checkbox>
              </FormControl>

              {eventInfo.isInPerson && (
                  <FormControl>
                    <FormLabel>Location</FormLabel>
                    <PlacesAutocomplete
                      value={eventInfo.location}
                      onChange={handleLocationChange}
                      onSelect={handleSelectLocation}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                          <Input {...getInputProps({ placeholder: 'Search address...' })} />
                          <div>
                            {loading && <Text>Loading suggestions...</Text>}
                            {suggestions.map((suggestion) => (
                              <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion)}>
                                {suggestion.description}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </FormControl>
              )}

              {eventInfo.isVirtual && (
                <FormControl>
                  <FormLabel>Virtual Link</FormLabel>
                  <Input
                    placeholder="Enter virtual meeting link"
                    onChange={(e) => setEventInfo({ ...eventInfo, virtualLink: e.target.value })}
                  />
                </FormControl>
              )}

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

export default FullEventForm;
