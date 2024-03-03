'use client'

import { FormEvent, useState } from 'react'

import { Button, TextInput } from '@tremor/react'
import axios from 'axios'

import { UserDTO } from 'types/user/UserDTO'

const LoginPage = (): JSX.Element => {
  const initialUserState: UserDTO = {
    username: '',
    email: '',
    password: '',
  }

  const [user, setUser] = useState<UserDTO>(initialUserState)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { username, email, password } = user

    if (!username || !email || !password) {
      return
    }

    try {
      const userExistsResponse = await axios.post('/api/userExists', { email })
      const user = userExistsResponse.data.user
      if (user) {
        console.log('User exists')
        return
      }

      const registerResponse = await axios.post('/api/register', { user })
      if (registerResponse.status === 201) {
        setUser(initialUserState)
      } else {
        console.log('User registration failed')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Registrera
        </h1>
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
            className="w-full dark:text-white p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            Skicka
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
