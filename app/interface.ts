export interface Account {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refreshToken?: string;
    accessToken?: string;
    expiresAt?: number;
    tokenType?: string;
    scope?: string;
    idToken?: string;
    sessionState?: string;
}
export interface ProjectSession {
    id: string;
    sessionToken?: string;
    userId: string;
    date?: Date;
    projectId: string;
    expires?: Date;
    createdAt: Date;
}
export interface User {
    id: string;
    name?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    password?: string;
    accounts: Account[];
    sessions: ProjectSession[];
    clients: Client[];
}
export interface VerificationToken {
    identifier: string;
    token: string;
    expires: Date;
}
export interface Client {
    id: string;
    nom: string;
    email: string;
    telephone: string;
    userId: string;
    projects: Project[];
    createdAt: Date;
}
export interface Project {
    id: string;
    nom: string;
    description: string;
    clientId: string;
    // sessions? : ProjectSession[]
    // client?: Client
}
