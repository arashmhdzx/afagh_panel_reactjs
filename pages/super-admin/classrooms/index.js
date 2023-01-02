import { useRouter } from "next/router";
import React from "react";
import Main from "../../../components/layout/main";

export default function ClassroomsViewIndex({ solve, Page }) {
	const router = useRouter();
	const [state, setState] = React.useState(null);
	const [page, setPage] = React.useState(router.query?.page ?? null);
	React.useEffect(() => {
		solve.Request({
			config: {
				url: `classrooms?${`page=${page ?? 1}`}`,
				pointer: "cls",
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
				title: "مشاهده کلاس ها",
			}}
			content={{
				step0: {
					btn: {
						prompt: "کلاس",
						action: "create",
					},
					search: true,
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
									{ title: "عنوان کلاس", type: "title", align: "right" },
									{ title: "تاریخ ایجاد", key: "created_at", type: "date" },
									{ title: "موسسه", key: "organization", type: "organization" },
									{
										title: "عملیات ها",
										type: "actions",
										actions: [
											{ key: "edit" },
											{ key: "delete", url: "classrooms" },
											{
												key: "related_modal",
												action: "excel",
												prompt: "افزودن کاربران با فایل اکسل",
											},
											{
												key: "related_modal",
												action: "related_users",
												prompt: "کاربران کلاس",
												type: "classrooms",
											},
											{
												key: "related_modal",
												action: "related_courses",
												prompt: "دوره های کلاس",
												type: "classrooms",
											},
										],
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
