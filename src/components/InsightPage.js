import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  useToast,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Flex,
  Image,
} from "@chakra-ui/react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import config from '../config';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const InsightPage = () => {
  const [insights, setInsights] = useState({
    followers: 0,
    engagement: 0,
    reach: 0,
    impressions: 0,
  });
  const [dateRange, setDateRange] = useState('7d');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchInsights();
  }, [dateRange]);

  const fetchInsights = async () => {
    setIsLoading(true);
    try {
      // In a real application, you would fetch this data from your backend API
      // For now, we'll use mock data
      const mockData = {
        followers: 10000,
        engagement: 5.2,
        reach: 50000,
        impressions: 100000,
        chartData: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Followers',
              data: [9800, 9850, 9900, 9950, 9980, 10000, 10000],
              borderColor: 'rgb(114, 27, 255)',
              backgroundColor: 'rgba(114, 27, 255, 0.5)',
            },
            {
              label: 'Engagement',
              data: [4.8, 5.0, 5.1, 5.3, 5.2, 5.4, 5.2],
              borderColor: 'rgb(165, 110, 255)',
              backgroundColor: 'rgba(165, 110, 255, 0.5)',
            },
          ],
        },
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setInsights(mockData);
      setChartData(mockData.chartData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch insights. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box width="100%" p={5}>
      <Flex alignItems="center" mb={5}>
        <Image src="/images/Social+Pal++1.png" alt="SocialPal AI Logo" height="40px" mr={2} />
        <Heading as="h1" size="lg">socialpal.ai</Heading>
      </Flex>
      <Heading as="h2" size="xl" mb={5}>Insights</Heading>
      <Card>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">Overview</Text>
            <Select
              width="200px"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </Select>
          </HStack>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <Box textAlign="center" py={10}>
              <Spinner size="xl" color="purple.500" />
            </Box>
          ) : (
            <VStack spacing={8} align="stretch">
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
                <Stat>
                  <StatLabel>Followers</StatLabel>
                  <StatNumber>{insights.followers.toLocaleString()}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>Engagement Rate</StatLabel>
                  <StatNumber>{insights.engagement}%</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    5.05%
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>Reach</StatLabel>
                  <StatNumber>{insights.reach.toLocaleString()}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    12.48%
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>Impressions</StatLabel>
                  <StatNumber>{insights.impressions.toLocaleString()}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    9.05%
                  </StatHelpText>
                </Stat>
              </SimpleGrid>
              <Box>
                <Heading as="h3" size="lg" mb={4}>Performance Over Time</Heading>
                <Line data={chartData} />
              </Box>
            </VStack>
          )}
        </CardBody>
      </Card>
    </Box>
  );
};

export default InsightPage;
