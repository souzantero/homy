import { render, screen } from '@testing-library/react';
import App from './App';
import { FoodMemoryRepository } from './infra/repositories/food-memory-repository';

const repository = {
  food: new FoodMemoryRepository([])
}

test('renders myfoodstock title', () => {
  render(<App repository={repository} />);
  const linkElement = screen.getByText(/myfoodstock/i);
  expect(linkElement).toBeInTheDocument();
});
