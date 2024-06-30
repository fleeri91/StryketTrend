'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { Button, TextInput } from '@tremor/react'

import Alert from '@components/UI/Alert'

import { UserDTO } from 'types/user/UserDTO'
import { signIn } from 'next-auth/react'

const LoginForm = (): JSX.Element => {
  const initialUserState: UserDTO = {
    username: '',
    email: '',
    password: '',
  }
  const initialAlertMessage: AlertMessage = {
    message: '',
  }

  const [user, setUser] = useState<UserDTO>(initialUserState)
  const [alertMessage, setAlertMessage] = useState<AlertMessage>(initialAlertMessage)

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
          setAlertMessage({ type: 'success', message: 'Logged in' })
          return
        } else {
          setAlertMessage({ type: 'danger', message: 'Username or password is incorrect.' })
        }
      })
      .catch(() => {
        setAlertMessage({ type: 'danger', message: 'Username or password is incorrect.' })
      })
  }

  return (
    <>
      <Alert
        type={alertMessage.type}
        hidden={!alertMessage.message}
        onClick={() => setAlertMessage(initialAlertMessage)}
      >
        {alertMessage.message}
      </Alert>

      <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Logga in
          </h1>
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
              className="w-full dark:text-white p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
            >
              Logga in
            </Button>
          </form>

          <p className="mt-2 text-center text-base font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            {`Har du inget konto? Skapa ett `}
            <Link className="hover:text-indigo-400 transition-colors underline" href="/register">
              här
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginForm
