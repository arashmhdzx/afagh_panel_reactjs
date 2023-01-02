import React from "react";
import { Loader } from "rsuite";
import Main from "../../../components/layout/main";

export default function ClassCreate({ solve, Page }) {
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
				title: "ایجاد کلاس",
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
										url: "classrooms",
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
													placeholder: "نام کلاس",
												},
											},
											{
												select: {
													name: "organization_id",
													placeholder: "انتخاب موسسه",
													data: data,
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
