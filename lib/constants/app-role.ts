/** Must match `enum AppRole` in backend Prisma schema. */
export const APP_ROLES = ["ADMIN"] as const;
export type AppRole = (typeof APP_ROLES)[number];
