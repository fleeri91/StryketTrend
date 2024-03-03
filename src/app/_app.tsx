import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

interface AppProps {
  Component: React.ComponentType<any>
  pageProps: {
    session: Session | null
    [key: string]: any
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App
