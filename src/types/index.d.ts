declare type Course = {
  CourseId: string;
  InstituteName: string;
  CourseName : string;
  Category: string;
  DeliveryMethod: string;
  Location: string;
  Language: string;
  StartDate: string;
};

declare type ContactProps = {
  name: string;
  email: string;
  contact: string;  
};

declare type selectedCourseProps = ContactProps & {
  selectedCourse: Course;
};