import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getCommitteeByName } from "../db/repos/committeesRepo";

export const authenticate = async (committeeName: string, password: string) => {
  const committee = await getCommitteeByName(committeeName);

  const passwordCorrect = await bcrypt.compare(
    password,
    committee.passwordHash,
  );

  if (passwordCorrect) {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET MISSING");

    const token = jwt.sign(committee, secret);
    return token;
  }

  throw new Error("Invalid credentials");
};

interface DecodedToken {
  id: string;
  name: string;
}

export const decodeToken = (token: string): DecodedToken => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET MISSING");

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload & {
      id: string;
      name: string;
    };
    return {
      id: decoded.id,
      name: decoded.name,
    };
  } catch (error) {
    throw error;
  }
};
