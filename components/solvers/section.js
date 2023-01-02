import React from "react";
import { Loader } from "rsuite";
import * as S from "../../styles/components/solvers/sections.module.scss";
import { Icon } from "@iconify/react";
import Form from "./form";
import { useRouter } from "next/router";

export default function Sections({ data, Solver, View }) {
	const F = (e) => {
		const [toggles, setToggles] = React.useState();
		const [state, setState] = React.useState({ ep: null, s: 0 });

		return (
			<View
				structure={{
					tabs: {
						data: [
							{
								label: "ایجاد قسمت",
								disabled: state.s,
								disabled_message: "شما قبلا قسمت را ساخته اید",
								content: {
									form: {
										config: {
											url: "episodes",
											initial: {
												title: "",
												description: "",
												body: "",
												section_id: e?.e?.id + "",
												type: "open",
												published: 1,
											},
											callback: (e) => {
												const { episode } = e ?? {};

												setTimeout(() => {
													state.s === 0 && setState({ ep: episode, s: 1 });
													router.push({ query: { ...router.query, tab: 1 } });
												}, 1000);
											},
										},
										structure: [
											[
												{
													input: {
														name: "title",
														placeholder: "نام قسمت",
													},
												},
												{
													input: {
														name: "description",
														placeholder: "توضیح مختصر",
														addon: {
															last: {
																prompt: "SP-counter-150",
															},
														},
													},
													flex: 2,
												},
											],
											[
												{
													input: {
														name: "body",
														placeholder: "توضیحات تکمیلی",
														type: "textarea",
													},
												},
											],
										],
									},
								},
							},
							{
								label: "محتوا و مدیا",
								content: {
									form: {
										config: {
											noBtn: true,
										},
										structure: [
											[
												{
													toggle: {
														prompt: "افزودن ویدیو",
														state: toggles?.video,
														setState: (e) =>
															setToggles({ ...toggles, video: e }),
														on: {
															form: {
																config: {
																	noBtn: true,
																},
																structure: [
																	[
																		{
																			toggle: {
																				prompt: "آپلود ویدیو",
																				state: toggles?.video_upl,
																				setState: (e) =>
																					setToggles({
																						...toggles,
																						video_upl: e,
																					}),
																				on: {
																					form: {
																						config: {
																							url: "upload-encrypted-video-file",
																							initial: {
																								videoFile: {},
																							},
																							content_type:
																								"multipart/form-data",
																							callback: (e) => {
																								const { data } = e ?? {};
																								const {
																									video_id,
																									videoUrl,
																									lockFileUrl,
																									videoTime,
																								} = data ?? {};
																								Solver.Request({
																									config: {
																										url: "videos",
																										method: "post",
																										req_data: {
																											videoUrl,
																											lockFileUrl,
																											time: videoTime,
																											driver: "sftp",
																											type: "open",
																											episode_id: state?.ep?.id,
																										},
																										push_notif: false,
																									},
																									dependencies: {},
																								});
																							},
																						},
																						structure: [
																							[
																								{
																									upload: {
																										name: "videoFile",
																										prompt:
																											"ویدیو را انتخاب کنید",
																									},
																								},
																							],
																						],
																					},
																				},
																				off: {
																					form: {
																						config: {
																							url: "videos",
																							initial: {
																								videoUrl: "",
																								time: "00:00:00",
																								episode_id: state?.ep?.id,
																								driver: "sftp",
																								type: "open",
																							},
																						},
																						structure: [
																							[
																								{
																									input: {
																										placeholder: "لینک ویدیو",
																										name: "videoUrl",
																									},
																								},
																							],
																							[
																								{
																									input: {
																										// type: 'time',

																										name: "time",
																										addon: {
																											first: {
																												prompt: "مدت زمان",
																											},
																											last: {
																												prompt: "ث:د:س",
																											},
																										},
																										masked: true,
																										showMask: true,
																										guide: true,
																										placeholderChar: "۰",
																										mask: [
																											/[\u06F0-\u06F90-9]/,
																											/[\u06F0-\u06F90-9]/,
																											":",
																											/[\u06F0-\u06F90-9]/,
																											/[\u06F0-\u06F90-9]/,
																											":",
																											/[\u06F0-\u06F90-9]/,
																											/[\u06F0-\u06F90-9]/,
																										],
																										keepCharPositions: true,
																										direction: "ltr",
																									},
																								},
																							],
																						],
																					},
																				},
																			},
																		},
																	],
																],
															},
														},
													},
												},
											],
											[
												{
													toggle: {
														prompt: "افزودن PDF",
														state: toggles?.pdf,
														setState: (e) => setToggles({ ...toggles, pdf: e }),
														on: {
															form: {
																config: {
																	noBtn: true,
																},
																structure: [
																	[
																		{
																			toggle: {
																				prompt: "آپلود فایل PDF",
																				state: toggles?.pdf_upl,
																				setState: (e) =>
																					setToggles({
																						...toggles,
																						pdf_upl: e,
																					}),
																				on: {
																					form: {
																						config: {
																							url: "upload-file",
																							initial: {
																								file: {},
																								extension: "pdf",
																								episode_id: state?.ep?.id,
																								driver: "sftp",
																								type: "open",
																							},
																							content_type:
																								"multipart/form-data",
																							callback: (e) => {
																								const { data } = e ?? {};
																								const {
																									fileUrl,
																									fileExtension,
																								} = data ?? {};
																								Solver.Request({
																									config: {
																										url: "files",
																										method: "post",
																										req_data: {
																											fileUrl,
																											extension: fileExtension,
																											driver: "sftp",
																											type: "open",
																											episode_id: state?.ep?.id,
																										},
																										push_notif: false,
																									},
																									dependencies: {},
																								});
																							},
																						},
																						structure: [
																							[
																								{
																									upload: {
																										name: "file",
																										prompt:
																											"فایل را انتخاب کنید",
																									},
																								},
																							],
																						],
																					},
																				},
																				off: {
																					form: {
																						config: {
																							url: "files",
																							initial: {
																								fileUrl: "",
																								extension: "pdf",
																								episode_id: state?.ep?.id,
																								driver: "sftp",
																								type: "open",
																							},
																						},
																						structure: [
																							[
																								{
																									input: {
																										placeholder: "لینک PDF",
																										name: "fileUrl",
																									},
																								},
																							],
																						],
																					},
																				},
																			},
																		},
																	],
																],
															},
														},
													},
												},
											],
											[
												{
													toggle: {
														prompt: "افزودن فایل صوتی",
														state: toggles?.voice,
														setState: (e) =>
															setToggles({ ...toggles, voice: e }),
														on: {
															form: {
																config: {
																	noBtn: true,
																},
																structure: [
																	[
																		{
																			toggle: {
																				prompt: "آپلود فایل صوتی",
																				state: toggles?.voice_upl,
																				setState: (e) =>
																					setToggles({
																						...toggles,
																						voice_upl: e,
																					}),
																				on: {
																					form: {
																						config: {
																							url: "upload-file",
																							initial: {
																								file: {},
																								extension: "mp3",
																								episode_id: state?.ep?.id,
																								driver: "sftp",
																								type: "open",
																							},
																							content_type:
																								"multipart/form-data",
																							callback: (e) => {
																								const { data } = e ?? {};
																								const {
																									fileUrl,
																									fileExtension,
																								} = data ?? {};
																								Solver.Request({
																									config: {
																										url: "files",
																										method: "post",
																										req_data: {
																											fileUrl,
																											extension: fileExtension,
																											driver: "sftp",
																											type: "open",
																											episode_id: state?.ep?.id,
																										},
																										push_notif: false,
																									},
																									dependencies: {},
																								});
																							},
																						},
																						structure: [
																							[
																								{
																									upload: {
																										name: "file",
																										prompt:
																											"فایل را انتخاب کنید",
																									},
																								},
																							],
																						],
																					},
																				},
																				off: {
																					form: {
																						config: {
																							url: "files",
																							initial: {
																								fileUrl: "",
																								extension: "mp3",
																								episode_id: state?.ep?.id,
																								driver: "sftp",
																								type: "open",
																							},
																						},
																						structure: [
																							[
																								{
																									input: {
																										placeholder:
																											"لینک فایل صوتی",
																										name: "fileUrl",
																									},
																								},
																							],
																						],
																					},
																				},
																			},
																		},
																	],
																],
															},
														},
													},
												},
											],
										],
									},
								},
								disabled: !state.s,
								disabled_message:
									"برای دسترسی به این بخش اول قسمت را ایجاد کنید",
							},
						],
						form: true,
					},
				}}
			/>
		);
	};
	const router = useRouter();
	const { cu: initial } = data ?? {};
	const a = initial?.sections;
	var t = a;
	const [temp, setTemp] = React.useState({ a, reverse: false });
	const [tg, setTg] = React.useState();

	React.useEffect(() => {
		!temp.reverse && setTemp({ a: t.reverse(), reverse: true });
	});

	return initial ? (
		initial?.sections && (
			<div className={``}>
				<div
					className={`${S.add}`}
					onClick={() =>
						Solver.Page.modal({
							header: "افزودن سرفصل جدید",
							body: (
								<Form
									config={{
										url: "sections",

										initial: {
											course_id: initial?.id + "",
											title: "",
											number: 1,
										},
										callback: (e) => router.reload(),
									}}
									structure={[
										[
											{
												input: {
													name: "title",
													placeholder: "نام سرفصل",
												},
											},
										],
									]}
								/>
							),
						})
					}
				>
					<Icon icon='ic:round-plus' height='48' />
					<strong>
						<small>ایجاد سرفصل جدید</small>
					</strong>
				</div>
				<View
					structure={{
						accord: {
							entries: temp?.a,
							inside: {
								data_info: {
									url: "sections",
								},
								view: {
									config: {},
									structure: {
										table: {
											fillHeight: true,

											columns: [
												{ title: "#", type: "id", key: "id" },
												{ title: "عنوان قسمت", type: "title", key: "title" },
												{
													title: "ویدیو",
													type: "dependencies",
													key: "video_url",
												},
												{ title: "صوت", type: "dependencies", key: "mp3_url" },
												{ title: "PDF", type: "dependencies", key: "pdf_url" },
												{ title: "عملیات ها", type: "actions" },
											],
										},
									},
								},
							},
							ctas: [
								{
									prompt: "افزودن قسمت",
									color: "blue",
									onClick: (e) => {
										Solver.Page.modal({
											header: `افزودن قسمت به '${e.title}'`,
											body: <F e={e} />,
										});
									},
								},
								{
									prompt: "حذف سرفصل",
									color: "red",
								},
							],
						},
					}}
					Solver={Solver}
				/>
			</div>
		)
	) : (
		<Loader center />
	);
}
