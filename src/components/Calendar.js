import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, HStack, Text, useToast, Flex, Card, CardBody, CardHeader, Button, Image } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from '@emotion/styled';
import config from '../config';

const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 800px;
  background-color: white;
  border: none;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(114, 27, 255, 0.1);
  font-family: inherit;

  .react-calendar__tile {
    padding: 1em 0.5em;
    background: none;
    text-align: center;
    line-height: 16px;
    font-size: 0.9em;
    color: #4a4a4a;
    border-radius: 12px;
    transition: all 0.2s ease-in-out;
  }

  .react-calendar__tile:hover {
    background-color: #f5e9ff;
  }

  .react-calendar__tile--now {
    background: #dac1ff;
    color: #4400b3;
  }

  .react-calendar__tile--active {
    background: #721bff;
    color: white;
  }

  .react-calendar__tile--hasContent {
    background-color: #a56eff;
    color: white;
    font-weight: bold;
  }

  .react-calendar__navigation button {
    color: #721bff;
    font-size: 1.2em;
    background: none;
    border-radius: 12px;
    transition: all 0.2s ease-in-out;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f5e9ff;
  }

  .react-calendar__month-view__weekdays {
    font-size: 0.9em;
    font-weight: bold;
    color: #4400b3;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #721bff;
  }
`;

const CalendarComponent = () => {
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const toast = useToast();

  useEffect(() => {
    fetchScheduledPosts();
  }, []);

  const fetchScheduledPosts = async () => {
    try {
      const response = await fetch(`${config.API_URL}/api/posts`);
      if (!response.ok) {
        throw new Error('Failed to fetch scheduled posts');
      }
      const data = await response.json();
      setScheduledPosts(data.filter(post => !post.is_published));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch scheduled posts. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const postsForDate = scheduledPosts.filter(
        post => new Date(post.scheduled_time).toDateString() === date.toDateString()
      );
      if (postsForDate.length > 0) {
        return <Text fontSize="xs" color="purple.600">{postsForDate.length} post(s)</Text>;
      }
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getPostsForSelectedDate = () => {
    return scheduledPosts.filter(
      post => new Date(post.scheduled_time).toDateString() === selectedDate.toDateString()
    );
  };

  return (
    <Box width="100%" p={5}>
      <Flex alignItems="center" mb={5}>
        <Image src="/images/Social+Pal++1.png" alt="SocialPal AI Logo" height="40px" mr={2} />
        <Heading as="h1" size="lg">socialpal.ai</Heading>
      </Flex>
      <Heading as="h2" size="xl" mb={5}>Calendar</Heading>
      <Flex direction={{ base: "column", md: "row" }} spacing={8}>
        <Card flex={1} mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }}>
          <CardBody>
            <StyledCalendar
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={tileContent}
            />
          </CardBody>
        </Card>
        <Card flex={1}>
          <CardHeader>
            <Heading as="h3" size="md">Scheduled Posts for {selectedDate.toDateString()}</Heading>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              {getPostsForSelectedDate().map((post) => (
                <Box key={post.id} p={4} borderWidth={1} borderRadius="md" borderColor="purple.200">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="bold">{new Date(post.scheduled_time).toLocaleTimeString()}</Text>
                    <Text fontSize="sm" color="purple.500">{post.platform}</Text>
                  </HStack>
                  <Text mb={2}>{post.content}</Text>
                  <HStack justify="flex-end">
                    <Button size="sm" leftIcon={<EditIcon />} variant="outline">Edit</Button>
                    <Button size="sm" leftIcon={<DeleteIcon />} variant="outline" colorScheme="red">Delete</Button>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
};

export default CalendarComponent;
