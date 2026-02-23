import { PropsWithChildren } from "react";

const Pagelayout = (props: PropsWithChildren) => {
	return (
		<div className="flex flex-col gap-4 mx-auto max-w-[1920px] min-h-full">
			{props.children}
		</div>
	);
};

export default Pagelayout;
