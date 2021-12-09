import { User, Role } from "@prisma/client";

export const sanitizeAPIUser = <HasRole extends boolean>(
    user: HasRole extends true ? User & { role: Role | null } : User,
    allowSensitive = false,
    allowFullSensitive = false,
) => ({
    id: user.id,
    name: user.name,
    email: allowSensitive ? user.email : undefined,
    image: user.image,
    role: ("role" in user
        ? allowFullSensitive
            ? user.role
                ? {
                      id: user.role.id,
                      name: user.role.name,
                      permissions: user.role.permissions,
                  }
                : undefined
            : undefined
        : undefined) as HasRole extends true ? Role | undefined : undefined,
});
