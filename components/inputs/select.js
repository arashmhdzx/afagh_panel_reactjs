import React from "react";
import { SelectPicker, TagPicker, Tooltip, Whisper } from "rsuite";
import store from "store2";
import * as S from "../../styles/components/inputs/select/select.module.scss";
import * as T from "../../styles/components/display/table.module.scss";
import Solve from "../solvers/solve";

export default function Selector(args) {
	const {
		args: a,
		data: d,
		page,
		name,
		val: value,
		multi,
		defaul,
		placeholder,
		searchable = false,
	} = args ?? {};
	const { data_info, defaultValue } = a ?? {};
	const solve = Solve({});
	const { pointer, url } = data_info ?? {};
	const [data, setData] = React.useState(d ?? null);

	const [val, setVal] = React.useState(
		// data && (defaultValue ?? page.p.get("form_temp")?.values[0]?.[name] ?? null)
		defaultValue ?? []
	);
	console.log(val, defaultValue);

	/* React.useEffect(() => {
		const now = new Date();
		const date = new Date(page.p.get(pointer)?.__Time__);
		if (
			(data?.length === 0 || data === null || now - date > 500) &&
			url &&
			pointer
		) {
			page.p.doFetch({
				url,
				pointer,
				data: { data, setData },
				paginate: { pg: 0, setPg: () => {} },
			});
		}
	}, []); */

	React.useEffect(() => {
		val === null &&
			data &&
			setVal(
				defaultValue ??
					/* page.p.get("form_temp")?.values[0]?.[name] */ 1 ??
					null
			);
	}, [data]);

	const data_normalized =
		d?.length > 0
			? d.map((v, i) => {
					return {
						value: v.id ?? v.value,
						label: v.title ?? (
							<i>
								<strong>{v.name}</strong> -{" "}
								<small>{solve.Convert.toPe(v.phone)}</small>
								<i style={{ display: "none" }}>{v.phone}</i>
							</i>
						),
					};
			  })
			: [];
	const conf = {
		className: `${S.select}`,
		value: val,
		...args,
		locale: {
			noResultsText: "نتیجه ای یافت نشد",
			placeholder: placeholder ?? "انتخاب کنید",
			searchPlaceholder: "جستجو...",
			loading: "در حال بارگذاری...",
			emptyMessage: "چیزی وجود ندارد",
		},
		loading: !data_normalized,
		data: data_normalized ?? d,
		cleanable: false,
		searchable: searchable,
		onChange: (...e) => {
			// args?.handleSelect(e[1]?.value, multi); // form state
			console.log(e);
			typeof args?.handler === "function" &&
				args?.handler({ val: multi ? e[0] : e[1]?.value, key: name }); // custom state handler
			typeof args?.callback === "function" &&
				args?.callback({ val: multi ? e[0] : e[1]?.value, key: name });
			val !== e[0] && setVal(multi ? e[0] : e[1]?.value);
		},
	};

	return multi ? (
		<div>
			<Whisper
				trigger={"focus"}
				placement={"top"}
				speaker={
					<Tooltip arrow={false} className={T.drop_mother}>
						<span style={{ padding: ".5rem" }}>
							برای جستجو شروع به تایپ کنید
						</span>
					</Tooltip>
				}
			>
				<div>
					<TagPicker placement='auto' {...conf} />
				</div>
			</Whisper>
		</div>
	) : (
		<SelectPicker placement='auto' {...conf} />
	);
}
