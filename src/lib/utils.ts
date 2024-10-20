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
})

export const removeTimeFromDateTime = (dateTime: string): string =>
		dateTime.split(" ")[0];

export const mockCourse = {
  Category: "testCategory",
	CourseId: "000666",
	CourseName: "testCourseName",
	DeliveryMethod: "Distans",
	InstituteName: "testInstituteName",
	Language: "NULL",
	Location: "Distance",
	StartDate: "2024-02-05 00:00:00.000",
}

export const mockCourses = [mockCourse];

