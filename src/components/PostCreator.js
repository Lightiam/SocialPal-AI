import React, { useState, useRef } from 'react';
import {
  Box,
  Flex,
  Heading,
  VStack,
  HStack,
  Button,
  Input,
  Textarea,
  Select,
  IconButton,
  useToast,
  FormControl,
  FormLabel,
  Switch,
  Text,
  Image,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@chakra-ui/react";
import { AddIcon, AttachmentIcon, CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';
import config from '../config';

const PostCreator = () => {
  const [content, setContent] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [customizePost, setCustomizePost] = useState(false);
  const [boost, setBoost] = useState(false);
  const [previewPlatform, setPreviewPlatform] = useState('desktop');
  const toast = useToast();

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
  };

  const accounts = [
    { id: 1, platform: 'Facebook', accountName: 'My Facebook Page', icon: FaFacebook },
    { id: 2, platform: 'Twitter', accountName: 'My Twitter Account', icon: FaTwitter },
    { id: 3, platform: 'Instagram', accountName: 'My Instagram Profile', icon: FaInstagram },
    { id: 4, platform: 'LinkedIn', accountName: 'My LinkedIn Profile', icon: FaLinkedin },
    { id: 5, platform: 'Threads', accountName: 'My Threads Account', icon: SiThreads },
    { id: 6, platform: 'YouTube Shorts', accountName: 'My YouTube Channel', icon: FaYoutube },
    { id: 7, platform: 'TikTok', accountName: 'My TikTok Account', icon: FaTiktok },
  ];

  const handleCreatePost = async () => {
    if (content && selectedPlatforms.length > 0 && scheduledDate && scheduledTime) {
      setIsLoading(true);
      const postData = new FormData();
      postData.append('user_id', 1); // TODO: Replace with actual user ID
      postData.append('content', content);
      postData.append('platforms', JSON.stringify(selectedPlatforms));
      postData.append('scheduled_time', `${scheduledDate}T${scheduledTime}`);
      postData.append('boost', boost);

      if (videoFile) {
        postData.append('video', videoFile);
      }

      try {
        const response = await fetch(`${config.API_URL}/api/posts`, {
          method: 'POST',
          body: postData,
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(`Failed to create post: ${responseData.detail || 'Unknown error'}`);
        }

        setContent('');
        setSelectedPlatforms([]);
        setScheduledDate('');
        setScheduledTime('');
        setVideoFile(null);
        setBoost(false);
        toast({
          title: "Post scheduled.",
          description: "Your post has been successfully scheduled.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error creating post:', error.message);
        toast({
          title: "Error",
          description: `Failed to schedule the post: ${error.message}. Please try again.`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const togglePlatform = (platformId) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <Flex width="100%" p={5} direction="column">
      <Flex alignItems="center" mb={5}>
        <Image src="/images/Social+Pal++1.png" alt="SocialPal AI Logo" height="40px" mr={2} />
        <Heading as="h1" size="lg">socialpal.ai</Heading>
      </Flex>
      <Flex>
        <VStack width="250px" align="stretch" mr={8} spacing={4}>
          <Heading as="h3" size="md">Navigation</Heading>
          {/* Add navigation items here */}
        </VStack>
        <Box flex={1}>
          <Heading as="h2" size="xl" mb={5}>Create Post</Heading>
          <Flex>
            <Card flex={2} mr={8} variant="outline" boxShadow="md">
              <CardHeader>
                <Heading size="md">Post Details</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Text fontWeight="bold" mb={2}>Post to</Text>
                    <HStack spacing={2}>
                      {accounts.map((account) => (
                        <IconButton
                          key={account.id}
                          icon={<account.icon />}
                          aria-label={account.platform}
                          onClick={() => togglePlatform(account.id)}
                          colorScheme={selectedPlatforms.includes(account.id) ? "purple" : "gray"}
                          size="lg"
                        />
                      ))}
                    </HStack>
                  </Box>
                  <FormControl>
                    <FormLabel>Content</FormLabel>
                    <Textarea
                      placeholder="Write your post content here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      height="200px"
                    />
                  </FormControl>
                  <Box>
                    <Text fontWeight="bold" mb={2}>Add photos or video</Text>
                    <HStack>
                      <Button leftIcon={<AttachmentIcon />}>Add photo</Button>
                      <Button leftIcon={<AttachmentIcon />} onClick={() => document.getElementById('video-upload').click()}>
                        Add video
                      </Button>
                      <input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        style={{ display: 'none' }}
                      />
                      <Button>Use template</Button>
                    </HStack>
                  </Box>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="customize-post" mb="0">
                      Customize post for each platform
                    </FormLabel>
                    <Switch id="customize-post" onChange={(e) => setCustomizePost(e.target.checked)} />
                  </FormControl>
                  <HStack>
                    <FormControl>
                      <FormLabel>Date</FormLabel>
                      <Input
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Time</FormLabel>
                      <Input
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </FormControl>
                  </HStack>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="boost-post" mb="0">
                      Boost post
                    </FormLabel>
                    <Switch id="boost-post" isChecked={boost} onChange={(e) => setBoost(e.target.checked)} />
                  </FormControl>
                </VStack>
              </CardBody>
              <CardFooter>
                <HStack justify="space-between" width="100%">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="outline">Finish later</Button>
                  <Button
                    colorScheme="purple"
                    onClick={handleCreatePost}
                    isLoading={isLoading}
                    loadingText="Publishing..."
                  >
                    Publish
                  </Button>
                </HStack>
              </CardFooter>
            </Card>
            <Card flex={1} variant="outline" boxShadow="md">
              <CardHeader>
                <Heading size="md">Preview</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Select
                    placeholder="Select platform"
                    onChange={(e) => setPreviewPlatform(e.target.value)}
                  >
                    <option value="desktop">Desktop</option>
                    <option value="mobile">Mobile</option>
                  </Select>
                  <Box borderWidth={1} borderRadius="md" p={4} height="400px" overflowY="auto">
                    <Text fontWeight="bold" mb={2}>Preview for {previewPlatform}</Text>
                    <Text>{content}</Text>
                    {videoFile && (
                      <Text mt={2} color="green.500">Video attached: {videoFile.name}</Text>
                    )}
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default PostCreator;
