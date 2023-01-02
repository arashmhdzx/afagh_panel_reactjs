import { useRouter } from "next/router";
import React from "react";
import Main from "../../../components/layout/main";
// import * as component from 'style.module.scss'

export default function CourseView({ solve }) {
	const router = useRouter();
	const [data, setData] = React.useState(null);
	React.useEffect(() => {
		if (router.query?.id) {
			const id = router.query?.id;
			const search = router.query?.s;
			if (data === null) {
				solve.Request({
					config: {
						url: `single-course/${id}`,
						method: "get",
					},
					dependencies: {
						data: [data, setData],
					},
				});
			}
		}
	}, [data, router.query?.id, solve]);
	console.log(data);
	const { image } = data ?? {};
	return (
		<Main
			solve={solve}
			header={{
				title: `مشاهده دوره ${data ? `\'${data?.data?.title}\'` : ""}`,
				additional: data
					? data?.is_member
						? "عضو هستید"
						: "عضو نیستید"
					: undefined,
			}}
			content={{
				step0: data
					? {
							btn: {
								type: "back",
							},
							view: {
								config: {},
								structure: {
									overview: {
										data,
									},
								},
							},
					  }
					: {
							btn: {
								type: "back",
							},
							loader: {},
					  },
			}}
		/>
	);
}
