import Link from "next/link";
import React from "react";
import { Steps } from "rsuite";
import * as S from "../../styles/components/display/steps.module.scss";

export default function AfaghSteps({ steps, content, page }) {
	const { p, u } = page ?? {};
	return (
		<div className={`${S.wrapper}`}>
			{Object.keys(steps).length > 1 && (
				<div className={`${S.steps}`} id={"steps"}>
					<div className={`${S.steps_container}`}>
						<Steps small className={`${S.steps_comp}`} id={"steps_container"}>
							{steps?.map((value, i) => {
								let entry = content?.[value];
								console.log(entry);
								const addition = { step: i + 1 };
								return (
									<>
										<Link
											href={{ query: { ...p.Router.query.get(), ...addition } }}
										>
											<Steps.Item
												title={`${entry?.label}`}
												key={`step-${i}-${value}`}
												stepNumber={u.toPe(i + 1)}
												status={`${
													p.Router.query.get("step") > i + 1
														? "wait"
														: p.Router.query.get("step") === i + 1 + "" ||
														  (p.Router.query.get("step") === undefined &&
																i === 0)
														? "process"
														: "wait"
												}`}
												className={`${S.step} ${
													(p.Router.query.get("step") === undefined &&
														i === 0) ||
													p.Router.query.get("step") === i + 1 + ""
														? S.current
														: ""
												} cursor-pointer transition-colors`}
											/>
										</Link>
										{i + 1 !== Object.keys(steps).length && (
											<div className={`${S.steps_spacer}`}></div>
										)}
									</>
								);
							})}
						</Steps>
					</div>
				</div>
			)}
		</div>
	);
}
