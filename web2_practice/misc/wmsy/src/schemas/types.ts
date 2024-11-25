import {Account, Models, Databases, Storage, Users} from "node-appwrite";
// import Database = Models.Database;


export type AdditionalContext = {
    Variables: {
        account: Account;
        databases: Databases
        storage: Storage
        users: Users
        user: Models.User<Models.Preferences>
    }
}

export type Workspace = Models.Document & {
    name: string;
    image: string
    inviteCode: string
    userId: string
}

export type Project = Models.Document & {
    name: string;
    image: string
    workspaceId: string
}

export enum TaskStatus {
    BACKLOG = 'BACKLOG',
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    IN_REVIEW = 'IN_REVIEW',
    DONE = 'DONE'
}