import React from "react";
import { Loader } from "rsuite";
import Main from "../../../components/layout/main";

export default function UserCreate({ solve, Page }) {
	const [data, setData] = React.useState(null);
	React.useEffect(() => {
		data === null &&
			solve.Request({
				config: {
					url: "all-orgs-without-paginate",
					pointer: "orgs",
					method: "get",
				},
				dependencies: {
					callback: (e) => {
						let temp = e?.data?.data;
						setData(temp);
					},
				},
			});
	}, []);

	return (
		<Main
			solve={solve}
			header={{
				title: "ایجاد کاربر",
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
										url: "user/add",
										content_type: "multipart/form-data",
										route: true,
										push_notif: true,
									},
									structure: [
										[
											{
												input: {
													name: "name",
													type: "text",
													placeholder: "نام کاربری",
												},
											},
											{
												input: {
													name: "phone",
													type: "phone",
													placeholder: "شماره تلفن",
												},
											},
											{
												input: {
													name: "email",
													type: "email",
													placeholder: "آدرس ایمیل",
												},
											},
										],
										[
											{
												input: {
													name: "password",
													type: "password",
													placeholder: "رمز عبور",
													addon: {
														last: {
															prompt: "visibility",
														},
													},
												},
											},
										],
										[
											{
												input: {
													name: "national_code",
													type: "text",
													placeholder: "کد ملی",
												},
											},
											{},
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
