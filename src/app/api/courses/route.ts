import { loadCourses } from "../../../lib/courseLoader";
import { NextResponse } from "next/server";

let courseCache: Course[] | null = null;
const cacheDuration = 24 * 60 * 60 * 1000;
let lastCacheTime = 0;

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search');

  try{
    const now = Date.now();
    if (!courseCache || now - lastCacheTime > cacheDuration) {      
      courseCache = await loadCourses();
      lastCacheTime = now;
    } 

    let filteredCourses = courseCache;
    
    if (searchTerm) {
      filteredCourses = courseCache.filter((course :Course) =>
        course.InstituteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.CourseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.Category.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
    }

    return NextResponse.json(filteredCourses);
  }
    
  catch (error) {
    return NextResponse.json({ error: `Faild to load courses: ${error}` }, { status: 500 });
  }
}
