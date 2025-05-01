import React, { useState, useContext } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  chakra,
  Box,
  FormControl,
  InputRightElement,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { register } from '../../services/api';
import { ThemeContext } from '../../themeContext'; 
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { validateEmail, validateEmailMessage } from '../../shared/hooks/validators/validateEmail';
import { validatecontrasenaT, validatecontrasenaTMessage } from '../../shared/hooks/validators/validatePassword';
import { validateDPI, validateDPIMessage } from '../../shared/hooks/validators/validateDpi';
import { validatePhone, validatePhoneMessage } from '../../shared/hooks/validators/validatePhone';
import { validateMayuscula, validateMayusculaMessage } from '../../shared/hooks/validators/validatePasswordMayus';
import { validateMinuscula, validateMinusculaMessage } from '../../shared/hooks/validators/validatePasswordMinus';
import { validateNumero, validateNumeroMessage } from '../../shared/hooks/validators/validatePasswordNumber';
import { validateSigno, validateSignoMessage } from '../../shared/hooks/validators/validatePasswordSymbol';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Register = ({ switchAuthHandler }) => {
  const { theme } = useContext(ThemeContext);
  const [nombreT, setName] = useState('');
  const [dpi, setDpi] = useState('');
  const [apellidoT, setApellido] = useState('');
  const [correoT, setEmail] = useState('');
  const [telefonoT, setTelefono] = useState('');
  const [contraseñaT, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    console.log('Correo ingresado:', correoT);

    if (!validateEmail(correoT)) {
          setError(validateEmailMessage);
          return;
        }
  
    if (!validatecontrasenaT(contraseñaT)) {
          setError(validatecontrasenaTMessage);
          return;
        }

    if (!validateDPI(dpi)) {
      setError(validateDPIMessage);
      return;
    }

    if (!validatePhone(telefonoT)) {
      setError(validatePhoneMessage);
      return;
    }

    if (!validateMayuscula(contraseñaT)) {
      setError(validateMayusculaMessage);
      return;
    }
    
    if (!validateMinuscula(contraseñaT)) {
      setError(validateMinusculaMessage);
      return;
    }

    if (!validateNumero(contraseñaT)) {
      setError(validateNumeroMessage);
      return;
    }

    if (!validateSigno(contraseñaT)) {
      setError(validateSignoMessage);
      return;
    }

    const response = await register({nombreT: nombreT, apellidoT: apellidoT, dpi: dpi, correoT: correoT, telefonoT: telefonoT, contrasenaT: contraseñaT });
   
    if (response.error) {
      setError('Registration failed. Please try again.');
    } else {
      setSuccess('Registration successful! You can now login.');
      setName('');
      setEmail('');
      setPassword('');
      setTelefono('');
      setDpi('');
      setApellido('');
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
      <Stack spacing={4} p="2rem" backgroundColor={theme === 'dark' ? 'gray.700' : 'whiteAlpha.900'} boxShadow="md">
      <Heading color={theme === 'dark' ? 'teal.300' : 'teal.400'}>Register</Heading>
        {error && <Box color="red.500">{error}</Box>}
        {success && <Box color="green.500">{success}</Box>}
        <form onSubmit={handleRegister}>
        <Flex flexDirection="row" gap={4}>
          <FormControl>
            <InputGroup>
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
              <Input
                type="text"
                placeholder="Surname"
                value={apellidoT}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </InputGroup>
          </FormControl>
        </Flex>
        <Flex flexDirection="row" gap={4} mt={4}>
          <FormControl>
            <InputGroup>
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
              <Input
                type="text"
                placeholder="Email address"
                value={correoT}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
          </FormControl>
        </Flex>
        <Flex flexDirection="row" gap={4} mt={4}>
          <FormControl>
            <InputGroup>
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
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={contraseñaT}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick}  variant="unstyled" display="flex" alignItems="center" justifyContent="center">
                {showPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Flex>
          <Button type="submit" colorScheme="teal" width="full" mt={4}>
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
