import { encodeToken } from "./jwt";

interface EncodeUserData {
  uid: string;
}

export const encodeUserData = ({ uid }: EncodeUserData) => {
  return encodeToken({
    uid,
  });
};
