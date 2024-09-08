import React from 'react';
import { Box, Flex, Heading, Text, Button, VStack, Image } from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Box width="100%" minHeight="100vh" bg="purple.200">
      <Flex px={[4, 6, 8]} py={[8, 12, 16]} align="center" justify="center" minHeight="100vh">
        <Flex maxWidth="1200px" width="100%" align="center" justify="space-between" direction={["column", "column", "row"]} flexWrap="wrap">
          <Box width={["100%", "100%", "48%"]} mb={[8, 8, 0]} order={[2, 2, 1]}>
            <Image src="/images/Social%2BPal%2B%2B2.png" alt="SocialPal AI Illustration" width="100%" />
          </Box>
          <VStack align={["center", "center", "flex-start"]} spacing={[8, 9, 10]} width={["100%", "100%", "48%"]} order={[1, 1, 2]}>
            <Heading as="h1" fontSize={["3xl", "4xl", "5xl", "6xl"]} color="purple.800" lineHeight={["1.2", "1.1", "1"]} textAlign={["center", "center", "left"]}>
              Simplify social media management with our tool!
            </Heading>
            <Text fontSize={["xl", "2xl", "3xl"]} color="purple.700" maxWidth="800px" textAlign={["center", "center", "left"]}>
              Post on multiple platforms at once and boost your online presence without the hassle of individual posting.
            </Text>
            <Button
              size="lg"
              bg="purple.600"
              color="white"
              _hover={{ bg: 'purple.700' }}
              fontSize={["xl", "2xl", "3xl"]}
              py={[6, 7, 8]}
              px={[10, 12, 14]}
              boxShadow="md"
            >
              Get Started
            </Button>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default LandingPage;
