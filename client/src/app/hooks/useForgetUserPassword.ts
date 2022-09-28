import { useState } from "react"

export function useForgetUserPassword(): {
  email: string,
  setEmail: (value: string) => void,
  isForgetting: boolean,
  forget: () => Promise<void>
} {
  const [email, setEmail] = useState('')
  const [isForgetting, setIsForgetting] = useState(false)

  const forget = async () => { }

  return {
    email,
    setEmail,
    isForgetting,
    forget
  }
}