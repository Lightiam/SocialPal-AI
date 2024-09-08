import React, { useState } from 'react';
import { Box, Flex, Heading, Spacer, Button, HStack, Icon, Select, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHome, FaUserCircle, FaPen, FaChartBar, FaLink, FaUserCog, FaDollarSign, FaCalendar, FaChartLine, FaSignInAlt, FaUserPlus, FaKey, FaMoneyBillWave, FaEnvelope } from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import config from '../config';

const Header = () => {
  const [language, setLanguage] = useState(config.DEFAULT_LANGUAGE);
  const [currency, setCurrency] = useState(config.DEFAULT_CURRENCY);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    // TODO: Implement language change logic
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
    // TODO: Implement currency change logic
  };

  return (
    <Box as="header" width="100%" py={4} px={8} bg="purple.600" color="white">
      <Flex alignItems="center">
        <Flex alignItems="center">
          <Image src="/images/Social+Pal++1.png" alt="SocialPal AI Logo" height="40px" mr={2} />
          <Heading as="h1" size="lg">socialpal.ai</Heading>
        </Flex>
        <Spacer />
        <HStack spacing={4}>
          <Select
            value={language}
            onChange={handleLanguageChange}
            width="auto"
            size="sm"
            variant="filled"
            bg="purple.500"
            color="white"
            borderColor="purple.200"
            _hover={{ bg: 'purple.400' }}
          >
            {config.SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>{lang.toUpperCase()}</option>
            ))}
          </Select>
          <Select
            value={currency}
            onChange={handleCurrencyChange}
            width="auto"
            size="sm"
            variant="filled"
            bg="purple.500"
            color="white"
            borderColor="purple.200"
            _hover={{ bg: 'purple.400' }}
          >
            {config.SUPPORTED_CURRENCIES.map((curr) => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </Select>
          <Flex>
            <Button as={Link} to="/" variant="outline" mr={2} borderRadius="full" color="white" borderColor="purple.200" _hover={{ bg: 'purple.500' }} leftIcon={<FaHome />}>Dashboard</Button>
            <Button as={Link} to="/accounts" variant="outline" mr={2} borderRadius="full" color="white" borderColor="purple.200" _hover={{ bg: 'purple.500' }} leftIcon={<FaUserCircle />}>Accounts</Button>
            <Button as={Link} to="/posts" variant="outline" mr={2} borderRadius="full" color="white" borderColor="purple.200" _hover={{ bg: 'purple.500' }} leftIcon={<FaPen />}>Posts</Button>
            <Button as={Link} to="/analytics" variant="outline" mr={2} borderRadius="full" color="white" borderColor="purple.200" _hover={{ bg: 'purple.500' }} leftIcon={<FaChartBar />}>Analytics</Button>
            <Button as={Link} to="/url-shortener" variant="outline" mr={2} borderRadius="full" color="white" borderColor="purple.200" _hover={{ bg: 'purple.500' }} leftIcon={<FaLink />}>URL Shortener</Button>
            <Button as={Link} to="/admin" variant="outline" mr={2} borderRadius="full" color="white" borderColor="purple.200" _hover={{ bg: 'purple.500' }} leftIcon={<FaUserCog />}>Admin</Button>
            <Button as={Link} to="/payments" variant="outline" mr={2} borderRadius="full" color="white" borderColor="purple.200" _hover={{ bg: 'purple.500' }} leftIcon={<FaDollarSign />}>Payments</Button>
            <Button as={Link} to="/calendar" variant="outline" mr={2} borderRadius="full" color="white" borderColor="purple.200" _hover={{ bg: 'purple.500' }} leftIcon={<FaCalendar />}>Calendar</Button>
            <Button as={Link} to="/insights" variant="outline" mr={2} borderRadius="full" color="white" borderColor="purple.200" _hover={{ bg: 'purple.500' }} leftIcon={<FaChartLine />}>Insights</Button>
            <Button as={Link} to="/inbox" variant="outline" mr={2} borderRadius="full" color="white" borderColor="purple.200" _hover={{ bg: 'purple.500' }} leftIcon={<FaEnvelope />}>Inbox</Button>
            <Button as={Link} to="/pricing" variant="outline" mr={2} borderRadius="full" color="white" borderColor="purple.200" _hover={{ bg: 'purple.500' }} leftIcon={<FaMoneyBillWave />}>Pricing</Button>
            <Button as={Link} to="/signup" variant="outline" mr={2} borderRadius="full" color="white" borderColor="purple.200" _hover={{ bg: 'purple.500' }} leftIcon={<FaUserPlus />}>Sign Up</Button>
            <Button as={Link} to="/signin" variant="outline" mr={2} borderRadius="full" color="white" borderColor="purple.200" _hover={{ bg: 'purple.500' }} leftIcon={<FaSignInAlt />}>Sign In</Button>
            <Button as={Link} to="/forgot-password" variant="outline" borderRadius="full" color="white" borderColor="purple.200" _hover={{ bg: 'purple.500' }} leftIcon={<FaKey />}>Forgot Password</Button>
          </Flex>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
