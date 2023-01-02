import React from "react";
import { Loader } from "rsuite";
import Main from "../../../components/layout/main";

export default function OrgCreate({ solve, Page }) {
	const [data, setData] = React.useState(null);
	React.useEffect(() => {
		data === null &&
			solve.Request({
				config: {
					url: "all-users-without-paginate?role=organization-manager",
					pointer: "managers",
					method: "get",
				},
				dependencies: {
					callback: (e) => {
						let temp = e?.data?.data;
						solve.Request({
							config: {
								url: "categories?keywords=server",
								pointer: "cat_server",
								method: "get",
							},
							dependencies: {
								callback: (d) => {
									temp = { managers: temp, categories: d?.data?.data };
									setData(temp);
								},
							},
						});
					},
				},
			});
	}, []);

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
										url: "organizations",
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
												},
											},
											{
												select: {
													name: "server_category_id",
													placeholder: "دسته بندی سرور",
													data: data?.categories,
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
