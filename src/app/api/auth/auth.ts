import { getCommitteeByName } from "@/server/db/repos/committeesRepo";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 8;

export const authenticate = async (committeeName: string, password: string) => {
  const committee = await getCommitteeByName(committeeName);

  const passwordCorrect = await bcrypt.compare(
    password,
    committee.passwordHash,
  );

  if (passwordCorrect) {
    const secret = process.env.AUTH_SECRET;
    if (!secret) throw new Error("AUTH_SECRET MISSING");

    // Sign only what the session needs. The committee row also holds
    // passwordHash, and a JWT payload is base64, not encrypted.
    const token = jwt.sign({ id: committee.id, name: committee.name }, secret, {
      expiresIn: TOKEN_MAX_AGE_SECONDS,
    });
    return token;
  }

  throw new Error("Invalid credentials");
};

interface DecodedToken {
  id: number;
  committeeName: string;
}

export const getSession = async () => {
  const authToken = (await cookies()).get("token");
  if (!authToken) {
    throw new Error("Token error: user not logged in or token invalid");
  }
  const session = decodeToken(authToken.value);
  return session;
};

export const decodeToken = (token: string): DecodedToken | undefined => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET MISSING");

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload & {
      id: number;
      name: string;
    };
    return {
      id: decoded.id,
      committeeName: decoded.name,
    };
  } catch (error) {
    throw error;
  }
};

export const tokenValid = (token: string) => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET MISSING");

  try {
    jwt.verify(token, secret);
    return true;
  } catch {
    return false;
  }
};
