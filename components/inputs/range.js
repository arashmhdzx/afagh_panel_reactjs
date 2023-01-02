import React from "react";
import { Slider } from "rsuite";
import * as R from "../../styles/components/inputs/range.module.scss";
import Solve from "../solvers/solve";

export default function Range({ handler, ...config }) {
	const { name, label, defaultValue } = config ?? {};
	const [value, setValue] = React.useState(defaultValue ?? 0);
	const solve = Solve({});
	return (
		<div className={`${R.wrapper}`}>
			<div className={`${R.label}`}>
				<label>
					{solve.Convert.withBadge({
						val: <strong>{label ?? ""}</strong>,
						color: "blue",
						size: "md",
					})}
				</label>
			</div>
			<div className={`${R.slider_wrapper}`}>
				<Slider
					value={value}
					min={0}
					step={1}
					max={100}
					tooltip={false}
					progress
					onChange={(e) => {
						console.log(100 - e);
						100 - e !== value && setValue(100 - e);
						typeof handler === "function" &&
							handler({ key: name, val: 100 - e });
					}}
				/>
			</div>
			<div className={`${R.val}`}>
				{solve.Convert.withBadge({
					val: (
						<strong>{`${solve.Convert.toPe(value)}${
							name === "percent" || name === "share" ? "%" : ""
						}`}</strong>
					),
					color: "violet",
				})}
			</div>
		</div>
	);
}
