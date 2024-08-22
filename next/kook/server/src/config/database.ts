import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['info', 'warn', 'error', 'query'],
    errorFormat: 'pretty'
})

export default prisma