import Image from 'next/image'
import { FormEvent, useState } from 'react'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import iconCheckImg from '../assets/icon-check.svg'
import logoImg from '../assets/logo.svg'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import { api } from '../lib/axios'

interface IProps {
  poolCount: number
  guessCount: number
  usersCount: number
}

export default function Home({ poolCount, guessCount, usersCount }: IProps) {
  const [poolTitle, setPoolTitle] = useState<string>('')

  async function createPool(event: FormEvent) {
    event.preventDefault()

    try {
      const { data: { code } } = await api.post('/pools', { title: poolTitle })

      await navigator.clipboard.writeText(code)

      setPoolTitle('')

      alert(`Bolão criado com sucesso, o código foi copiado para a área de transferência, ${code}`)
    } catch (error) {
      console.error('error =>', error)
      alert('Falha ao criar o bolão, tente novamente')
    }
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={logoImg} alt='NLW 9 Copa' />

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={usersAvatarExampleImg} alt='usersAvatarExampleImg' />
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-green'>+ {usersCount}</span>
            {' '} {usersCount > 1 ? 'pessoas já estão usando' : 'pessoa já está usando'}
          </strong>
        </div>

        <form onSubmit={createPool} className='mt-10 flex gap-2'>
          <input
            type='text'
            required
            placeholder='Qual nome do seu bolão?'
            onChange={(event) => setPoolTitle(event.target.value)}
            value={poolTitle}
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100'
          />

          <button
            type='submit'
            // eslint-disable-next-line max-len
            className='bg-ignite-yellow1 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-ignite-yellow2'
          >
            CRIAR MEU BOLÃO
          </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas
        </p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt='iconCheckImg' />

            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+ {poolCount}</span>
              <span>{poolCount > 1 ? 'Bolões criados' : 'Bolão criado'}</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600' />

          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt='iconCheckImg' />

            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+ {guessCount}</span>
              <span>{guessCount > 1 ? 'Palpites enviados' : 'Palpite enviado'}</span>
            </div>
          </div>
        </div>
      </main>

      <Image src={appPreviewImg} alt='appPreviewImg' quality={100} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, usersCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
    },
  }
}
