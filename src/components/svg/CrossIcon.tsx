import React from "react";
interface CrossIconProps {
	width?: number;
	height?: number;
	color?: string;
}

const CrossIcon: React.FC<CrossIconProps> = ({
	width = 20,
	height = 20,
	color = "currentColor",
}) => {
	return (
		<svg
			className="w-3 h-3"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 14 14"
			stroke={color}
			height={height}
			width={width}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
			/>
		</svg>
	);
};

export default CrossIcon;
