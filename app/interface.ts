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
    user: User;
    date?: Date;
    projectId?: string;
    project?: Project;
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
    user: User;
    projects: Project[];
    createdAt: Date;
}
export interface Project {
    id: string;
    nom: string;
    description: string;
    clientId: string;
    client: Client;
    sessions: ProjectSession[];
}
