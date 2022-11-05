import { createContext, ReactNode } from 'react'

interface IUserProps {
  name: string
  avatarUrl: string
}

export interface IAuthContextProps {
  user: IUserProps
  signIn: () => Promise<void>
}

export const AuthContext = createContext({} as IAuthContextProps)

interface IAuthContextProvider {
  children: ReactNode
}

export function AuthContextProvider({ children }: IAuthContextProvider) {
  async function signIn() {
    console.log('entrou na função signIn')
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      user: { name: 'Dev Primeiro', avatarUrl: 'https://github.com/devprimeiro.png' },
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}
