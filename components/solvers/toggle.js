import React from "react";
import { Toggle } from "rsuite";
import * as T from "../../styles/components/solvers/toggle.module.scss";
import View from "../layout/view";
import Form from "./form";

export default function AToggle({
	state,
	setState,
	prompt,
	on,
	off,
	solve,
	handler,
}) {
	const [s, setS] = React.useState(state);
	const temp =
		typeof state === "undefined"
			? { checked: s, onClick: () => setS(!s) }
			: { checked: state, onClick: () => setState(!state) };

	return (
		<div className={`${T.wrapper}`}>
			<div className={`${T.trigger}`}>
				<div className={`${T.toggle}`}>
					<Toggle {...temp} />
				</div>
				<div className={`${T.prompt}`}>
					{prompt &&
						solve.Convert.withBadge({
							val: <strong>{prompt}</strong>,
							color: state ? "blue" : "grey",
						})}
				</div>
			</div>
			<div
				className={`${T.content} ${
					(state ? !state : !s) && !off && T.no_content
				}`}
			>
				{(state ?? s) && on?.form ? (
					<Form {...on?.form} Solver={solve} />
				) : (
					on?.view && <View {...on?.view} Solver={solve} />
				)}
				{(state ? !state : !s) && off?.form ? (
					<Form {...off?.form} Solver={solve} />
				) : (
					off?.view && <View {...off?.view} Solver={solve} />
				)}
			</div>
		</div>
	);
}
