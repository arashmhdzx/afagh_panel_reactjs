import Link from "next/link";
import React, { useId } from "react";
import { Tooltip, Whisper } from "rsuite";
import * as D from "../../styles/components/display/dropdownLink.module.scss";
import Solve from "../solvers/solve";

export default function DropdownLink({ links, prompt, icon, page, href }) {
	const id = useId();
	const Temp = () => {
		return links?.map((v, i) => {
			const { prompt, href: pat } = v ?? {};

			return (
				<Link href={`/${href ?? ""}/${pat ?? ""}`} key={`link-${href}-${i}`}>
					<strong>{prompt ?? ""}</strong>
				</Link>
			);
		});
	};
	const Links = () => {
		return (
			<Tooltip arrow={false} className={D.drop_mother}>
				<Temp />
			</Tooltip>
		);
	};

	return (
		<div className={`${D.wrapper}`}>
			<Whisper
				trigger={"click"}
				placement='left'
				speaker={Links()}
				onEntering={() => {
					const temp = document.getElementById(id);
					return (temp.className = `${D.link} ${D.action_detector}`);
				}}
				onExiting={() => {
					const temp = document.getElementById(id);
					return (temp.className = `${D.link}`);
				}}
			>
				<div className={`${D.link}`} id={id ?? ""}>
					<div className={`${D.icon}`}>{icon ?? ""}</div>
					<div className={`${D.prompt}`}>
						<strong>{prompt ?? ""}</strong>
					</div>
				</div>
			</Whisper>
		</div>
	);
}
