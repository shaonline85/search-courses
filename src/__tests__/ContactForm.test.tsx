import { render, fireEvent, screen } from "@testing-library/react";
import ContactForm from "@/components/ContactForm";
import { mockCourse } from "@/lib/utils";

test("displays validation errors for missing fields", async () => {
	render(
		<ContactForm
			selectedCourse={mockCourse}
			handleSubmit={jest.fn()}
			responseMessage=""
		/>
	);
	fireEvent.submit(screen.getByRole("button"));
	expect(
		await screen.findByText("String must contain at least 3 character(s)")
	).toBeInTheDocument();
	expect(await screen.findByText("Invalid email")).toBeInTheDocument();
});
