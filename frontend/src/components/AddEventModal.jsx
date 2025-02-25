import React, { useState } from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, FormControl,
  FormLabel, Input, Text, useDisclosure, Select, Checkbox, VStack
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPlus } from 'react-icons/fa';
import TimezoneSelect from 'react-timezone-select';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

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
    isVirtual: false,
    isInPerson: false,
    virtualLink: ''
  });

  const handleLocationChange = (address) => {
    setEventInfo({ ...eventInfo, location: address });
  };

  const handleSelectLocation = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setEventInfo({ ...eventInfo, location: address });
  };

  return (
    <>
      <Button leftIcon={<FaPlus />} size="sm" onClick={onOpen}>
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
                <Text fontSize="sm" mt={2}>{remainingChar}/{MAX_CHAR}</Text>
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
                <FormLabel>Event Start Date</FormLabel>
                <DatePicker
                  selected={eventInfo.date}
                  onChange={(date) => setEventInfo({ ...eventInfo, date })}
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Event End Date</FormLabel>
                <DatePicker
                  selected={eventInfo.date}
                  onChange={(date) => setEventInfo({ ...eventInfo, date })}
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Registration Deadline</FormLabel>
                <DatePicker
                  selected={eventInfo.registrationDeadline}
                  onChange={(date) => setEventInfo({ ...eventInfo, registrationDeadline: date })}
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Time</FormLabel>
                <Select
                  placeholder="Select time"
                  onChange={(e) => setEventInfo({ ...eventInfo, time: e.target.value })}
                  bg={'transparent'}
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </Select>
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
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion) => (
                            <div {...getSuggestionItemProps(suggestion)}>
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
              // Submit logic here
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
