import bcrypt from "bcryptjs";

const saltRounds = 10;

export async function encrypt(text: string) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(text, salt);
}

export async function validatePassword(
  inputPassword: string,
  storedHash: string
): Promise<boolean> {
  return await bcrypt.compare(inputPassword, storedHash);
}