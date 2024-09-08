import React from 'react';
import { Box, Flex, Heading, Text, Button, VStack, Image } from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Box width="100%" minHeight="100vh" bg="purple.50">
      <Flex px={8} py={16} align="center" justify="center" minHeight="100vh">
        <VStack align="center" spacing={12} maxWidth="1000px">
          <Flex alignItems="center" mb={8}>
            <Image src="/images/SocialPal++1.png" alt="SocialPal AI Logo" height="60px" mr={4} />
            <Heading as="h1" size="2xl" color="purple.800">socialpal.ai</Heading>
          </Flex>
          <Heading as="h2" fontSize={["3xl", "4xl", "5xl"]} color="purple.800" textAlign="center" lineHeight="1.2">
            Simplify social media management with our tool!
          </Heading>
          <Text fontSize="2xl" color="purple.600" textAlign="center" maxWidth="800px">
            Post on multiple platforms at once and boost your online presence without the hassle of individual posting.
          </Text>
          <Button
            size="lg"
            bg="purple.500"
            color="white"
            _hover={{ bg: 'purple.600' }}
            fontSize="xl"
            py={6}
            px={10}
          >
            Get Started
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default LandingPage;
