import { Icon } from "@iconify/react";
import React from "react";
import { Button } from "rsuite";
import * as A from "../../styles/components/display/accord.module.scss";
import View from "../layout/view";

export default function AAccord({ entries, inside, ctas, Solver, current }) {
	const Container = () => {
		const [state, setState] = React.useState(null);
		return entries.map((value, index) => {
			return (
				<Single
					v={value}
					i={index}
					key={`single-${index}`}
					setState={setState}
					state={state}
				/>
			);
		});
	};
	const Single = ({ v, i, state, setState }) => {
		const { title, id } = v ?? {};

		return (
			<div
				className={`${A.single_item} ${state === i ? A.open : A.closed} ${
					id === +current ? A.marked : ""
				}`}
			>
				<div
					className={`${A.button_container}`}
					onClick={() => setState(state !== i ? i : null)}
				>
					<div className={`${A.title}`}>
						<h3>{title}</h3>
					</div>
					<div className={`${A.additional}`}></div>
					<div className={`${A.caret}`}>
						<Icon icon='ic:round-arrow-drop-down' height='32' />
					</div>
				</div>
				<div className={`${A.content_container}`}>
					<div>
						{inside && (
							<View
								{...inside?.view}
								data_info={
									state === i
										? { data: entries ?? null, index: i, id, target: "episode" }
										: null
								}
								active_id={id}
								Solver={Solver}
							/>
						)}
					</div>
					<div className={`${A.footer}`}>
						{ctas &&
							ctas.map((v, i) => {
								const { onClick, prompt } = v ?? {};
								return (
									<div key={`cta-${i}`}>
										<Button
											appearance='primary'
											{...v}
											onClick={() => {
												typeof onClick === "function" && onClick({ title, id });
											}}
										>
											{prompt}
										</Button>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	};
	return entries.length > 0 ? <Container /> : "چیزی برای نمایش وجود ندارد";
}
