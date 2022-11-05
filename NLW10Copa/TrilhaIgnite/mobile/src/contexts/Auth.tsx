import { createContext, ReactNode, useEffect, useState } from 'react'
import * as AuthSession from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

interface IUserProps {
  name: string
  avatarUrl: string
}

export interface IAuthContextProps {
  user: IUserProps
  isUserLoading: boolean
  signIn: () => Promise<void>
}

export const AuthContext = createContext({} as IAuthContextProps)

interface IAuthContextProvider {
  children: ReactNode
}

export function AuthContextProvider({ children }: IAuthContextProvider) {
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false)
  const [user, setUser] = useState<IUserProps>({} as IUserProps)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '611709203884-njqclfuv5hjf65e708n9s88mk8fuod5u.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  })

  async function signIn() {
    try {
      setIsUserLoading(true)
      await promptAsync()
    } catch (error) {
      console.error('error =>', error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle(accessToken: string) {
    console.log('Token de autenticação =>', accessToken)
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider value={{
      user,
      isUserLoading,
      signIn,
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}
