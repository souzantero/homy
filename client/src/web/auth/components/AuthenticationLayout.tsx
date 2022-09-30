import { PropsWithChildren } from 'react'
import { Link } from '@chakra-ui/react'
import { CentralizedBox } from '../../layout'

export interface AuthenticationLayoutProps {
  title: string
}

export function AuthenticationLayout({
  title,
  children
}: PropsWithChildren<AuthenticationLayoutProps>) {
  return (
    <CentralizedBox
      title={title}
      subtitle={
        <>
          para aproveitar todas as nossas{' '}
          <Link color={'blue'}>funcionalidades</Link> ✌️
        </>
      }
    >
      {children}
    </CentralizedBox>
  )
}
