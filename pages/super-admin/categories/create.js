import React from "react";
import { Loader } from "rsuite";
import Main from "../../../components/layout/main";

export default function CatCreate({ solve, Page }) {
	return (
		<Main
			solve={solve}
			header={{
				title: "ایجاد دسته بندی",
			}}
			content={{
				step0: {
					btn: {
						action: "back",
					},
					form: {
						config: {
							url: "categories",
							content_type: "multipart/form-data",
							route: true,
							push_notif: true,
						},
						structure: [
							[
								{
									input: {
										name: "title",
										type: "text",
										placeholder: "نام دسته بندی",
									},
								},
								{
									select: {
										name: "type",
										placeholder: "انتخاب نوع دسته بندی",
										data: [
											{ title: "دوره", value: "course" },
											{ title: "سرور", value: "server" },
										],
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
