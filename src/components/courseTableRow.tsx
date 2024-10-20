import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { removeTimeFromDateTime } from "@/lib/utils";

export const CourseTableRow: React.FC<{
	course: Course;
	handleSelect: (course: Course) => void;
}> = ({ course, handleSelect }) => (
	<TableRow key={course.CourseId}>
		<TableCell className="font-medium min-w-96">{course.CourseName}</TableCell>
		<TableCell>{course.InstituteName}</TableCell>
		<TableCell>{course.Category}</TableCell>
		<TableCell className="text-right">
			{removeTimeFromDateTime(course.StartDate)}
		</TableCell>
		<TableCell className="text-right">
			<Button className="bg-slate-700" onClick={() => handleSelect(course)}>
				Select
			</Button>
		</TableCell>
	</TableRow>
);
