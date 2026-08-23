//eta user.route.ts gellalluser use kora hobe
export const USER_ROLE = {
    admin: "admin",
    seller: "seller",
    user: "user"
} as const; //as const=>ei role gola kokono change hobe na

//type union
export type ROLES = "admin" | "seller" | "user"
