import React from "react";
import SearchIcon from "./svg/SearchIcon";

interface SearchInputProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
	searchTerm,
	setSearchTerm,
}) => {
	return (
		<>
			<h1 className="text-2xl font-bold mb-4">Search for Courses</h1>
			<div className="relative">
				<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
					<SearchIcon />
				</div>
				<input
					type="search"
					aria-label="Search for courses"
					className="block w-full p-4 mb-5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg
				  bg-gray-50  bg-transparent placeholder:text-slate-400 transition duration-300 ease focus:outline-none focus:border-slate-600 hover:border-slate-300 shadow-sm focus:shadow"
					placeholder="Search courses by name, institute, or category"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
		</>
	);
};

export default SearchInput;
