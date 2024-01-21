import jwt from "jsonwebtoken";

const secret = process.env.NEXTAUTH_SECRET as string;

interface Payload {
  uid: string;
}

export const encodeToken = (payload: Payload) => {
  return jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
};

export const decodeToken = (token: string) => {
  try {
    return jwt.verify(token, secret) as Payload;
  } catch (error) {
    return null;
  }
};
