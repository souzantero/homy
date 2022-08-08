export const parseIntOrZeroIfNaN = (value: string) => {
  const parsedValue = parseInt(value)
  return isNaN(parsedValue) ? 0 : parsedValue
}