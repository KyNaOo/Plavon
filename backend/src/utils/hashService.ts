import * as bcrypt from 'bcrypt';

export function encodePassword(password: string) {
  const saltOrRounds = 10;
  const salt = bcrypt.genSaltSync(saltOrRounds);
  return bcrypt.hashSync(password, salt);
}
