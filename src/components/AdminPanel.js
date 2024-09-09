import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Image,
  useToast,
} from "@chakra-ui/react";

const AdminPanel = () => {
  const [memberships] = useState([]);
  const [customers] = useState([]);
  const [payments] = useState([]);
  const [emailTemplates] = useState([]);
  useToast();

  // These functions will be implemented later when we add CRUD operations
  // For now, we'll remove them to avoid ESLint warnings

  return (
    <Box width="100%" p={5}>
      <Flex alignItems="center" mb={5}>
        <Image src="/images/Social+Pal++1.png" alt="SocialPal AI Logo" height="40px" mr={2} />
        <Heading as="h1" size="lg">socialpal.ai</Heading>
      </Flex>
      <Heading as="h2" size="xl" mb={5}>Admin Panel</Heading>
      <Tabs>
        <TabList>
          <Tab>Memberships</Tab>
          <Tab>Customers</Tab>
          <Tab>Payments</Tab>
          <Tab>Email Templates</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <Heading as="h3" size="lg">Manage Memberships</Heading>
              {/* Add form for creating new memberships */}
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Price</Th>
                    <Th>Duration</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {memberships.map((membership) => (
                    <Tr key={membership.id}>
                      <Td>{membership.id}</Td>
                      <Td>{membership.name}</Td>
                      <Td>{membership.price}</Td>
                      <Td>{membership.duration}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <Heading as="h3" size="lg">Manage Customers</Heading>
              {/* Add form for creating new customers */}
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Membership</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {customers.map((customer) => (
                    <Tr key={customer.id}>
                      <Td>{customer.id}</Td>
                      <Td>{customer.name}</Td>
                      <Td>{customer.email}</Td>
                      <Td>{customer.membership}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <Heading as="h3" size="lg">Manage Payments</Heading>
              {/* Add form for recording new payments */}
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Customer</Th>
                    <Th>Amount</Th>
                    <Th>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {payments.map((payment) => (
                    <Tr key={payment.id}>
                      <Td>{payment.id}</Td>
                      <Td>{payment.customer}</Td>
                      <Td>{payment.amount}</Td>
                      <Td>{payment.date}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <Heading as="h3" size="lg">Manage Email Templates</Heading>
              {/* Add form for creating new email templates */}
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Subject</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {emailTemplates.map((template) => (
                    <Tr key={template.id}>
                      <Td>{template.id}</Td>
                      <Td>{template.name}</Td>
                      <Td>{template.subject}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminPanel;
