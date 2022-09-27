import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Retaily title', () => {
  render(<App />)
  const linkElement = screen.getByText(/Retaily/i)
  expect(linkElement).toBeInTheDocument()
})
