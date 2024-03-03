import LoginForm from '@components/LoginForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
  return <LoginForm />
}

export default LoginPage
