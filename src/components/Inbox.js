import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Divider,
  Badge,
  useColorModeValue,
  Flex,
  Image,
} from "@chakra-ui/react";
import { FaComment, FaAt, FaEnvelope } from 'react-icons/fa';

const Inbox = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Mock data for inbox messages
  const messages = [
    { id: 1, type: 'comment', user: 'John Doe', content: 'Great post!', time: '2h ago' },
    { id: 2, type: 'mention', user: 'Jane Smith', content: 'Hey @user, check this out!', time: '4h ago' },
    { id: 3, type: 'direct', user: 'Mike Johnson', content: 'Can we collaborate?', time: '1d ago' },
  ];

  const renderMessage = (message) => (
    <Box key={message.id} p={4} borderBottom="1px" borderColor={borderColor}>
      <HStack spacing={4} align="start">
        <Avatar size="sm" name={message.user} />
        <VStack align="start" spacing={1}>
          <HStack>
            <Text fontWeight="bold">{message.user}</Text>
            <Text fontSize="sm" color="gray.500">{message.time}</Text>
          </HStack>
          <Text>{message.content}</Text>
        </VStack>
      </HStack>
    </Box>
  );

  return (
    <Box width="100%" p={5}>
      <Flex alignItems="center" mb={5}>
        <Image src="/images/Social+Pal++1.png" alt="SocialPal AI Logo" height="40px" mr={2} />
        <Heading as="h1" size="lg">socialpal.ai</Heading>
      </Flex>
      <Heading as="h2" size="xl" mb={5}>Inbox</Heading>
      <Box borderWidth={1} borderRadius="lg" overflow="hidden" bg={bgColor}>
        <Tabs isFitted variant="enclosed" onChange={(index) => setSelectedTab(index)}>
          <TabList>
            <Tab>
              <HStack>
                <FaComment />
                <Text>Comments</Text>
                <Badge colorScheme="purple" variant="solid" borderRadius="full">
                  2
                </Badge>
              </HStack>
            </Tab>
            <Tab>
              <HStack>
                <FaAt />
                <Text>Mentions</Text>
                <Badge colorScheme="purple" variant="solid" borderRadius="full">
                  1
                </Badge>
              </HStack>
            </Tab>
            <Tab>
              <HStack>
                <FaEnvelope />
                <Text>Direct Messages</Text>
                <Badge colorScheme="purple" variant="solid" borderRadius="full">
                  1
                </Badge>
              </HStack>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack align="stretch" spacing={0} divider={<Divider />}>
                {messages.filter(m => m.type === 'comment').map(renderMessage)}
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack align="stretch" spacing={0} divider={<Divider />}>
                {messages.filter(m => m.type === 'mention').map(renderMessage)}
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack align="stretch" spacing={0} divider={<Divider />}>
                {messages.filter(m => m.type === 'direct').map(renderMessage)}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Inbox;
