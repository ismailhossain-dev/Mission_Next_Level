export const USER_ROLE = {
    admin: "admin", 
    agent: "agent"
} as const; //as const mane holo eta konono change korbo na 

export type ROLES = "admin" | "agent" | "user"