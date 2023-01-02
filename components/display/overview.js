import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React from "react";
import { Button, Divider } from "rsuite";
import * as O from "../../styles/components/display/overview.module.scss";
import View from "../layout/view";

export default function Overview({ ...args }) {
	const { data: d, Solver: solve } = args ?? {};
	const router = useRouter();
	const [state, setState] = React.useState({});
	const { is_member, data } = d ?? {};
	const { id, title, description, image, body, price, type, sections, time } =
		data ?? {};
	return (
		<div className={`${O.wrapper}`}>
			<div className={`${O.upper}`}>
				<div className={`${O.text_content}`}>
					<div className={`${O.desc}`}>
						<div className={`${O.title}`}>
							<Icon icon='ic:round-history-edu' height='18' />
							<h4>
								<small>عنوان: </small>
								{solve.Convert.toPe(title ?? "")}
							</h4>
						</div>
						<div className={`${O.description}`}>
							<Icon icon='ic:round-description' height='18' />
							<h4>
								<small>توضیحات: </small>
								<span>{solve.Convert.toPe(description ?? "")}</span>
							</h4>
						</div>
						<div className={`${O.time}`}>
							<Icon icon='ic:round-timer' height='18' />
							<h4>
								<small>مدت زمان: </small>
								<span>
									{solve.Convert.withBadge({
										val: solve.Convert.toPe(time ?? ""),
										color: "grey",
									})}
								</span>
							</h4>
						</div>
						<div className={`${O.action_container}`}>
							<div className={`${O.price}`}>
								{solve.Convert.withBadge(
									is_member
										? { val: "عضو هستید!", color: "green" }
										: {
												val: (
													<span>
														<strong>{`${solve.Convert.toPe(
															solve.Convert.toPrice(price)
														)}`}</strong>
														<small> تومان</small>
													</span>
												),
												color: "violet",
												size: "lg",
										  }
								)}
							</div>
							<div className={`${O.cta}`}>
								<Button
									size='lg'
									appearance='primary'
									color={is_member ? "green" : "blue"}
									onClick={() => {
										if (!is_member) {
											solve.Page.modal({
												header: `تایید خرید \'${title}\'`,
												body: "آیا نسبت به خرید این دوره مطمئن هستید؟",
												footer: [
													{
														prompt: "تایید",
														color: "blue",
														status: state?.before ?? "init",
														handleClick: (e) => {
															solve.Page.modal({
																header: "تکمیل خرید",
																body: {
																	form: {
																		config: {
																			url: "subscribe-to-course",
																			initial: {
																				course_id: id,
																				code: "",
																			},
																			before: (e) => {
																				setState({
																					...state,
																					before: "loading",
																				});
																				return (
																					e?.code !== "" &&
																					solve.Request({
																						config: {
																							url: "execute-discount",
																							req_data: {
																								course_id: id,
																								code: e?.code,
																							},
																							method: "post",
																							push_notif: true,
																						},
																						dependencies: {
																							callback: (e) =>
																								setState({
																									...state,
																									before: "success",
																								}),
																						},
																					})
																				);
																			},
																			callback: (e) => {
																				const { data: d } = e ?? {};
																				const { data, message, status } =
																					d ?? {};
																				const { order_id, order_price } =
																					data ?? {};
																				status === "success" &&
																					solve.Page.modal({
																						header: `سفارش شما به شماره ${solve.Convert.toPe(
																							data?.order_id
																						)} ایجاد شد`,
																						body: (
																							<p>
																								{solve.Convert.toPe(message)}
																							</p>
																						),
																						footer: [
																							{
																								prompt: "پرداخت",
																								color: "blue",
																								status: state?.order,
																								handleClick: (e) => {
																									setState({
																										...state,
																										order: "loading",
																									});
																									solve.Request({
																										config: {
																											url: "payment",
																											noRole: true,
																											noAuth: false,
																											req_data: { order_id },
																											method: "post",
																										},
																										dependencies: {
																											callback: (e) => {
																												setState({
																													...state,
																													before: "success",
																												});
																												const { data: d } =
																													e ?? {};
																												const { data, status } =
																													d ?? {};
																												const { payment_link } =
																													data ?? {};
																												if (
																													status === "ok" &&
																													payment_link
																												) {
																													window &&
																														(window.location =
																															payment_link);
																												}
																											},
																										},
																									});
																								},
																							},
																							{
																								prompt: "بعدا",
																								color: "red",
																								handleClick: (e) => {
																									solve.Page.modal("close");
																								},
																							},
																						],
																					});
																			},
																		},
																		structure: [
																			[
																				{
																					input: {
																						name: "code",
																						placeholder: "را وارد کنید...",
																						addon: {
																							first: {
																								prompt: "کد تخفیف",
																							},
																						},
																					},
																				},
																			],
																		],
																	},
																},
															});
														},
													},
												],
											});
										}
									}}
									href={is_member ? `../study?id=${router.query?.id}` : ""}
									className={`${O.btn}`}
								>
									{is_member
										? "ورود به کلاس"
										: type === "free"
										? "ثبت نام"
										: "خرید دوره"}
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className={`${O.image}`}>
					<img
						src={
							image !== null
								? image?.thumb
								: "data:image/jpeg;base64,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"
						}
					/>
				</div>
			</div>
			<Divider />
			<div className={`${O.content}`}>
				<View
					config={{}}
					structure={{
						tabs: {
							data: [
								{
									label: "توضیحات تکمیلی",
									content: {
										view: {
											structure: {
												prompt: body ?? "hg",
											},
										},
									},
								},
								{
									label: "سرفصل ها",
									content: {
										view: {
											structure: {
												accord: {
													entries: sections ?? [],
													inside: {
														view: {
															structure: {
																table: {
																	autoHeight: true,
																	data: sections,
																	columns: [
																		{ title: "#", type: "id", key: "id" },
																		{
																			title: "عنوان قسمت",
																			type: "title",
																			key: "title",
																		},
																		{
																			title: "ویدیو",
																			type: "dependencies_watch",
																			key: "video_url",
																		},
																		{
																			title: "صوت",
																			type: "dependencies_watch",
																			key: "mp3_url",
																		},
																		{
																			title: "PDF",
																			type: "dependencies_watch",
																			key: "pdf_url",
																		},
																		{ title: "عملیات ها", type: "actions" },
																	],
																},
															},
														},
													},
												},
											},
										},
									},
								},
							],
						},
					}}
					Solver={solve}
				/>
			</div>
		</div>
	);
}
