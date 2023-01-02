import { useRouter } from "next/router";
import React from "react";
import Main from "../../../components/layout/main";
// import * as component from 'style.module.scss'

export default function TransactionSuccess({ solve }) {
	const router = useRouter();
	const [state, setState] = React.useState(null);
	const { tid } = router.query ?? {};

	React.useEffect(() => {
		if (tid && state === null) {
			solve.Request({
				config: {
					url: `payment-inquiry/${tid}`,
					noRole: true,
					noAuth: false,
				},
				dependencies: {
					data: [state, setState],
				},
			});
		}
	}, [solve, state, tid]);
	console.log(state);
	return (
		<Main
			header={{
				title: "پرداخت موفق",
			}}
			content={{
				step0:
					tid && state
						? {
								btn: {
									type: "back",
									href: "",
								},
								view: {
									config: {},
									structure: {
										prompt: (
											<div
												style={{
													display: "grid",
													gridAutoFlow: "row",
													rowGap: "2.5rem",
													justifyContent: "center",
													alignItems: "center",
													textAlign: "center",
													backgroundColor: "rgba(0, 0, 0, .05)",
													border: "1px solid rgba(0, 0, 0, .075)",
													padding: "2rem 1rem",
													borderRadius: "1rem",
												}}
											>
												<div>
													{solve.Convert.withBadge({
														val: "پرداخت با موفقیت انجام شد",
														color: "green",
														size: "lg",
													})}
												</div>
												<p>
													هم اکنون میتوانید به محتوای دوره{" "}
													{solve.Convert.withBadge({
														val: solve.Convert.toPe(
															state?.order?.items[0]?.item?.title
														),
														color: "blue",
														size: "md",
													})}{" "}
													دسترسی داشته باشید
												</p>
												<div>
													{solve.Convert.withBadge({
														val: (
															<span>
																<small>
																	<strong>شناسه پرداخت:</strong>
																</small>{" "}
																<strong>{`${solve.Convert.toPe(
																	state?.payment_transaction_id
																)}`}</strong>
															</span>
														),
														color: "orange",
														size: "lg",
													})}
												</div>
											</div>
										),
									},
								},
						  }
						: { loader: {} },
			}}
			solve={solve}
		/>
	);
}
