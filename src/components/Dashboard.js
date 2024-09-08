import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Image,
  VStack,
  HStack,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { FaUser, FaChartLine, FaBell } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';

const Dashboard = () => {
  // Mock data for the chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Engagement',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Box width="100%" p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <VStack align="start">
          <Heading as="h2" size="xl">Welcome back, John!</Heading>
          <Text color="gray.500">Here's what's happening with your accounts today.</Text>
        </VStack>
        <Flex alignItems="center">
          <Image src="/images/SocialPal++1.png" alt="SocialPal AI Logo" height="40px" mr={2} />
          <Heading as="h1" size="lg">socialpal.ai</Heading>
        </Flex>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} mb={10}>
        <Stat>
          <StatLabel>Total Posts</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Engagement Rate</StatLabel>
          <StatNumber>5.2%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            9.05%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Followers</StatLabel>
          <StatNumber>10,234</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            12.48%
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Scheduled Posts</StatLabel>
          <StatNumber>8</StatNumber>
          <StatHelpText>
            Next post in 2 hours
          </StatHelpText>
        </Stat>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Recent Activity</Heading>
            <VStack align="start" spacing={4}>
              <HStack>
                <FaUser />
                <Text>New follower on Instagram</Text>
              </HStack>
              <HStack>
                <FaChartLine />
                <Text>Engagement up 5% on Twitter</Text>
              </HStack>
              <HStack>
                <FaBell />
                <Text>3 new comments on your latest post</Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Engagement Overview</Heading>
            <Box height="300px">
              <Line data={chartData} options={{ maintainAspectRatio: false }} />
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
