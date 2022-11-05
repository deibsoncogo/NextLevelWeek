import { Fontisto } from '@expo/vector-icons'
import { Center, Icon, Text } from 'native-base'
import Logo from '../assets/logo.svg'
import { Button } from '../components/Button'

export function SignIn() {
  return (
    <Center flex={1} bgColor='gray.900' p={7}>
      <Logo />

      <Button
        title='ENTRAR COM O GOOGLE'
        leftIcon={<Icon as={Fontisto} name='google' color='white' size='md' />}
        type='secondary'
        mt={12}
      />

      <Text color='white' textAlign='center' mt={4}>
        Não utilizamos nenhuma informação além {'\n'}
        do seu e-mail para criação de sua conta
      </Text>
    </Center>
  )
}
