import React from "react";

// interface CourseListProps {
// 	courses: Course[];
// 	setSelectedCourse: (course: Course | null) => void;
// }

interface CourseListProps {
	courses: Course[];
	handleSelectCourse: (course: Course) => void;
}

const CourseList: React.FC<CourseListProps> = ({
	courses,
	handleSelectCourse,
	//setSelectedCourse,
}) => {
	const removeTimeFromDateTime = (dateTime: string): string =>
		dateTime.split(" ")[0];
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
											// onClick={() => setSelectedCourse(course)}
											onClick={() => handleSelectCourse(course)}
										>
											Select
										</button>
										{/* <button
											data-modal-target="default-modal"
											data-modal-toggle="default-modal"
											className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
											type="button"
										>
											Toggle modal
										</button> */}
									</td>
								</tr>
							))
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
