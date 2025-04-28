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
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { login } from '../services/api';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = ({ switchAuthHandler }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await login({ email, password });
      if (response.error) {
        setError('Login failed. Please check your credentials.');
      } else {
        setSuccess('Login successful!');
        localStorage.setItem('Trabajador', JSON.stringify(response.data));
        window.location.href = '/'; // Redirige al home después del login
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
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
        <Heading color="teal.400">Login</Heading>
        {error && <Box color="red.500">{error}</Box>}
        {success && <Box color="green.500">{success}</Box>}
        <form onSubmit={handleLogin}>
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
            <FormHelperText textAlign="right">Forgot password?</FormHelperText>
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">
            Login
          </Button>
        </form>
        <Box>
          Don't have an account?{' '}
          <Button variant="link" colorScheme="teal" onClick={switchAuthHandler}>
            Register
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
