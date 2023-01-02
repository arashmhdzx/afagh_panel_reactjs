import { useRouter } from "next/router";
import React from "react";
import Main from "../../../components/layout/main";

export default function InvoicesViewIndex({ solve, Page }) {
	const router = useRouter();
	const [state, setState] = React.useState(null);
	const [page, setPage] = React.useState(router.query?.page ?? null);
	React.useEffect(() => {
		solve.Request({
			config: {
				url: `invoices?${`page=${page ?? 1}`}`,
				pointer: "invoices",
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
				title: "مشاهده پرداخت ها",
			}}
			content={{
				step0: {
					// btn: {
					// 	prompt: "کلاس",
					// 	action: "create",
					// },
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
									{
										title: "ایجاد شده توسط",
										type: "creator",
										key: "creator",
										align: "right",
									},
									{ title: "قیمت", key: "price", type: "price" },
									{ title: "تاریخ ایجاد", key: "created_at", type: "date" },
									{
										title: "وضعیت پرداخت",
										key: "order",
										target: "is_paid",
										type: "boolean",
									},
									{
										title: "عملیات ها",
										type: "actions",
										actions: [
											{
												key: "related_modal",
												action: "invoice",
												prompt: "اطلاعات تکمیلی",
												type: "invoice",
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
