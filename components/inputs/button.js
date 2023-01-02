import { Icon } from "@iconify/react";
import React from "react";
import { Loader } from "rsuite";
import * as B from "../../styles/components/inputs/button.module.scss";

export default function Btn({
	type = "normal",
	status: st = "init",
	action,
	prompt,
	hover,
	appearance,
	color,
	clickHandler,
	modal,
	page,
}) {
	/* 
		Btn is the main wrapper for all the buttons used (type):
		- normal (default)
		- CTA
		- Icon
		- Secondary
		- Custom
		
		Icon Dependency: if you want to add dynamic icons to the comp
		you should specify dependency
	*/

	const { act, value } = action ?? {}; // Action determiner
	const { text, replace } = prompt ?? {}; // prompt has replace functionality, to change the prompt based on input/state
	const [status, setStatus] = React.useState(st);

	React.useEffect(() => {
		(status === "init" || status === "loading") &&
			st !== "init" &&
			setStatus(st);
	}, [st]);
	React.useEffect(() => {
		if (status === "failed" || status === "success") {
			console.log(page);

			setTimeout(() => {
				setStatus("init");

				if (page?.modal?.modal) {
					page.modal.setModal({ ...page.modal.modal, open: false });
				}
			}, 1000);
		}
	}, [status]);

	return (
		<div
			className={`${B.wrapper} ${
				status === "loading"
					? B.loading
					: status === "success"
					? B.success
					: status === "failed"
					? B.failed
					: ""
			} ${type === "CTA" ? B.cta : ""}`}
			style={{
				"--color": color,
				"--hover": hover /* color of bg when hovered */,
			}}
			onClick={() => {
				status !== "loading" &&
					(modal
						? page.modal.setModal(modal)
						: clickHandler({ status, setStatus }) ?? action);
			}}
		>
			<div className={`${B.content}`}>
				{status === "loading" && <Loader size='xs' />}
				{status === "init" && <span>{prompt ?? "ثبت"}</span>}
				{status === "failed" && (
					<Icon
						icon='clarity:error-solid'
						height={18}
						color={"rgba(255, 255, 255, 0.87)"}
					/>
				)}
				{status === "success" && (
					<Icon
						icon='ep:success-filled'
						height={18}
						color={"rgba(255, 255, 255, 0.87)"}
					/>
				)}
			</div>
		</div>
	);
}
