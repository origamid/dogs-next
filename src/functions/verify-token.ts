import { jwtVerify } from 'jose';

export default async function verifyToken(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SALT), {
      algorithms: ['HS256'],
    });
    return true;
  } catch (error) {
    return false;
  }
}
