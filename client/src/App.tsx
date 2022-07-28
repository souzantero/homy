import { ChakraProvider } from '@chakra-ui/react'
import Sidebar from './components/Sidebar';

function App() {
  return (
    <ChakraProvider>
      <Sidebar>
        <h1>Home</h1>
      </Sidebar>
    </ChakraProvider>
  );
}

export default App;
