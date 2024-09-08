import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";

const Analytics = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  // Mock data for analytics (replace with actual API calls later)
  const overallStats = {
    totalPosts: 150,
    totalEngagement: 5000,
    followerGrowth: 500,
  };

  const platformStats = {
    facebook: { posts: 50, engagement: 2000, followers: 10000 },
    twitter: { posts: 70, engagement: 1500, followers: 5000 },
    instagram: { posts: 30, engagement: 1500, followers: 7000 },
  };

  const renderPlatformStats = () => {
    if (selectedPlatform === 'all') {
      return Object.entries(platformStats).map(([platform, stats]) => (
        <Tr key={platform}>
          <Td>{platform.charAt(0).toUpperCase() + platform.slice(1)}</Td>
          <Td>{stats.posts}</Td>
          <Td>{stats.engagement}</Td>
          <Td>{stats.followers}</Td>
        </Tr>
      ));
    } else {
      const stats = platformStats[selectedPlatform];
      return (
        <Tr>
          <Td>{selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}</Td>
          <Td>{stats.posts}</Td>
          <Td>{stats.engagement}</Td>
          <Td>{stats.followers}</Td>
        </Tr>
      );
    }
  };

  return (
    <Box width="100%" p={5}>
      <Heading as="h2" size="xl" mb={5}>Analytics</Heading>
      <VStack spacing={8} align="stretch">
        <HStack spacing={8} justify="center">
          <Stat>
            <StatLabel>Total Posts</StatLabel>
            <StatNumber>{overallStats.totalPosts}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Total Engagement</StatLabel>
            <StatNumber>{overallStats.totalEngagement}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              9.05%
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Follower Growth</StatLabel>
            <StatNumber>{overallStats.followerGrowth}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              12.48%
            </StatHelpText>
          </Stat>
        </HStack>

        <Box>
          <HStack justify="space-between" mb={4}>
            <Text fontSize="lg" fontWeight="bold">Platform Performance</Text>
            <Select
              width="200px"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="all">All Platforms</option>
              <option value="facebook">Facebook</option>
              <option value="twitter">Twitter</option>
              <option value="instagram">Instagram</option>
            </Select>
          </HStack>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Platform</Th>
                <Th>Posts</Th>
                <Th>Engagement</Th>
                <Th>Followers</Th>
              </Tr>
            </Thead>
            <Tbody>
              {renderPlatformStats()}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
};

export default Analytics;
