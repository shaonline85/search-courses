import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

export const loadCourses = async (): Promise<Course[]> => {
  
  const filePath = path.resolve('./public', 'data.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return new Promise((resolve, reject) => {
    const courses: Course[] = [];
    const parser = parse(fileContent, {
      delimiter: ';',
      columns: true, 
      skip_empty_lines: true,
      relax_column_count: true,
      bom: true
    });
    
    parser.on('readable', () => {
      let record;
      while ((record = parser.read())!==null) {
          courses.push(record);
      }
    });

    parser.on('error', (err) => {
      console.error(err);
      reject(err)
    });
    
    parser.on('end', () => resolve(courses));
  });
};

