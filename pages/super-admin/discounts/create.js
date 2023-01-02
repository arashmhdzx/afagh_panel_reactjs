import React from "react";
import { Loader } from "rsuite";
import Main from "../../../components/layout/main";

export default function DiscountCreate({ solve, Page }) {
	const [data, setData] = React.useState(null);
	React.useEffect(() => {
		data === null &&
			solve.Request({
				config: {
					url: "courses",
					pointer: "courses",
					method: "get",
				},
				dependencies: {
					callback: (e) => {
						let temp = e?.data?.data;
						solve.Request({
							config: {
								url: "all-users-without-paginate",
								pointer: "users",
								method: "get",
							},
							dependencies: {
								callback: (e) => {
									let temp2 = e?.data?.data;
									setData({ courses: temp, users: temp2 });
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
				title: "ایجاد تخفیف جدید",
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
										url: "discounts",
										content_type: "multipart/form-data",
										route: true,
										push_notif: true,
										initial: {
											code: "",
											active: 1,
										},
									},
									structure: [
										[
											{
												input: {
													name: "code",
													type: "text",
													placeholder: "کد تخفیف",
												},
											},
											{
												select: {
													name: "type",
													placeholder: "انتخاب نوع تخفیف",
													data: [
														{
															title: "عمومی (public)",
															value: "public",
														},
														{
															title: "خصوصی (private)",
															value: "private",
														},
													],
												},
											},
										],
										[
											{
												range: {
													label: "درصد تخفیف",
													name: "percent",
												},
											},
											{
												input: {
													placeholder: "۰",
													name: "use_limit",
													direction: "ltr",
													addon: {
														first: {
															prompt: "حد استفاده",
														},
														last: {
															prompt: "عدد",
														},
													},
												},
												flex: 0.5,
											},
										],
										[],
										[
											{
												select: {
													placeholder: "انتخاب دوره های مربوطه",
													name: "courses_id",
													multi: true,
													data: data?.courses ?? null,
													searchable: true,
												},
											},
											{
												select: {
													placeholder: "انتخاب کاربران مشمول تخفیف",
													multi: true,
													name: "users_id",
													data: data?.users ?? null,
													searchable: true,
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
