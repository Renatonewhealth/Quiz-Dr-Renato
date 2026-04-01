import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'h9pharma-reembolso-secret-2024'
);

export async function createToken(payload: { id: number; email: string; nome: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { id: number; email: string; nome: string };
  } catch {
    return null;
  }
}

export async function getReembolsoSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('reembolso_admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}
