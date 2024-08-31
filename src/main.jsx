import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/provider'
import { color } from 'framer-motion'

const styles ={
  global:(props) => ({
    body:{
      color: module('gray.800', 'whiteAlpha.900')(props),
      bg:mode('gray.100', '#101010')(props),
    }
  })
};

const config ={
  initialColorMode: "dark",
  useSystemColorMode: true
};

const colors ={
  gray:{
    light: "#616161",
    dark: "#1e1e1e"
  }
}

const theme = extendTheme({ config, styles, colors });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)