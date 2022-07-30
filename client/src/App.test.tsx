import { render, screen } from '@testing-library/react';
import App from './App';

test('renders myfoodstock title', () => {
  render(<App />);
  const linkElement = screen.getByText(/myfoodstock/i);
  expect(linkElement).toBeInTheDocument();
});
