"use client"

import {Spinner} from "@nextui-org/react";
import {cn} from "@/libs/utils";

export const SimpleLoading = ({height = "auto"}: { height?: "auto" | "md" | "lg" }) => {
	return (
		<section className={cn("w-full flex-center gap-4 py-5 select-none margin-header", {
			"h-[150px]": height === "md",
			"h-[300px]": height === "lg"
		})}>
			<Spinner size="lg" classNames={{
				wrapper: "w-[50px] h-[50px]",
			}}/>
			<p className="font-medium text-gray animate-pulse text-2xl">Cargando...</p>
		</section>
	);
};
