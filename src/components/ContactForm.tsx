import React, { useState } from "react";
import { Form } from "./ui/form";
import { contactFormSchema } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";

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
	const [submitting, setSubmitting] = useState(false);
	const formSchema = contactFormSchema();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			contact: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setSubmitting(true);
		await handleSubmit(data);
		setSubmitting(false);
	};

	return (
		<Form {...form}>
			{message ? (
				<p>{message}</p>
			) : (
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<>
						<h2 className="text-xl font-bold mb-5">
							Interested in: {selectedCourse?.CourseName}
						</h2>
						<CustomInput
							control={form.control}
							name="name"
							label="Name"
							placeholder="Enter your name"
						/>
						<CustomInput
							control={form.control}
							name="email"
							label="Email"
							placeholder="Enter your email"
						/>
						<CustomInput
							control={form.control}
							name="contact"
							label="Contact"
							placeholder="Enter your contact"
						/>
						<Button type="submit" className="w-full" disabled={submitting}>
							{submitting ? "Submitting..." : "Submit"}
						</Button>
					</>
				</form>
			)}
		</Form>
	);
};

export default ContactForm;
