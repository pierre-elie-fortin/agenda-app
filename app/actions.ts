'use server'

import {getServerSession} from "next-auth/next"
import {authOptions} from "./api/auth/[...nextauth]/route"
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

export async function getClient(params) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Non autorisé")

  return prisma.client.findFirst({
    where: {
      id: params.id,
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

export async function getProject(params) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Non autorisé")

  return prisma.project.findFirst({
    where: {
      id: params,
      client: { user: { email: session.user.email } }
    },
    include: {
      sessions: true,
      client: true
    }
  })
}


export async function addSession(params, date: Date) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized: User email is missing");

  try {
    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) {
      throw new Error("Invalid date format");
    }

    const formattedExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      throw new Error("User not found");
    }

    const payload = {
      date: formattedDate,
      projectId: params,
      sessionToken: `${session.user.email}-${Date.now()}`,
      userId: user.id,
      expires: formattedExpires,
    };


    return await prisma.projectSession.create({data: payload});
  } catch (error) {
    console.error("Error adding session:", error.stack || error);
    throw new Error(`Failed to add session: ${error.message}`);
  }
}




export async function deleteSession(sessionId: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Non autorisé")

  return prisma.projectSession.deleteMany({
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

  return prisma.projectSession.findMany({
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

export async function getSessionsForDay(date: Date) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Non autorisé");

  // Define the start and end of the day
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

  return prisma.projectSession.findMany({
    where: {
      date: {
        gte: startOfDay,
        lt: endOfDay, // Use less than (<) to exclude the next day boundary
      },
      project: {
        client: {
          user: {
            email: session.user.email,
          },
        },
      },
    },
    include: {
      project: {
        include: {
          client: true,
        },
      },
    },
  });
}


