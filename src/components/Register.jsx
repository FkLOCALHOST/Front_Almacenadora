import React, { useState, useContext } from 'react';
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
import { register } from '../services/api';
import { ThemeContext } from '../themeContext'; 

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Register = ({ switchAuthHandler }) => {
  const { theme } = useContext(ThemeContext);
  const [nombreT, setName] = useState('');
  const [dpi, setDpi] = useState('');
  const [apellidoT, setApellido] = useState('');
  const [correoT, setEmail] = useState('');
  const [telefonoT, setTelefono] = useState('');
  const [constraseñaT, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [rendimientoT, setRendimiento] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const response = await register({nombreT: nombreT, apellidoT: apellidoT, dpi: dpi, correoT: correoT, telefonoT: telefonoT, contrasenaT: constraseñaT, role: role, rendimientoT: rendimientoT, });
   

    if (response.error) {
      setError('Registration failed. Please try again.');
    } else {
      setSuccess('Registration successful! You can now login.');
      setName('');
      setEmail('');
      setPassword('');
      setRole('');
      setTelefono('');
      setDpi('');
      setApellido('');
      setRendimiento('');
    }
  };

  return (
    <Flex
      className={`login-container ${theme}`}
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor={theme === 'dark' ? 'gray.800' : 'gray.200'}
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={4} p="1rem" backgroundColor={theme === 'dark' ? 'gray.700' : 'whiteAlpha.900'} boxShadow="md">
      <Heading color={theme === 'dark' ? 'teal.300' : 'teal.400'}>Register</Heading>
        {error && <Box color="red.500">{error}</Box>}
        {success && <Box color="green.500">{success}</Box>}
        <form onSubmit={handleRegister}>
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
              <Input
                type="text"
                placeholder="Name"
                value={nombreT}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
              <Input
                type="text"
                placeholder="Surname"
                value={apellidoT}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
              <Input
                type="text"
                placeholder="DPI"
                value={dpi}
                onChange={(e) => setDpi(e.target.value)}
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
                value={correoT}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
              <Input
                type="text"
                placeholder="Phone number"
                value={telefonoT}
                onChange={(e) => setTelefono(e.target.value)}
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
                value={constraseñaT}
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
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
              <Input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
              <Input
                type="text"
                placeholder="rendimiento"
                value={rendimientoT}
                onChange={(e) => setRendimiento(e.target.value)}
                required
              />
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
