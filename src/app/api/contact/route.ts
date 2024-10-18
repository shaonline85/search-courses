import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { name, email, selectedCourse } = body;
  
  if (!name || !email || !selectedCourse) 
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  return NextResponse.json({ message: 'Contact information submitted successfully!' }, { status: 200 });   
};