import React from "react";
import { Loader } from "rsuite";
import Main from "../../../components/layout/main";

export default function ClsEdit({ solve, Page }) {
	const [data, setData] = React.useState(null);
	const [state, setState] = React.useState({});
	React.useEffect(() => {
		let temp;
		data === null &&
			solve.Router.query.get("id") &&
			solve.Request({
				config: {
					url: "all-orgs-without-paginate",
					pointer: "orgs",
					method: "get",
				},
				dependencies: {
					callback: (e) => {
						temp = e?.data?.data;

						const id = solve.Router.query.get("id");
						temp = { orgs: temp };
						solve.Request({
							config: {
								url: `classrooms/${id}`,
								pointer: "cls",
								method: "get",
							},
							dependencies: {
								callback: (e) => {
									const { organization } = e?.data?.data ?? {};

									// setSelection({
									// 	manager: manager?.id
									// })
									// console.log(e)
									temp = { ...temp, cls: e?.data?.data };
									data ?? setData(temp);
								},
							},
						});
					},
				},
			});
	}, [solve.Router.query.get("id")]);

	console.log(data?.org?.manager?.id);
	return (
		<Main
			solve={solve}
			header={{
				title: "ایجاد موسسه",
			}}
			content={
				data
					? {
							step0: {
								btn: {
									action: "back",
								},
								form: {
									config: {
										editorDefaultVals: [
											{
												key: "organization_id",
												val: data?.cls?.organization?.id,
											},
										],
										url: `classrooms/${solve.Router.query.get(
											"id"
										)}?_method=PUT`,
										content_type: "multipart/form-data",
										route: true,
										push_notif: true,
										initial: {
											title: data?.cls?.title,
											organization_id: data?.cls?.organization?.id,
										},
									},
									structure: [
										[
											{
												input: {
													name: "title",
													type: "text",
													placeholder: "نام کلاس",
												},
											},
											{
												select: {
													name: "organization_id",
													placeholder: "انتخاب موسسه",
													data: data?.orgs,
													args: {
														defaultValue: data?.cls?.organization?.id,
													},
												},
											},
										],
									],
								},
							},
					  }
					: { loading: true }
			}
		/>
	);
}
