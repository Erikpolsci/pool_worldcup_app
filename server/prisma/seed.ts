import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email:'john.doe@gmail.com',
        avatarUrl: 'https://github.com/erikpolsci.png',
      }  
    })

    const pool = await prisma.pool.create({
        data:{
            title:'Exemple Pool',
            code: 'BOL123',
            ownerId:user.id,

            participants: {
                create:{
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data:{
            date: '2022-11-15T12:00:00.217Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    })

    await prisma.game.create({
        data:{
            date: '2022-11-16T12:00:00.217Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses:{
               create: {
                firstTeamPoints:2,
                SecondTeamPoints:1,

                participant: {
                    connect: {
                        userId_poolId: {
                            userId: user.id,
                            poolId: pool.id,
                        }
                    }
                }

               } 
            }
        }
    })
}

main()