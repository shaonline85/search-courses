"use client";

import { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import CourseList from "./CourseList";
import ContactForm from "./ContactForm";
import Modal from "./Modal";

const CourseFinder = () => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [contact, setContact] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const fetchCourses = async () => {
		const res = await fetch(`/api/courses?search=${searchTerm}`);
		const data = await res.json();
		setCourses(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchCourses();
	}, [searchTerm]);

	const handleSelectCourse = (course: Course) => {
		setSelectedCourse(course);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedCourse(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedCourse) {
			alert("Please select a course");
			return;
		}

		const contactInfo = {
			name,
			email,
			selectedCourse,
		};

		const res = await fetch("/api/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(contactInfo),
		});

		console.log("res", res);

		if (res.ok) {
			setMessage("Contact information submitted successfully!");
			setName("");
			setEmail("");
			setContact("");
			setSelectedCourse(null);
			localStorage.setItem("interestedCourse", JSON.stringify(contactInfo));
		} else {
			setMessage("Failed to submit contact information");
		}
	};

	return (
		<div className="p-6">
			<SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			{courses && courses.length > 0 ? (
				<CourseList courses={courses} handleSelectCourse={handleSelectCourse} />
			) : loading ? (
				<p>loading courses...</p>
			) : (
				<p>no courses found</p>
			)}
			{isModalOpen && (
				<Modal onClose={handleCloseModal}>
					<ContactForm
						name={name}
						setName={setName}
						message={message}
						email={email}
						contact={contact}
						setEmail={setEmail}
						setContact={setContact}
						selectedCourse={selectedCourse}
						handleSubmit={handleSubmit}
					/>
				</Modal>
			)}
		</div>
	);
};

export default CourseFinder;
