import React, { useState } from "react";

interface ContactFormProps {
	selectedCourse: Course | null;
	message: string;
	handleSubmit: (contactInfo: ContactProps) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
	selectedCourse,
	message,
	handleSubmit,
}) => {
	const [formData, setFormData] = useState<ContactProps>({
		name: "",
		email: "",
		contact: "",
	});

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		handleSubmit(formData);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			{message ? (
				<p>{message}</p>
			) : (
				<form
					className="mt-8 flex flex-col justify-center items-center"
					onSubmit={onSubmit}
				>
					<h2 className="text-xl font-bold mb-5">
						Interested in: {selectedCourse?.CourseName}
					</h2>
					<div className="w-full max-w-sm min-w-[200px]">
						<label className="block mb-2 text-sm text-slate-600">Email</label>
						<input
							type="email"
							name="email"
							className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
							placeholder="Your Email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="w-full max-w-sm min-w-[200px]">
						<label className="block mb-1 text-sm text-slate-600 mt-4">
							Name
						</label>
						<input
							type="text"
							name="name"
							className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
							placeholder="Your Name"
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="w-full max-w-sm min-w-[200px]">
						<label className="block mb-1 text-sm text-slate-600 mt-4">
							Contact
						</label>
						<input
							type="number"
							name="contact"
							className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
							placeholder="xxx-xxx-xxxx"
							value={formData.contact}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="w-full max-w-sm min-w-[200px]">
						<button className="w-full mt-6 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
							Submit
						</button>
					</div>
				</form>
			)}
		</>
	);
};

export default ContactForm;
