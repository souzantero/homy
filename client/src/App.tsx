import { ChakraProvider } from '@chakra-ui/react'
import Foods from './components/Foods';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <ChakraProvider>
      <Sidebar>
        <Foods/>
      </Sidebar>
    </ChakraProvider>
  );
}

export default App;
