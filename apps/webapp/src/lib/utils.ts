import { PortType } from '@shared/prisma';
import { type ClassValue, clsx } from 'clsx';
import stc from 'string-to-color';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function wait(duration = 750) {
  await new Promise(resolve => setTimeout(resolve, duration));
}

export function computePortColor(type: PortType, generic?: PortType) {
  return stc(generic && ['Array', 'Object'].includes(type) ? `${type}<${generic}>` : type);
}

export async function devDelay() {
  if (import.meta.env.DEV) {
    const ms = Math.floor(Math.random() * 1000);

    await wait(ms);
  }
}
