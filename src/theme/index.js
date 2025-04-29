import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#e3f2f9',
    100: '#c5e4f3',
    200: '#a2d4ec',
    300: '#7ac1e4',
    400: '#47a9da',
    500: '#0088cc', // Primary color
    600: '#007ab8',
    700: '#006ba1',
    800: '#005885',
    900: '#003f5e',
  },
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors,
  config,
  styles: {
    global: {
      body: {
        bg: 'var(--background-color)',
        color: 'var(--text-color)',
        transition: 'background-color 0.3s, color 0.3s',
      },
      button: {
        bg: 'var(--button-bg-color)',
        color: 'var(--button-text-color)',
        _hover: {
          bg: 'var(--button-hover-bg-color)',
        },
      },
    },
  },
});

export const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme); // Aplica el tema al atributo data-theme
  localStorage.setItem('theme', theme); // Guarda el tema en localStorage
};

export const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'light'; // Carga el tema guardado o usa 'light' por defecto
  document.documentElement.setAttribute('data-theme', savedTheme); // Aplica el tema al cargar la página
};

export default theme;
