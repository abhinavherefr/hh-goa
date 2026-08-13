import { customAlphabet } from "nanoid";

// Unambiguous alphabet (no 0/O/1/I/l) since this ends up in a public URL people might type/read aloud.
const nanoid = customAlphabet("23456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz", 9);

export function generateShareId() {
  return nanoid();
}
