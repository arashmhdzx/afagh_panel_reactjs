import React from "react";
import { Loader } from "rsuite";
import Main from "../../../components/layout/main";

export default function OrgEdit({ solve, Page }) {
	const [data, setData] = React.useState(null);
	const [state, setState] = React.useState({});
	React.useEffect(() => {
		let temp;
		data === null &&
			solve.Router.query.get("id") &&
			solve.Request({
				config: {
					url: "all-users-without-paginate?role=organization-manager",
					pointer: "managers",
					method: "get",
				},
				dependencies: {
					callback: (e) => {
						temp = e?.data?.data;
						console.log(temp);
						solve.Request({
							config: {
								url: "categories?keywords=server",
								pointer: "cat_server",
								method: "get",
							},
							dependencies: {
								callback: (d) => {
									const id = solve.Router.query.get("id");
									temp = { managers: temp, categories: d?.data?.data };
									console.log(id);
									solve.Request({
										config: {
											url: `organizations/${id}`,
											pointer: "org",
											method: "get",
										},
										dependencies: {
											callback: (e) => {
												const { manager } = e?.data?.organization ?? {};

												// setSelection({
												// 	manager: manager?.id
												// })
												console.log(e);
												temp = { ...temp, org: e?.data?.organization };
												data ?? setData(temp);
											},
										},
									});
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
												key: "server_category_id",
												val: data?.org?.server_category?.id,
											},
											{ key: "manager_id", val: data?.org?.manager?.id },
										],
										url: `organizations/${solve.Router.query.get(
											"id"
										)}?_method=PUT`,
										content_type: "multipart/form-data",
										route: true,
										push_notif: true,
										initial: {
											title: data?.org?.title,
											brand: data?.org?.brand,
											manager_id: data?.org?.manager?.id,
											server_category_id: data?.org?.server_category?.id,
										},
									},
									structure: [
										[
											{
												input: {
													name: "title",
													type: "text",
													placeholder: "نام موسسه",
												},
											},
											{
												input: {
													name: "brand",
													placeholder: "برند",
												},
											},
										],
										[
											{
												upload: {
													prompt: "لوگوی سازمان را انتخاب کنید",
													name: "logo_img",
												},
											},
										],
										[
											{
												select: {
													name: "manager_id",
													placeholder: "انتخاب مدیر سازمان",
													data: data?.managers,
													args: {
														defaultValue: data?.org?.manager?.id,
													},
												},
											},
											{
												select: {
													name: "server_category_id",
													placeholder: "دسته بندی سرور",
													data: data?.categories,
													args: {
														defaultValue: data?.org?.server_category?.id,
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
