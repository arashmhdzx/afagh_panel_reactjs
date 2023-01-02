import { useRouter } from "next/router";
import React from "react";
import Main from "../../../components/layout/main";

export default function DiscountsViewIndex({ solve, Page }) {
	const router = useRouter();
	const [state, setState] = React.useState(null);
	const [page, setPage] = React.useState(router.query?.page ?? null);
	React.useEffect(() => {
		solve.Request({
			config: {
				url: "discounts",
				pointer: "discounts",
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
				title: "مشاهده تخفیفات",
			}}
			content={{
				step0: {
					btn: {
						prompt: "تخفیف",
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
									{ title: "کد", type: "code", key: "code", align: "right" },
									{ title: "درصد تخفیف", key: "percent", type: "number" },
									{
										title: "محدودیت استفاده",
										key: "use_limit",
										type: "number",
									},
									{
										title: "عملیات ها",
										type: "actions",
										actions: [
											{ key: "edit" },
											{ key: "delete", url: "classrooms" },
											{
												key: "related_modal",
												action: "related_users",
												prompt: "کاربران مورد تخفیف",
												type: "discounts",
											},
											{
												key: "related_modal",
												action: "related_courses",
												prompt: "دوره های مورد تخفیف",
												type: "discounts",
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
