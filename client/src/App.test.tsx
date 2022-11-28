import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Homylife title', () => {
  render(<App />)
  const linkElement = screen.getByText(/Homylife/i)
  expect(linkElement).toBeInTheDocument()
})
