import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, Popover, Tooltip, Whisper } from "rsuite";
import * as T from "../../styles/components/display/tabs.module.scss";
import View from "../layout/view";

export default function Tabs({ Dom, solve, tabs }) {
	const [tab, setTab] = React.useState(0);
	const router = useRouter();
	React.useEffect(() => {
		router.query?.["tab"] !== "0" &&
			router.push({
				query: {
					...router.query,
					tab: 0,
				},
			});
	}, []);
	React.useEffect(() => {
		tab !== router.query?.["tab"] &&
			router.query?.["tab"] &&
			setTab(router.query?.["tab"] ?? 0);
	}, [router.query, tab]);
	const { content, cta } = tabs?.data[+tab] ?? {};
	console.log(tab);
	const { view, form } = content ?? {};
	return (
		<div className={`${T.wrapper}`}>
			<div className={`${T.tabs}`}>
				<div className={`${T.buttons}`}>
					{Array.isArray(tabs?.data) &&
						tabs?.data.map((v, i) => {
							const Te = () => (
								<div
									className={`${T.tab_container} ${
										v?.disabled ? T.disabled : ""
									}`}
									key={`tab-${i}`}
								>
									{v?.disabled ? (
										<div className={`${T.tab} ${+tab === i ? T.active : ""} `}>
											<strong>{v.label}</strong>
										</div>
									) : (
										<Link
											href={{
												query: {
													...solve.Router.query.get(),
													tab: i /* solve.Router.query.get("tab") */,
												},
											}}
										>
											<div
												className={`${T.tab} ${+tab === i ? T.active : ""} `}
											>
												<strong>{v.label}</strong>
											</div>
										</Link>
									)}
								</div>
							);
							return v?.disabled ? (
								<Whisper
									trigger={"click"}
									placement={"auto"}
									speaker={
										<Tooltip arrow={false}>
											<span>{v?.disabled_message ?? "23"}</span>
										</Tooltip>
									}
								>
									<div>
										<Te />
									</div>
								</Whisper>
							) : (
								<div>
									<Te />
								</div>
							);
						})}
				</div>

				{cta && (
					<div className={`${T.cta}`}>
						<Button
							className={`${T.cta_btn}`}
							appearance={"ghost"}
							color={"red"}
							onClick={() => {
								solve.Page.modal(cta?.modal);
							}}
						>
							{cta.prompt}
						</Button>
					</div>
				)}
			</div>
			<div className={`${T.content}`}>
				{console.log(content)}
				<Dom {...content} id={"tabl"} />
			</div>
		</div>
	);
}
