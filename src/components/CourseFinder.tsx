"use client";

import { useState } from "react";
import SearchInput from "./SearchInput";
import CourseList from "./CourseList";
import ContactForm from "./ContactForm";
import Modal from "./Modal";

const CourseFinder = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const handleSelectCourse = (course: Course) => {
		setSelectedCourse(course);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedCourse(null);
		setMessage("");
	};

	const handleSubmit = async (formData: selectedCourseProps) => {
		const res = await fetch("/api/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		if (res.ok) {
			localStorage.setItem("interestedCourse", JSON.stringify(formData));
			setMessage("Contact information submitted successfully!");
			setSelectedCourse(null);
		} else {
			setMessage("Failed to submit contact information");
		}
	};

	return (
		<div className="p-6">
			<SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<CourseList
				searchTerm={searchTerm}
				handleSelectCourse={handleSelectCourse}
			/>
			{isModalOpen && selectedCourse && (
				<Modal onClose={handleCloseModal}>
					<ContactForm
						message={message}
						selectedCourse={selectedCourse}
						handleSubmit={handleSubmit}
					/>
				</Modal>
			)}
		</div>
	);
};

export default CourseFinder;
