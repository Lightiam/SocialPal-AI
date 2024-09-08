import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  Flex,
  Image,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import config from '../config';

const AccountManager = () => {
  const [accounts, setAccounts] = useState([]);
  const [platform, setPlatform] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch(`${config.API_URL}/api/accounts`);
      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch accounts. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddAccount = async () => {
    if (platform && accountName && accessToken) {
      try {
        const response = await fetch(`${config.API_URL}/api/accounts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ platform, accountName, accessToken }),
        });
        if (!response.ok) {
          throw new Error('Failed to add account');
        }
        await fetchAccounts();
        setPlatform('');
        setAccountName('');
        setAccessToken('');
        toast({
          title: "Account added.",
          description: "The social media account has been successfully added.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add account. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteAccount = async (id) => {
    try {
      const response = await fetch(`${config.API_URL}/api/accounts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete account');
      }
      await fetchAccounts();
      toast({
        title: "Account deleted.",
        description: "The social media account has been removed.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box width="100%" p={5}>
      <Flex alignItems="center" mb={5}>
        <Image src="/images/Social+Pal++1.png" alt="SocialPal AI Logo" height="40px" mr={2} />
        <Heading as="h1" size="lg">socialpal.ai</Heading>
      </Flex>
      <Heading as="h2" size="xl" mb={5}>Account Manager</Heading>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Select
            placeholder="Select platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
          </Select>
          <Input
            placeholder="Account Name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
          <Input
            placeholder="Access Token"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            type="password"
          />
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={handleAddAccount}>
            Add Account
          </Button>
        </HStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Platform</Th>
              <Th>Account Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {accounts.map((account) => (
              <Tr key={account.id}>
                <Td>{account.platform}</Td>
                <Td>{account.accountName}</Td>
                <Td>
                  <IconButton
                    aria-label="Delete account"
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteAccount(account.id)}
                    colorScheme="red"
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Edit account"
                    icon={<EditIcon />}
                    colorScheme="yellow"
                    size="sm"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default AccountManager;
