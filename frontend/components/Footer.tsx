// components/Footer.tsx
"use client";

import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="gray.100"
      textAlign="center"
      py={4}
      mt="auto"
      boxShadow="inner"
    >
      <Text fontSize="sm">
        &copy; {new Date().getFullYear()} CoreCircle. All rights reserved.
      </Text>
    </Box>
  );
}
