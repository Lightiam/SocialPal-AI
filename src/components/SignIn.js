import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Image,
  Flex,
} from "@chakra-ui/react";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSignIn = (e) => {
    e.preventDefault();
    // TODO: Implement sign in logic
    toast({
      title: "Sign in successful.",
      description: "Welcome back to SocialPal AI!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box width="100%" height="100vh" display="flex" alignItems="center" justifyContent="center" bg="purple.600">
      <Box width="100%" maxWidth="400px" bg="white" borderRadius="xl" boxShadow="xl" p={8}>
        <VStack spacing={8} align="stretch">
          <Flex alignItems="center" justifyContent="center">
            <Image src="/images/SocialPal++1.png" alt="SocialPal AI Logo" height="40px" mr={2} />
            <Heading as="h1" size="lg">socialpal.ai</Heading>
          </Flex>
          <Heading as="h2" size="xl" textAlign="center" color="purple.600">
            Sign In
          </Heading>
          <form onSubmit={handleSignIn}>
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  bg="white"
                  borderColor="purple.300"
                  _hover={{ borderColor: "purple.400" }}
                  _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #8B5CF6" }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  bg="white"
                  borderColor="purple.300"
                  _hover={{ borderColor: "purple.400" }}
                  _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px #8B5CF6" }}
                />
              </FormControl>
              <Button
                type="submit"
                bg="purple.500"
                color="white"
                width="full"
                mt={4}
                size="lg"
                _hover={{ bg: "purple.600" }}
                _active={{ bg: "purple.700" }}
              >
                Sign In
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};

export default SignIn;
