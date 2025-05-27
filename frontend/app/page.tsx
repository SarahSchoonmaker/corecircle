"use client";
import { Box, Heading, Button, Text } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box maxW="lg" mx="auto" mt="10" p="6" boxShadow="lg" borderRadius="lg">
      <Heading mb="4">Welcome to CoreCircle</Heading>
      <Text mb="4">
        This is where users connect based on values and location.
      </Text>
      <Button colorScheme="blue">Learn More</Button>
    </Box>
  );
}
