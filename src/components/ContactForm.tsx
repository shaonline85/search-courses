import React from "react";

interface ContactFormProps {
	name: string;
	email: string;
	contact: string;
	selectedCourse: Course | null;
	message: string;
	setName: (name: string) => void;
	setEmail: (email: string) => void;
	setContact: (contact: string) => void;
	handleSubmit: (e: React.FormEvent) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
	name,
	email,
	contact,
	selectedCourse,
	message,
	setName,
	setEmail,
	setContact,
	handleSubmit,
}) => {
	return (
		<>
			{message ? (
				<p>{message}</p>
			) : (
				<form
					className="mt-8 flex flex-col justify-center items-center"
					onSubmit={handleSubmit}
				>
					<h2 className="text-xl font-bold mb-5">
						Interested in: {selectedCourse?.CourseName}
					</h2>
					<div className="w-full max-w-sm min-w-[200px]">
						<label className="block mb-2 text-sm text-slate-600">Email</label>
						<input
							type="email"
							className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
							placeholder="Your Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="w-full max-w-sm min-w-[200px]">
						<label className="block mb-1 text-sm text-slate-600 mt-4">
							Name
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
							placeholder="Your Name"
							required
						/>
					</div>
					<div className="w-full max-w-sm min-w-[200px]">
						<label className="block mb-1 text-sm text-slate-600 mt-4">
							Contact
						</label>
						<input
							type="text"
							className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
							placeholder="xxx-xxx-xxxx"
							onChange={(e) => setContact(e.target.value)}
							value={contact}
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
