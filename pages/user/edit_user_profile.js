import React, { useEffect, useState } from "react";
import { Loader } from "rsuite";
import Main from "../../components/layout/main";

export default function ChangeUserProfile({ solve, Page }) {
	const [info, setInfo] = useState(null);
	useEffect(() => {
		if (info === null) {
			solve.Request({
				config: { url: "user_info", method: "get" },
				dependencies: { callback: (v) => setInfo(v?.data) },
			});
		}
	}, []);

	return (
		<Main
			solve={solve}
			header={{
				title: "ویرایش اطلاعات کاربری",
			}}
			content={{
				step0: info
					? {
							upper: {
								btn: {
									type: "back",
									url: "/user/courses",
								},
							},
							form: {
								config: {
									initial: {
										name: info?.name ?? "",
										national_code: info?.national_code ?? "",
										password: "",
										email: info?.email,
									},
									url: "update-profile",
								},
								structure: [
									[
										{
											input: {
												name: "name",
												placeholder: "نام کاربری",
											},
										},
										{
											input: {
												name: "email",
												placeholder: "ایمیل",
											},
										},
									],
									[
										{
											input: {
												name: "national_code",
												placeholder: "کدملی",
											},
										},
									],
								],
							},
					  }
					: { loader: {} },
			}}
		/>
	);
}
