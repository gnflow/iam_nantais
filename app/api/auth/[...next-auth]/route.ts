// api/[...next]/route.tsx
import { auth } from "@/auth"; // Utilisation de `auth` au lieu de `handlers`

export const GET = auth;
export const POST = auth;
