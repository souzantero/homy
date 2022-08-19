import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSignIn } from '../../../hooks/useSignIn'

export function SignIn() {
  const { signIn, isSigning } = useSignIn()
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const params = { email, password }
    const signature = await signIn(params)
    if (signature) {
      setEmail('')
      setPassword('')
      navigate('/')
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Conecte-se à sua conta</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            para aproveitar todas as nossas <Link color={'blue'}>funcionalidades</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack as={'form'} spacing={4} onSubmit={handleSubmit}>
            <FormControl id="email" isRequired isDisabled={isSigning}>
              <FormLabel>E-mail</FormLabel>
              <Input type="email" autoComplete='email' value={email} onChange={handleChangeEmail} />
            </FormControl>
            <FormControl id="password" isRequired isDisabled={isSigning}>
              <FormLabel>Senha</FormLabel>
              <Input type="password" autoComplete='password' minLength={8} value={password} onChange={handleChangePassword} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox isDisabled={isSigning}>Lembrar</Checkbox>
                <Link color={'blue'}>Esqueceu a senha?</Link>
              </Stack>
              <Button type='submit' bg={'blue'} color={'white'} isDisabled={isSigning} isLoading={isSigning}>
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}