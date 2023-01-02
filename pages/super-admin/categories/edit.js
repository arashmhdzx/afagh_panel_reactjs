import { useRouter } from "next/router";
import React from "react";
import { Loader } from "rsuite";
import Main from "../../../components/layout/main";

export default function CatEdit({ solve, Page }) {
	const [data, setData] = React.useState(null);
	const [op, setOp] = React.useState({});
	const [toggle, setToggle] = React.useState(false);
	const router = useRouter();
	const [state, setState] = React.useState(data?.type);
	React.useEffect(() => {
		if (solve.Router.query.get("id") && !data) {
			const id = solve.Router.query.get("id");

			solve.Request({
				config: {
					url: `categories/${id}`,
					pointer: "cat",
					method: "get",
				},
				dependencies: {
					callback: (e) => {
						let temp = e?.data?.data;
						data ?? setData(temp);
					},
				},
			});
		}
	});

	return (
		<Main
			solve={solve}
			header={{
				title: "ویرایش دسته بندی",
			}}
			content={{
				step0: data
					? {
							btn: {
								action: "back",
							},
							form: {
								config: {
									url: `categories/${router.query?.id}?_method=PUT`,
									content_type: "multipart/form-data",
									route: true,
									push_notif: true,
									initial: {
										title: data?.title,
										type: state ?? data?.type,
									},
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
												args: {
													defaultValue: data?.type,
												},
												value: state ?? data?.type,
												callback: (e) => {
													state !== e.val && setState(e.val);
												},
											},
										},
									],
								],
							},
					  }
					: { loader: true },
			}}
		/>
	);
}
