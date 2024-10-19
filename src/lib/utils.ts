import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const contactFormSchema = () => z.object({  
  name: z.string().min(3),
  contact: z.string().min(10).max(10),  
  email: z.string().email()
  }
)

export const removeTimeFromDateTime = (dateTime: string): string =>
		dateTime.split(" ")[0];



