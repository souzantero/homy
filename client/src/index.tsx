import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FoodMemoryRepository } from './infra/repositories/food-memory-repository';
import reportWebVitals from './reportWebVitals';

const foodRepository = new FoodMemoryRepository([
  { id: Date.now().toString() + '1', name: 'Banana', expiresIn: 5, createdAt: new Date() },
  { id: Date.now().toString() + '2', name: 'Maçã', expiresIn: 5, createdAt: new Date() },
  { id: Date.now().toString() + '3', name: 'Mamão', expiresIn: 5, createdAt: new Date() },
  { id: Date.now().toString() + '4', name: 'Tomate', expiresIn: 5, createdAt: new Date() },
  { id: Date.now().toString() + '5', name: 'Cenoura', expiresIn: 5, createdAt: new Date() },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App 
      repository={{
        food: foodRepository
      }}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
