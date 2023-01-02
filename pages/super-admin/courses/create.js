import React from "react";
import { Loader } from "rsuite";
import Main from "../../../components/layout/main";

export default function CourseCreate({ solve, Page }) {
	const [state, setState] = React.useState("cash");
	return (
		<Main
			solve={solve}
			header={{
				title: "ایجاد دوره",
			}}
			content={{
				step0: {
					btn: {
						action: "back",
					},
					form: {
						config: {
							url: "courses",
							content_type: "multipart/form-data",
							route: true,
							push_notif: true,
							initial: {
								title: "",
								description: "",
								price: "",
								type: "cash",
								time: "00:00:00",
								body: "",
							},
						},
						structure: [
							[
								{
									input: {
										name: "title",
										type: "text",
										placeholder: "نام دوره",
									},
									flex: 0.5,
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
								},
							],
							[
								{
									select: {
										placeholder: "نوع",
										data: [
											{ title: "نقدی", value: "cash" },
											{ title: "رایگان", value: "free" },
										],
										args: {
											defaultValue: "cash",
										},
										name: "type",
										callback: (e) => {
											state !== e.val && setState(e.val);
										},
									},
								},
								{
									input: {
										type: "price",
										name: "price",
										direction: "ltr",
										placeholder: "۰",
										addon: {
											first: {
												prompt: "قیمت",
											},
											last: {
												prompt: "تومان",
											},
										},
										disabled: state !== "cash",
									},
								},
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
							[
								{
									upload: {
										prompt: "تصویر دوره را انتخاب کنید",
										name: "image",
									},
								},
							],
							[
								{
									input: {
										type: "textarea",
										placeholder: "توضیحات تکمیلی",
										name: "body",
									},
								},
							],
						],
					},
				},
			}}
		/>
	);
}
