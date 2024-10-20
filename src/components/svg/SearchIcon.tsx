import React from "react";

interface SearchIconProps {
	width?: number;
	height?: number;
	color?: string;
}

const SearchIcon: React.FC<SearchIconProps> = ({
	width = 20,
	height = 20,
	color = "currentColor",
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 20 20"
			strokeWidth="2"
			stroke={color}
			width={width}
			height={height}
			aria-hidden="true"
			className="w-4 h-4 text-gray-500 dark:text-gray-400"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
			/>
		</svg>
	);
};

export default SearchIcon;
