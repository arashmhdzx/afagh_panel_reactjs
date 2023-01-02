import React from "react";
import * as T from "../../styles/components/display/table.module.scss";
import { Table as Tbl } from "rsuite";
import Solve from "../solvers/solve";

export default function Table({
	page,
	Solver: solve,
	enabled: active_id,
	active_id: aid,
	...table
}) {
	const {
		columns,
		data_info,
		paginate,
		action_url,
		autoHeight = false,
		fillHeight,
		data: dd,
		loading,
	} = table ?? {};

	const {
		type,
		pointer,
		url,
		to,
		target,
		id,
		data: prefetched,
		refrence,
		objectify = false, // for when the raw data comes in object type, let's you modify it without errors
		addIdentifier, // for when you need to access inner levels of the data object
		depend, // for when you need to access a property but target is not suitable
	} = data_info ?? {};
	const [data, setData] = React.useState(null);
	const [height, setHeight] = React.useState(null);

	const Cell = ({ content_data: cell, Tb, page, ke: k, type, aid }) => {
		// cell = key, type, value, styles, transformers
		// Redirects props to Table Solver for processing
		return (
			<div className={`${T.cell}`}>
				{Tb({ v: cell, ke: k, page, type, columns, url, action_url, aid })}
			</div>
		);
	};
	React.useEffect(() => {
		if (data === null && !prefetched) {
			const query = solve.Router.query.get("s"); // gets the query string of search (s)
			const force = query ? true : false; // if there was a change in search query, force a refetch
			const page_query = solve.Router.query.get("page");
			let config = {
				url: `${typeof url === "function" ? url(active_id) : url}${
					force || page_query ? "?" : ""
				}${force ? `keywords=${query}&` : ""}${
					page_query ? `page=${page_query}&` : ""
				}`,
				pointer,
				callback: (e) => {},
				errCallback: () => {},
				method: "get",
				paginate: { ...paginate },
				objectify,
			};
			let req = async () => true;
			let handle = async () => {
				let d = await req();
				if (d) {
					setData(d);
				}
			};
			handle();
		}
	}, []);

	React.useEffect(() => {
		if (document) {
			const a = document.getElementById("tabl") ?? null;
			a && a !== height + 16 && setHeight(a.clientHeight - 16);
			a ?? setHeight(null);
		}
	}, [height]);

	const h = height && { height: height };

	return (
		<div className={`${T.wrapper}`}>
			<Tbl
				id={"table"}
				virtualized={false}
				loading={loading ?? data === null}
				data={
					((typeof dd === "function" && dd(aid)) || dd) ??
					(data
						? !to && target && !prefetched
							? addIdentifier
								? data?.[target]?.[addIdentifier]
								: data?.[target]
							: active_id && prefetched
							? prefetched?.[active_id]
							: data
						: [])
				}
				locale={{
					emptyMessage: `${
						false
							? "بارگذاری اطلاعات با مشکل مواجه شد"
							: "چیزی برای نمایش وجود ندارد"
					}`,
					loading: "درحال بارگزاری ...",
				}}
				fillHeight={fillHeight}
				autoHeight={autoHeight}
				wordWrap={"break-word"}
				bordered={true}
				hover={true}
				rtl={true}
				{...h}
			>
				{columns &&
					columns.map((v, i) => {
						const {
							align,
							h_style,
							title,
							content_data,
							key: k,
							type,
							flex = 1,
						} = v ?? {};

						return (
							<Tbl.Column
								align={align ?? "center"}
								key={i}
								flexGrow={flex ?? "1"}
								dataKey={k ?? type}
							>
								<Tbl.HeaderCell style={{ ...h_style }}>
									<div className={`${T.header_cell}`}>{title ?? ""}</div>
								</Tbl.HeaderCell>
								<Tbl.Cell
									dataKey={k ?? type}
									className={`${k === "name" ? T.name : ""}`}
								>
									{(rowData, rowIndex) => {
										return (
											<Cell
												content_data={rowData}
												ke={k ?? type}
												type={type ?? k}
												Tb={solve.Table}
												aid={aid}
											/>
										);
									}}
								</Tbl.Cell>
							</Tbl.Column>
						);
					})}
			</Tbl>
		</div>
	);
}
