import { ChakraProvider } from '@chakra-ui/react'
import { Foods } from './app/components/Foods';
import Sidebar from './app/components/Sidebar';
import { FoodMemoryRepository } from './infra/repositories/food-memory-repository';

const foodRepository = new FoodMemoryRepository([
  { id: Date.now().toString() + '1', name: 'Banana', expiresIn: 5, createdAt: new Date() },
  { id: Date.now().toString() + '2', name: 'Maçã', expiresIn: 5, createdAt: new Date() },
  { id: Date.now().toString() + '3', name: 'Mamão', expiresIn: 5, createdAt: new Date() },
  { id: Date.now().toString() + '4', name: 'Tomate', expiresIn: 5, createdAt: new Date() },
  { id: Date.now().toString() + '5', name: 'Cenoura', expiresIn: 5, createdAt: new Date() },
])

function App() {
  return (
    <ChakraProvider>
      <Sidebar>
        <Foods foodRepository={foodRepository}/>
      </Sidebar>
    </ChakraProvider>
  );
}

export default App;
