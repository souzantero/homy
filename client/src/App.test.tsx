import { render, screen } from '@testing-library/react';
import App from './App';

test('renders my foods title', () => {
  render(<App />);
  const linkElement = screen.getByText(/my foods/i);
  expect(linkElement).toBeInTheDocument();
});
