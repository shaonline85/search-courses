import React from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import useCourseSearch from "@/hooks/useCourseSearch";
import { CourseTableRow } from "./courseTableRow";

interface CourseListProps {
	handleSelectCourse: (course: Course) => void;
	searchTerm: string;
}

const CourseList: React.FC<CourseListProps> = ({
	searchTerm,
	handleSelectCourse,
}) => {
	const CACHE_DURATION = 10 * 60 * 1000;
	const { courses, loading, error } = useCourseSearch(
		searchTerm,
		CACHE_DURATION
	);

	return (
		<>
			<h3 className="mb-3 text-lg">Course List</h3>
			<div className="relative flex flex-col w-full h-[70vh] overflow-y-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
				{loading ? (
					<p className="text-center">Loading courses...</p>
				) : error ? (
					<p className="text-center">{error}</p>
				) : (
					<Table>
						<TableCaption>A list of available courses.</TableCaption>
						<TableHeader className="sticky top-0 bg-slate-50 z-10">
							<TableRow>
								<TableHead className="w-[100px]">Course</TableHead>
								<TableHead>Institute</TableHead>
								<TableHead>Category</TableHead>
								<TableHead className="text-right">StartDate</TableHead>
								<TableHead className="text-right"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{courses.length > 0 ? (
								courses.map((course) => (
									<CourseTableRow
										course={course}
										handleSelect={handleSelectCourse}
										key={course.CourseId}
									/>
								))
							) : (
								<TableRow>
									<TableCell colSpan={5} className="text-center">
										No courses found
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				)}
			</div>
		</>
	);
};

export default CourseList;
