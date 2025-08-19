import { getCommitteeByName } from "@/server/db/repos/committeesRepo";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authenticate = async (committeeName: string, password: string) => {
  const committee = await getCommitteeByName(committeeName);

  const passwordCorrect = await bcrypt.compare(
    password,
    committee.passwordHash,
  );

  if (passwordCorrect) {
    const secret = process.env.AUTH_SECRET;
    if (!secret) throw new Error("AUTH_SECRET MISSING");

    const token = jwt.sign(committee, secret);
    return token;
  }

  throw new Error("Invalid credentials");
};

interface DecodedToken {
  id: string;
  committeeName: string;
}

export const decodeToken = (token: string): DecodedToken => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET MISSING");

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload & {
      id: string;
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
