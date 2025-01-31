
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTimeRemaining(offerExpiresAt: number): string {
 

  const diff = offerExpiresAt - Date.now();
  const minutes = Math.floor((diff / 1000 / 60));
  const seconds = Math.floor((diff / 1000) % 60);

  if(minutes > 0) 
    return `${minutes}m ${seconds}s`;
  else
    return `${seconds}s`;

  
}
