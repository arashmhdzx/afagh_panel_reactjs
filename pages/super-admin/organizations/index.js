import { useRouter } from "next/router";
import React from "react";
import Main from "../../../components/layout/main";

export default function OrgViewIndex({ solve, Page }) {
	const router = useRouter();
	const [state, setState] = React.useState(null);
	const [page, setPage] = React.useState(router.query?.page ?? null);
	React.useEffect(() => {
		solve.Request({
			config: {
				url: "organizations",
				pointer: "orgs",
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
				title: "مشاهده موسسات",
			}}
			content={{
				step0: {
					btn: {
						prompt: "موسسه",
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
									{ title: "لوگو", type: "logo", key: "logo_img" },
									{ title: "نام موسسه", type: "title", align: "right" },
									{ title: "مدیر", type: "manager", key: "manager" },
									{
										title: "عملیات ها",
										type: "actions",
										actions: [
											{ key: "edit" },
											{ key: "delete", url: "organizations" },
											{
												key: "related_modal",
												action: "related_users",
												prompt: "کاربران موسسه",
												type: "org",
												url: "organizations",
											},
											{
												key: "related_modal",
												action: "related_courses",
												prompt: "دوره های موسسه",
												type: "org",
												url: "organizations",
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
