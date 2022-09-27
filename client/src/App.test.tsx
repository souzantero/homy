import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Retailer title', () => {
  render(<App />)
  const linkElement = screen.getByText(/Retailer/i)
  expect(linkElement).toBeInTheDocument()
})
