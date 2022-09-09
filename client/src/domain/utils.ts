export const parseIntOrZeroIfNaN = (value: string) => {
  const parsedValue = parseInt(value)
  return isNaN(parsedValue) ? 0 : parsedValue
}

export const isEmail = (value: string) => {
  return value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}
