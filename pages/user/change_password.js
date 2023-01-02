import React from "react";
import { Loader } from "rsuite";
import Main from "../../components/layout/main";

export default function ChangePass({ solve, Page }) {
	return (
		<Main
			solve={solve}
			header={{
				title: " تغییر رمز عبور",
			}}
			content={{
				step0: {
					upper: {
						btn: {
							type: "back",
							url: "/user/courses",
						},
					},
					form: {
						config: {
							initial: {
								old_password: "",
								new_password: "",
								new_password_confirm: "",
							},
							url: "reset-password",
							noRole: true,
						},
						structure: [
							[
								{
									input: {
										name: "old_password",
										placeholder: "رمز قدیمی",
										type: "password",
									},
								},
								[],
								[],
							],
							[
								{
									input: {
										name: "new_password",
										placeholder: "رمز جدید",
										type: "password",
									},
								},
								{
									input: {
										name: "new_password_confirm",
										placeholder: "تایید رمز جدید",
										type: "password",
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
