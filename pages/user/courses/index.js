import { useRouter } from "next/router";
import React from "react";
import Main from "../../../components/layout/main";

export default function CourseViewUser({ solve, controller }) {
	const router = useRouter();

	const [cat, setCat] = React.useState(false); // catalogue or not
	const [state, setState] = React.useState(null); // data
	const [page, setPage] = React.useState(router.query?.page ?? null); // pagination

	React.useEffect(() => {
		router.query?.toggle &&
			+router.query?.toggle !== cat &&
			(setCat(+router.query?.toggle === 0 ? false : true), setState(null));
	}, [cat, router.query?.toggle]);

	React.useEffect(() => {
		state && setState(null);
	}, [router.query?.s]);

	React.useEffect(() => {
		if (state === null && (page ?? true)) {
			console.log(cat);
			const search = router.query?.s;
			solve.Request({
				config: {
					url: cat
						? `catalogue?${page ? `page=${page}&` : ""}${
								search ? `keywords=${search}&` : ""
						  }`
						: `courses?${page ? `page=${page}&` : ""}${
								search ? `keywords=${search}&` : ""
						  }`,
					pointer: "course",
					method: "get",
					paginate: true,
				},
				dependencies: {
					callback: (e) => {
						const { data: d } = e ?? {};
						const { is_member, data, meta } = d ?? {};
						setState({ data, paginate: meta });
					},
				},
			});
		}
	}, [cat, page, router.query, solve, state]);
	React.useEffect(() => {
		page !== router.query?.page &&
			router.query?.page &&
			setPage(router.query?.page);
	}, [page, router.query?.page]);
	return (
		<Main
			solve={solve}
			header={{
				title: +cat ? "مشاهده همه دوره ها" : "مشاهده دوره های خریداری شده",
				toggle: {
					off: "دوره های من",
					on: "همه دوره ها",
				},
			}}
			content={{
				step0: {
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
                                            { key: "show" },
                                            { key: "enter" },
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
