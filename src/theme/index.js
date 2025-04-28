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
        bg: 'var(--bg-color)',
        color: 'var(--text-color)',
        transition: 'background-color 0.3s, color 0.3s',
      },
      '.auth-container': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        padding: '16px',
        backgroundColor: 'var(--secondary-color)',
        boxSizing: 'border-box',
      },
      '.auth-card': {
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s, color 0.3s',
      },
      '[data-theme="dark"] .auth-card': {
        backgroundColor: 'var(--secondary-color)',
        color: 'var(--text-color)',
      },
      '.auth-heading': {
        color: 'var(--primary-color)',
        textAlign: 'center',
        marginBottom: '16px',
      },
      '.auth-alert': {
        marginBottom: '16px',
      },
      '.auth-form': {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      },
      '.auth-footer': {
        textAlign: 'center',
        marginTop: '16px',
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
