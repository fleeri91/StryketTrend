'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { Button, TextInput } from '@tremor/react'

import Typography from '@components/Typography'

import { UserDTO } from 'types/user/UserDTO'

const LoginForm = (): JSX.Element => {
  const initialUserState: UserDTO = {
    username: '',
    email: '',
    password: '',
  }

  const [user, setUser] = useState<UserDTO>(initialUserState)

  const router = useRouter()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { username, password } = user

    await signIn('credentials', {
      username,
      password,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          toast.success('Inloggning lyckades')
          router.push('/')
        } else {
          toast.error('Felaktigt användarnamn eller lösenord')
        }
      })
      .catch(() => {
        toast.error('Felaktigt användarnamn eller lösenord')
      })
  }

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Typography variant="h1" align="center">
            Logga in
          </Typography>
        </div>

        <div className="mt-10 sm:mx-auto w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleOnSubmit}>
            <TextInput
              id="username"
              name="username"
              type="text"
              placeholder="Användarnamn"
              className="p-2"
              value={user.username}
              onChange={handleInputChange}
            />
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="Lösenord"
              className="p-2"
              value={user.password}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              color="indigo"
              className="w-full dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
            >
              <Typography variant="p">Logga in</Typography>
            </Button>
          </form>

          <Typography align="center" variant="p" className="mt-2">
            {`Har du inget konto? Skapa ett `}
            <Link className="hover:text-indigo-400 transition-colors underline" href="/register">
              här
            </Link>
          </Typography>
        </div>
      </div>
    </>
  )
}

export default LoginForm
