import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  InputRightElement,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { register } from "../../services/api";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Register = ({ switchAuthHandler }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const response = await register({ name, email, password });

    if (response.error) {
      setError('Registration failed. Please try again.');
    } else {
      setSuccess('Registration successful! You can now login.');
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
        <Heading color="teal.400">Register</Heading>
        {error && <Box color="red.500">{error}</Box>}
        {success && <Box color="green.500">{success}</Box>}
        <form onSubmit={handleRegister}>
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<CFaLock color="gray.300" />} />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">
            Register
          </Button>
        </form>
        <Box>
          Already have an account?{' '}
          <Button variant="link" colorScheme="teal" onClick={switchAuthHandler}>
            Login
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
