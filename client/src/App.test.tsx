import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Homy title', () => {
  render(<App />)
  const linkElement = screen.getByText(/Homy/i)
  expect(linkElement).toBeInTheDocument()
})
