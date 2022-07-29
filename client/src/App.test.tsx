import { render, screen } from '@testing-library/react';
import App from './App';
import { FoodMemoryRepository } from './infra/repositories/food-memory-repository';

const repository = {
  food: new FoodMemoryRepository([])
}

test('renders my foods title', () => {
  render(<App repository={repository} />);
  const linkElement = screen.getByText(/my foods/i);
  expect(linkElement).toBeInTheDocument();
});
