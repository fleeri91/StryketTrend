'use client'

import { FormEvent } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

import { Button, TextInput } from '@tremor/react'

const LoginPage = (): JSX.Element => {
  // const { data: session } = useSession()

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const email = event.currentTarget.email.value
    const password = event.currentTarget.password.value

    console.log(email, password)

    /*
    const result = await signIn('email-password', {
      email,
      password,
      redirect: false,
    })
    */
  }

  {
    /*
  if (session) {
    return (
      <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            {`Välkommen ${session.user?.name}`}
          </h1>
        </div>
        <Button
          onClick={() => signOut()}
          color="indigo"
          className="w-full dark:text-white p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
        >
          Logga ut
        </Button>
      </div>
    )
  }
*/
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Logga in
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" onSubmit={handleOnSubmit}>
          <TextInput id="email" name="email" type="email" placeholder="E-mail" className="p-2" />
          <TextInput id="password" name="password" type="password" placeholder="Lösenord" className="p-2" />
          <Button
            type="submit"
            color="indigo"
            className="w-full dark:text-white p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            Logga in
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
