// components/Navbar.tsx
"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import NextLink from "next/link";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useContext(AuthContext);

  return (
    <Box bg="gray.100" px={4} boxShadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={4} alignItems="center">
          <Image src="/logo.png" alt="CoreCircle Logo" boxSize="40px" />
          <Box>
            <Text fontWeight="bold">CoreCircle</Text>
            <Text fontSize="sm">Connect based on values & life stage</Text>
          </Box>
        </HStack>
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          {user ? (
            <>
              <NextLink href="/profile" passHref>
                <Button variant="ghost">Profile</Button>
              </NextLink>
              <Button onClick={logout} colorScheme="red">
                Logout
              </Button>
              <Avatar name={user.name} size="sm" />
            </>
          ) : (
            <>
              <NextLink href="/login" passHref>
                <Button variant="ghost">Login</Button>
              </NextLink>
              <NextLink href="/register" passHref>
                <Button colorScheme="blue">Register</Button>
              </NextLink>
            </>
          )}
        </HStack>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack spacing={4}>
            {user ? (
              <>
                <NextLink href="/profile">Profile</NextLink>
                <Button onClick={logout} colorScheme="red">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NextLink href="/login">Login</NextLink>
                <NextLink href="/register">Register</NextLink>
              </>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
