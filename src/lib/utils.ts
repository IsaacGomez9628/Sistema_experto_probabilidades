import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T>(
    updaterOrValue: ((old: T) => T) | T,
    stateRef: { value: T }
): void {
  if (typeof updaterOrValue === 'function') {
    stateRef.value = (updaterOrValue as (old: T) => T)(stateRef.value);
  } else {
    stateRef.value = updaterOrValue;
  }
}