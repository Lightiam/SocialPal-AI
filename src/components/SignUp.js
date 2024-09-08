import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
  useToast,
  Image,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSignUp = (e) => {
    e.preventDefault();
    // TODO: Implement sign up logic
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box width="100%" maxWidth="400px" margin="auto" mt={8}>
      <VStack spacing={8} align="stretch">
        <Flex alignItems="center" justifyContent="center">
          <Image src="/images/SocialPal++1.png" alt="SocialPal AI Logo" height="40px" mr={2} />
          <Heading as="h1" size="lg">socialpal.ai</Heading>
        </Flex>
        <Heading as="h2" size="xl" textAlign="center" color="purple.600">
          Sign Up
        </Heading>
        <form onSubmit={handleSignUp}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="purple"
              width="full"
              mt={4}
            >
              Sign Up
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default SignUp;
