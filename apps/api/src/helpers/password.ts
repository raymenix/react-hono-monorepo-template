import $env from '@cfg/config.js';
import { hash as _hash, compare as _compare } from 'bcrypt';

const salt = Number($env('API_SALT'));

export const hash = async (pswd: string): Promise<string> => _hash(pswd, salt);

export const compare = async (pswd: string, hashed: string): Promise<boolean> => _compare(pswd, hashed);

const $password = { hash, compare };

export default $password;
