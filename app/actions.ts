'use server'

import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function getClients() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Non autorisé")

  return prisma.client.findMany({
    where: {
      user: { email: session.user.email }
    },
    include: {
      projects: true
    }
  })
}

export async function getClient(id: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Non autorisé")

  return prisma.client.findFirst({
    where: {
      id: id,
      user: { email: session.user.email }
    },
    include: {
      projects: {
        include: {
          sessions: true
        }
      }
    }
  })
}

export async function addClient({ nom, email, telephone }: { nom: string, email: string, telephone: string }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Non autorisé")

  return prisma.client.create({
    data: {
      nom,
      email,
      telephone,
      user: { connect: { email: session.user.email } }
    }
  })
}

export async function updateClient(id: string, { nom, email, telephone }: { nom: string, email: string, telephone: string }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Non autorisé")

  return prisma.client.updateMany({
    where: {
      id: id,
      user: { email: session.user.email }
    },
    data: { nom, email, telephone }
  })
}

export async function addProject(clientId: string, { nom, description }: { nom: string, description: string }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Non autorisé")

  return prisma.project.create({
    data: {
      nom,
      description,
      client: { connect: { id: clientId } }
    }
  })
}

export async function getProject(id: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Non autorisé")

  return prisma.project.findFirst({
    where: {
      id: id,
      client: { user: { email: session.user.email } }
    },
    include: {
      sessions: true,
      client: true
    }
  })
}

export async function addSession(projectId: string, date: Date) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Non autorisé")

  return prisma.session.create({
    data: {
      date,
      project: { connect: { id: projectId } }
    }
  })
}

export async function deleteSession(sessionId: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Non autorisé")

  return prisma.session.deleteMany({
    where: {
      id: sessionId,
      project: { client: { user: { email: session.user.email } } }
    }
  })
}

export async function getSessionsForMonth(date: Date) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Non autorisé")

  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)

  return prisma.session.findMany({
    where: {
      date: {
        gte: startOfMonth,
        lte: endOfMonth
      },
      project: {
        client: {
          user: {
            email: session.user.email
          }
        }
      }
    },
    include: {
      project: {
        include: {
          client: true
        }
      }
    }
  })
}

