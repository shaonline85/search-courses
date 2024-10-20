"use client";

import { useState } from "react";
import SearchInput from "./SearchInput";
import CourseList from "./CourseList";
import ContactForm from "./ContactForm";
import Modal from "./Modal";

const CourseFinder = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [modalState, setModalState] = useState({
		isOpen: false,
		selectedCourse: null as Course | null,
		message: "",
	});

	const openModalWithSelectedCourse = (course: Course) => {
		setModalState({
			isOpen: true,
			selectedCourse: course,
			message: "",
		});
	};

	const closeModal = () => {
		setModalState({
			isOpen: false,
			selectedCourse: null,
			message: "",
		});
	};

	const handleSubmit = async (formData: selectedCourseProps) => {
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				setModalState((prev) => ({
					...prev,
					message: "Failed to submit contact information",
				}));
				return;
			}

			localStorage.setItem("interestedCourse", JSON.stringify(formData));
			setModalState((prev) => ({
				...prev,
				message: "Contact information submitted successfully!",
				selectedCourse: null,
			}));
		} catch (error) {
			setModalState((prev) => ({
				...prev,
				message: `Could not submit contact information. Error: ${
					(error as Error).message
				}`,
			}));
		}
	};

	return (
		<div className="p-6">
			<SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<CourseList
				searchTerm={searchTerm}
				handleSelectCourse={openModalWithSelectedCourse}
			/>
			{modalState.isOpen && (
				<Modal onClose={closeModal}>
					<ContactForm
						responseMessage={modalState.message}
						selectedCourse={modalState.selectedCourse}
						handleSubmit={handleSubmit}
					/>
				</Modal>
			)}
		</div>
	);
};

export default CourseFinder;
