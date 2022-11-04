import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function Main() {
  const user = await prisma.user.create({
    data: {
      name: 'Dev Primeiro Seed',
      email: 'devprimeiro@outlook.com',
      avatarUrl: 'https://github.com/devPrimeiro.png',
    },
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Pool Seed',
      code: 'BOL123',
      ownerId: user.id,
      participants: { create: { userId: user.id } },
    },
  })

  await prisma.game.create({
    data: {
      date: '2022-11-04T10:37:07.901Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    },
  })

  await prisma.game.create({
    data: {
      date: '2022-11-04T12:42:38.880Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',
      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          participant: { connect: { userId_poolId: { userId: user.id, poolId: pool.id } } },
        },
      },
    },
  })
}

Main()
