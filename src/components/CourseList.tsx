import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

interface CourseListProps {
	handleSelectCourse: (course: Course) => void;
	searchTerm: string;
}

const CourseList: React.FC<CourseListProps> = ({
	searchTerm,
	handleSelectCourse,
}) => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);

	const removeTimeFromDateTime = (dateTime: string): string =>
		dateTime.split(" ")[0];

	const fetchCourses = async (term: string) => {
		setLoading(true);
		const res = await fetch(`/api/courses?search=${term}`);
		const data = await res.json();
		setCourses(data);
		setLoading(false);
	};

	const debouncedFetchCourses = useCallback(
		debounce((term: string) => {
			fetchCourses(term);
		}, 300),
		[]
	);

	useEffect(() => {
		if (searchTerm) debouncedFetchCourses(searchTerm);
		else fetchCourses(searchTerm);
	}, [searchTerm, debouncedFetchCourses]);

	return (
		<>
			<h3 className="mb-3 text-lg">Course List</h3>

			<div className="relative flex flex-col w-full h-[70vh] overflow-y-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
				<table className="w-full text-left table-auto">
					<thead className="sticky top-0 bg-white z-10">
						<tr>
							<th className="p-4 border-b border-slate-300 bg-slate-50">
								<p className="block text-sm font-normal leading-none text-slate-500">
									CourseName
								</p>
							</th>
							<th className="p-4 border-b border-slate-300 bg-slate-50">
								<p className="block text-sm font-normal leading-none text-slate-500">
									Institute Name
								</p>
							</th>
							<th className="p-4 border-b border-slate-300 bg-slate-50">
								<p className="block text-sm font-normal leading-none text-slate-500">
									Category
								</p>
							</th>
							<th className="p-4 border-b border-slate-300 bg-slate-50">
								<p className="block text-sm font-normal leading-none text-slate-500">
									Start Date
								</p>
							</th>

							<th className="p-4 border-b border-slate-300 bg-slate-50">
								<p className="block text-sm font-normal leading-none text-slate-500"></p>
							</th>
						</tr>
					</thead>
					<tbody className="">
						{courses.length > 0 ? (
							courses.map((course) => (
								<tr className="hover:bg-slate-50">
									<td className="p-2 border-b border-slate-200">
										<p className="block text-sm text-slate-800">
											{course.CourseName}
										</p>
									</td>
									<td className="p-2 border-b border-slate-200">
										<p className="block text-sm text-slate-800">
											{course.InstituteName}
										</p>
									</td>
									<td className="p-2 border-b border-slate-200">
										<p className="block text-sm text-slate-800">
											{course.Category}
										</p>
									</td>
									<td className="p-2 border-b border-slate-200">
										<p className="block text-sm text-slate-800">
											{removeTimeFromDateTime(course.StartDate)}
										</p>
									</td>
									<td className="p-2 border-b border-slate-200">
										<button
											data-modal-target="form-modal"
											data-modal-toggle="form-modal"
											className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
											type="button"
											onClick={() => handleSelectCourse(course)}
										>
											Select
										</button>
									</td>
								</tr>
							))
						) : loading ? (
							<tr className="hover:bg-slate-50">
								<td className="p-2 border-b border-slate-200" colSpan={5}>
									<p className="block text-sm text-slate-800 text-center">
										Loading courses...
									</p>
								</td>
							</tr>
						) : (
							<tr className="hover:bg-slate-50">
								<td className="p-2 border-b border-slate-200" colSpan={5}>
									<p className="block text-sm text-slate-800 text-center">
										No courses found
									</p>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default CourseList;
