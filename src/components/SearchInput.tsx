import React from "react";

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
					<svg
						className="w-4 h-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</div>
				<input
					type="search"
					id="default-search"
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
