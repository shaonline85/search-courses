import React from "react";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { contactFormSchema } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = contactFormSchema();

interface CustomInputProps {
	name: FieldPath<z.infer<typeof formSchema>>;
	label: string;
	placeholder: string;
	control: Control<z.infer<typeof formSchema>>;
}

function CustomInput({ name, label, placeholder, control }: CustomInputProps) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="w-full max-w-sm min-w-[200px]">
					<FormLabel className="block mb-1 text-sm text-slate-600 mt-4">
						{label}
					</FormLabel>
					<FormControl>
						<Input placeholder={placeholder} {...field} />
					</FormControl>
					<FormMessage className="form-message mt-2" />
				</FormItem>
			)}
		/>
	);
}

export default CustomInput;
