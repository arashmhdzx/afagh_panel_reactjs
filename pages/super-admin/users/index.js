import { useRouter } from "next/router";
import React from "react";
import Main from "../../../components/layout/main";

export default function UsersViewIndex({ solve, Page }) {
	const router = useRouter();
	const [state, setState] = React.useState(null);
	const [page, setPage] = React.useState(router.query?.page ?? null);
	React.useEffect(() => {
		solve.Request({
			config: {
				url: `users?${`page=${page ?? 1}`}`,
				pointer: "users",
				method: "get",
				paginate: true,
			},
			dependencies: {
				data: [state, setState],
			},
		});
	}, [page]);
	React.useEffect(() => {
		page !== router.query?.page &&
			router.query?.page &&
			setPage(router.query?.page);
	}, [router.query]);

	return (
		<Main
			solve={solve}
			header={{
				title: "مشاهده کاربران",
			}}
			content={{
				step0: {
					btn: {
						prompt: "کاربر",
						action: "create",
					},
					view: {
						config: {
							paginate: {
								total: state?.paginate?.total,
								limit: state?.paginate?.per_page,
								activePage: state?.paginate?.current_page,
							},
						},
						structure: {
							table: {
								data: state?.data,
								loading: state ? false : true,
								fillHeight: true,
								columns: [
									{ title: "#", type: "id" },
									{
										title: "نام و نام و خانوادگی",
										type: "title",
										key: "name",
										align: "right",
									},
									{ title: "شماره تلفن", type: "phone", key: "phone" },
									{ title: "ایمیل", key: "email", type: "email", key: "email" },
									{ title: "نقش", type: "role" },
									{
										title: "عملیات ها",
										type: "actions",
										actions: [{ key: "edit" }, { key: "delete", url: "users" }],
									},
								],
							},
						},
					},
				},
			}}
		/>
	);
}
