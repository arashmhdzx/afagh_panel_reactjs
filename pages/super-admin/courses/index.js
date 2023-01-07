import { useRouter } from "next/router";
import React from "react";
import Main from "../../../components/layout/main";

export default function CoursesViewIndex({ solve, Page }) {
	const router = useRouter();
	const [state, setState] = React.useState(null);
	const [page, setPage] = React.useState(router.query?.page ?? null);

	React.useEffect(() => {
		if (state === null || page) {
			solve.Request({
				config: {
					url: `courses?${`page=${page ?? 1}`}`,
					pointer: "course",
					method: "get",
					paginate: true,
				},
				dependencies: {
					data: [state, setState],
				},
			});
		}
	}, [page]);
	console.log(state);
	React.useEffect(() => {
		page !== router.query?.page &&
			router.query?.page &&
			setPage(router.query?.page);
	}, [router.query]);

	return (
		<Main
			solve={solve}
			header={{
				title: "مشاهده دوره ها",
			}}
			content={{
				step0: {
					btn: {
						prompt: "جلسه",
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
								data: Array.from(state?.data ?? {}),
								loading: state?.data ? false : true,
								fillHeight: true,
								columns: [
									{ title: "#", type: "id" },
									{ title: "عنوان دوره", type: "title", align: "right" },
									{ title: "قیمت", type: "price" },
									{ title: "تاریخ ایجاد", key: "created_at", type: "date" },
									{ title: "دسته بندی ها", type: "categories" },
									{
										title: "عملیات ها",
										type: "actions",
										actions: [
                                            { key: "enter" , url:"" },
											{ key: "edit" },
											{ key: "delete", url: "courses" },
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
