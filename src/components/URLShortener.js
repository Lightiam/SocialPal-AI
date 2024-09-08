import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { CopyIcon } from '@chakra-ui/icons';

const URLShortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const toast = useToast();

  const handleShortenUrl = () => {
    if (longUrl) {
      // This is a mock function. In a real application, you would call an API to generate a short URL.
      const mockShortUrl = `https://short.url/${Math.random().toString(36).substr(2, 6)}`;
      setShortenedUrls([...shortenedUrls, { original: longUrl, shortened: mockShortUrl }]);
      setLongUrl('');
      toast({
        title: "URL shortened",
        description: "Your URL has been successfully shortened.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied",
      description: "The shortened URL has been copied to your clipboard.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box width="100%" p={5}>
      <Heading as="h2" size="xl" mb={5}>URL Shortener</Heading>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Input
            placeholder="Enter long URL here"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleShortenUrl}>
            Shorten URL
          </Button>
        </HStack>
        {shortenedUrls.length > 0 && (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Original URL</Th>
                <Th>Shortened URL</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {shortenedUrls.map((url, index) => (
                <Tr key={index}>
                  <Td>{url.original}</Td>
                  <Td>
                    <Text as="a" color="blue.500" href={url.shortened} target="_blank" rel="noopener noreferrer">
                      {url.shortened}
                    </Text>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Copy URL"
                      icon={<CopyIcon />}
                      onClick={() => handleCopyUrl(url.shortened)}
                      size="sm"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </VStack>
    </Box>
  );
};

export default URLShortener;
