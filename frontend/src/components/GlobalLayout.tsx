import { PropsWithChildren } from "react";

const Pagelayout = (props: PropsWithChildren) => {
	return (
		<div className="flex flex-col gap-4 mx-auto  border-x max-w-7xl min-h-full">
			{props.children}
		</div>
	);
};

export default Pagelayout;
