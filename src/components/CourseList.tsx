import React, { useState, useEffect, useCallback, cache } from "react";
import debounce from "lodash.debounce";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { removeTimeFromDateTime } from "@/lib/utils";

interface CourseListProps {
	handleSelectCourse: (course: Course) => void;
	searchTerm: string;
}
type cacheDataType = {
	timestamp: number;
	courses: Course[];
};

const CourseList: React.FC<CourseListProps> = ({
	searchTerm,
	handleSelectCourse,
}) => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const CACHE_DURATION = 10 * 60 * 1000;

	const fetchCourses = async (term: string) => {
		setLoading(true);
		setError(null);

		const cachedData = localStorage.getItem(`courses_${term}`);
		if (cachedData) {
			const parsedData = JSON.parse(cachedData);
			setCourses(parsedData.courses);
			setLoading(false);
			return;
		}

		try {
			const res = await fetch(`/api/courses?search=${term}`);
			if (!res.ok) throw new Error("Failed to fetch courses");
			const data = await res.json();
			if (term) {
				const cacheData: cacheDataType = {
					timestamp: Date.now(),
					courses: data,
				};
				localStorage.setItem(`courses_${term}`, JSON.stringify(cacheData));
			}
			setCourses(data);
		} catch (err) {
			setError("Unable to load courses. Please try again later, Error: " + err);
		} finally {
			setLoading(false);
		}
	};

	const debouncedFetchCourses = useCallback(
		debounce((term: string) => {
			fetchCourses(term);
		}, 300),
		[]
	);

	const clearExpiredCaches = () => {
		const keys = Object.keys(localStorage);
		keys.forEach((key) => {
			const cachedData = localStorage.getItem(key);
			if (cachedData) {
				const { timestamp } = JSON.parse(cachedData);
				if (Date.now() - timestamp >= CACHE_DURATION) {
					localStorage.removeItem(key);
				}
			}
		});
	};

	useEffect(() => {
		clearExpiredCaches();
		if (searchTerm) debouncedFetchCourses(searchTerm);
		else fetchCourses(searchTerm);
	}, [searchTerm, debouncedFetchCourses]);

	return (
		<>
			<h3 className="mb-3 text-lg">Course List</h3>

			<div className="relative flex flex-col w-full h-[70vh] overflow-y-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
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
								<TableRow key={course.CourseId}>
									<TableCell className="font-medium min-w-96">
										{course.CourseName}
									</TableCell>
									<TableCell>{course.InstituteName}</TableCell>
									<TableCell>{course.Category}</TableCell>
									<TableCell className="text-right">
										{removeTimeFromDateTime(course.StartDate)}
									</TableCell>
									<TableCell className="text-right">
										<Button
											type="button"
											className=" bg-slate-700"
											onClick={() => handleSelectCourse(course)}
										>
											Select
										</Button>
									</TableCell>
								</TableRow>
							))
						) : loading ? (
							<TableRow>
								<TableCell colSpan={5} className="text-center">
									Loading courses...
								</TableCell>
							</TableRow>
						) : error ? (
							<TableRow>
								<TableCell colSpan={5} className="text-center">
									{error}
								</TableCell>
							</TableRow>
						) : (
							<TableRow>
								<TableCell colSpan={5} className="text-center">
									No courses found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default CourseList;
