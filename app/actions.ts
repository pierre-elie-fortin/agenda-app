'use server'

import {getServerSession} from "next-auth/next"
import {authOptions} from "./utils/authOptions"
import prisma from "@/lib/prisma"
import { revalidateTag } from "next/cache"

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

export async function getProject(params: string) {
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


export async function addSession(params: string, date: Date) {
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

export async function getNewClientsPerMonth(year: number) {

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw new Error("Non autorisé");
    }
  try {
    // Définir les bornes de la période
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    // Requête Prisma
    const allNewClients = await prisma.client.findMany({
      where: {
        user: { email: session.user.email },
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: { createdAt: true },
    });

    // Si aucun client n’est trouvé
    if (allNewClients.length === 0) {
      return Array.from({ length: 12 }, (_, month) => ({
        month,
        count: 0,
      }));
    }

    // Compter les clients par mois
    const monthlyCounts = Array.from({ length: 12 }, () => 0);

    for (const client of allNewClients) {
      const month = client.createdAt.getMonth(); // 0 = janvier, 11 = décembre
      monthlyCounts[month] += 1;
    }

    return monthlyCounts.map((count, month) => ({
      month,
      count,
    }));
  } catch (error) {
    console.error("Erreur dans getNewClientsPerMonth:", error);
    throw error; // Ou renvoyer une valeur par défaut comme []
  }
}



export async function getSessionsPerMonth(year: number) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw new Error("Non autorisé");
    }

    // Define the date range for the year
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    // Fetch all sessions in the date range
    const sessions = await prisma.projectSession.findMany({
      where: {
        user: { email: session.user.email },
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: { date: true }, // Fetch only the date field
    });

    // Group sessions by month
    const monthlyCounts = Array.from({ length: 12 }, () => 0);
    for (const session of sessions) {
      const month = session.date.getMonth(); // 0 = January, 11 = December
      monthlyCounts[month] += 1;
    }

    // Return the monthly counts
    return monthlyCounts.map((count, month) => ({
      month,
      count,
    }));
  } catch (error) {
    console.error("Error in getSessionsPerMonth:", error);
    throw error; // Optionally return an empty array
  }
}

export async function updateUserProfile({
                                          name,
                                          email,
                                          subscriptionPlan
                                        }: {
  name?: string,
  email?: string,
  subscriptionPlan?: 'free' | 'basic' | 'pro'
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Non autorisé")

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(subscriptionPlan && { subscriptionPlan }),
      },
    })

    // Revalidate the session
    revalidateTag('session')

    return { success: true, user: updatedUser }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error)
    return { success: false, error: "Erreur lors de la mise à jour du profil" }
  }
}




