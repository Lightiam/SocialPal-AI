import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Image,
  Container,
  Flex,
} from "@chakra-ui/react";
import { CheckIcon } from '@chakra-ui/icons';

const PricingTier = ({ title, price, features, isPopular }) => {
  return (
    <Box
      borderRadius="xl"
      overflow="hidden"
      bg={isPopular ? "purple.600" : "white"}
      color={isPopular ? "white" : "purple.900"}
      boxShadow="xl"
      position="relative"
    >
      {isPopular && (
        <Text
          position="absolute"
          top="0"
          right="0"
          bg="purple.500"
          color="white"
          fontSize="sm"
          fontWeight="bold"
          px={4}
          py={1}
          borderBottomLeftRadius="md"
        >
          Most Popular
        </Text>
      )}
      <VStack spacing={6} align="stretch" p={8}>
        <Heading as="h3" size="lg" textAlign="center">
          {title}
        </Heading>
        <Text fontSize="5xl" fontWeight="bold" textAlign="center">
          ${price}
          <Text as="span" fontSize="xl" fontWeight="normal">
            /month
          </Text>
        </Text>
        <Button
          colorScheme={isPopular ? "white" : "purple"}
          size="lg"
          variant={isPopular ? "outline" : "solid"}
        >
          Select Plan
        </Button>
        <List spacing={3}>
          {features.map((feature, index) => (
            <ListItem key={index}>
              <HStack>
                <ListIcon as={CheckIcon} color={isPopular ? "white" : "purple.500"} />
                <Text>{feature}</Text>
              </HStack>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
};

const PricingPage = () => {
  const plans = [
    {
      title: "Basic",
      price: 29,
      features: [
        "5 Social Media Accounts",
        "50 Scheduled Posts",
        "Analytics Dashboard",
        "24/7 Support",
      ],
    },
    {
      title: "Pro",
      price: 49,
      features: [
        "10 Social Media Accounts",
        "Unlimited Scheduled Posts",
        "Advanced Analytics",
        "Content Calendar",
        "Team Collaboration",
      ],
      isPopular: true,
    },
    {
      title: "Enterprise",
      price: 99,
      features: [
        "Unlimited Social Media Accounts",
        "Unlimited Scheduled Posts",
        "Custom Analytics",
        "Dedicated Account Manager",
        "API Access",
      ],
    },
  ];

  return (
    <Box
      py={16}
      bgGradient="linear(to-b, purple.600, purple.800)"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Container maxW="container.xl">
        <VStack spacing={8} textAlign="center" mb={16}>
          <Flex alignItems="center">
            <Image src="/images/SocialPal++1.png" alt="SocialPal AI Logo" height="40px" mr={2} />
            <Heading as="h1" size="lg" color="white">socialpal.ai</Heading>
          </Flex>
          <Heading as="h2" fontSize="5xl" color="white">
            Choose Your Plan
          </Heading>
          <Text fontSize="xl" color="purple.100">
            Start with a 14-day free trial. No credit card needed.
          </Text>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {plans.map((plan, index) => (
            <PricingTier key={index} {...plan} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default PricingPage;
