import './setup-env-vars.ts'
import { afterAll, afterEach } from 'vitest'
import { installGlobals } from '@remix-run/node'
import 'dotenv/config'
import fs from 'fs'
import { BASE_DATABASE_PATH, DATABASE_PATH } from './paths.ts'
import { prisma } from '~/utils/db.server.ts'

installGlobals()
fs.copyFileSync(BASE_DATABASE_PATH, DATABASE_PATH)

afterEach(async () => {
	await prisma.user.deleteMany()
	await prisma.permission.deleteMany()
	await prisma.role.deleteMany()
})

afterAll(async () => {
	await prisma.$disconnect()
	await fs.promises.rm(DATABASE_PATH)
})