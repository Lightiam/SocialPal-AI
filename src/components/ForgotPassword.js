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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // TODO: Implement forgot password logic
    toast({
      title: "Password reset email sent.",
      description: "Check your email for instructions to reset your password.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box width="100%" maxWidth="400px" margin="auto" mt={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" color="purple.600">
          Forgot Password
        </Heading>
        <form onSubmit={handleForgotPassword}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="purple"
              width="full"
              mt={4}
            >
              Reset Password
            </Button>
          </VStack>
        </form>
        <Text textAlign="center">
          Remember your password?{" "}
          <Link as={RouterLink} to="/signin" color="purple.500">
            Sign In
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default ForgotPassword;
