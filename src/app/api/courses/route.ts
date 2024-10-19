import { loadCourses } from "../../../lib/courseLoader";
import { NextResponse } from "next/server";

//export const dynamic = "force-dynamic";
export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search');

  try{
    let courses = await loadCourses();
    
    if (searchTerm) {
      courses = courses.filter((course :Course) =>
        course.InstituteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.CourseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.Category.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
    }

    return NextResponse.json(courses);
  }
    
  catch (error) {
    return NextResponse.json({ error: `Faild to load courses: ${error}` }, { status: 500 });
  }
}
