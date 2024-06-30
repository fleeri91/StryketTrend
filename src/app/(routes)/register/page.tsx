'use client'

import { FormEvent, useState } from 'react'
import axios from 'axios'
import { Button, TextInput } from '@tremor/react'

import Alert from '@components/UI/Alert'

import { UserDTO } from 'types/user/UserDTO'
import Link from 'next/link'
import Typography from '@components/Typography'

const RegisterPage = (): JSX.Element => {
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

    const { username, email, password } = user

    if (!username || !email || !password) {
      setAlertMessage({ type: 'danger', message: 'Please fill the text inputs' })
      return
    }

    try {
      const userExistsRes = await axios.post(
        '/api/userExists',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const { existingUser } = await userExistsRes.data

      if (existingUser) {
        setAlertMessage({ type: 'danger', message: 'User already exists' })
        return
      }

      const registerResponse = await axios.post(
        '/api/register',
        { user },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (registerResponse.status === 201) {
        setUser(initialUserState)
        setAlertMessage({ type: 'success', message: 'User registration success' })
      } else {
        setAlertMessage({ type: 'danger', message: 'User registration failed' })
      }
    } catch (error) {
      setAlertMessage({ type: 'danger', message: error as string })
    }
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
          <Typography variant="h1" align="center">
            Registrera
          </Typography>
        </div>

        <div className="mt-10 sm:mx-auto w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleOnSubmit}>
            <TextInput
              id="username"
              name="username"
              type="text"
              placeholder="Namn"
              className="p-2"
              value={user.username}
              onChange={handleInputChange}
            />
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              className="p-2"
              value={user.email}
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
              <Typography variant="p">Skicka</Typography>
            </Button>
          </form>

          <Typography align="center" variant="p" className="mt-2">
            {`Har du redan ett konto? Logga in `}
            <Link className="hover:text-indigo-400 transition-colors underline" href="/login">
              här
            </Link>
          </Typography>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
