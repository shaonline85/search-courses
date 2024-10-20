import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CourseList from "../components/CourseList";

beforeEach(() => {
	global.fetch = jest.fn();
});

afterEach(() => {
	jest.resetAllMocks();
});

it("renders the course list correctly", async () => {
	(fetch as jest.Mock).mockResolvedValueOnce({
		ok: true,
		json: async () => [
			{
				CourseId: "1",
				CourseName: "Test Course 1",
				InstituteName: "Institute 1",
				Category: "Category 1",
				StartDate: "2023-10-20T00:00:00Z",
			},
			{
				CourseId: "2",
				CourseName: "Test Course 2",
				InstituteName: "Institute 2",
				Category: "Category 2",
				StartDate: "2023-10-21T00:00:00Z",
			},
		],
	});

	render(<CourseList searchTerm="" handleSelectCourse={jest.fn()} />);

	await waitFor(() =>
		expect(screen.getByText("Test Course 1")).toBeInTheDocument()
	);
	expect(screen.getByText("Test Course 2")).toBeInTheDocument();
});

it("displays a message when no courses are found", async () => {
	(fetch as jest.Mock).mockResolvedValueOnce({
		ok: true,
		json: async () => [],
	});

	render(
		<CourseList searchTerm="No courses found" handleSelectCourse={jest.fn()} />
	);

	await waitFor(() =>
		expect(screen.getByText("No courses found")).toBeInTheDocument()
	);
});
