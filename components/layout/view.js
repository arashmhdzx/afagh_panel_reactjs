import { Icon } from "@iconify/react";
import React from "react";
import { Button, Pagination, Tooltip, Whisper } from "rsuite";
import * as V from "../../styles/components/layout/view.module.scss";
import AAccord from "../display/accord";
import Overview from "../display/overview";
import Table from "../display/table";
import Tabs from "../display/tabs";
import AInput from "../inputs/input";
import Form from "../solvers/form";

export default function View({
	config,
	structure,
	data_info,
	active_id,
	Solver,
}) {
	const { paginate } = config ?? {};
	const { table, accord, tabs, overview, prompt } = structure ?? {};
	const [data, setData] = React.useState(
		data_info?.data[data_info?.index]?.[data_info?.target] ?? null
	);
	React.useEffect(() => {
		data_info &&
			(data ??
				setData({
					data: data_info?.data[data_info?.index]?.[data_info?.target],
				}));
	}, [data, data_info?.data, data_info?.index, data_info?.target]);
	console.log(Solver.Router.query.get());

	const L = (e) => {
		return (
			<Button
				appearance='subtle'
				href={`${Solver.Router.path.get()}?page=${e.title + ""}${
					typeof Solver.Router.query.get("toggle") !== "undefined"
						? `&toggle=${Solver.Router.query.get("toggle")}`
						: ""
				}`}
			>
				{Solver.Convert.toPe(e.title)}
			</Button>
		);
	};
	const Structure = ({ table, accord, overview, id, prompt }) => (
		<div className={`${V.wrapper}`} id={id ?? ""}>
			{paginate && (
				<Whisper
					enterable
					placement='auto'
					trigger={+paginate?.total - +paginate?.limit <= 0 ? "none" : "click"}
					speaker={
						<Tooltip arrow={false}>
							<Pagination
								total={paginate?.total}
								activePage={paginate?.activePage}
								limit={paginate?.limit}
								linkAs={L}
							/>
						</Tooltip>
					}
				>
					<div
						className={`${V.paginate} ${
							+paginate?.total - +paginate?.limit <= 0 ? V.disabled : ""
						}`}
					>
						<small className={`${V.paginate_prompt}`}>
							<strong>صفحات</strong>
						</small>
					</div>
				</Whisper>
			)}
			{table && (
				<Table
					{...table}
					{...data}
					active_id={active_id ?? undefined}
					Solver={Solver}
				/>
			)}
			{accord && <AAccord {...accord} Solver={Solver} />}
			{prompt ?? ""}
		</div>
	);

	return overview ? (
		<Overview {...overview} Solver={Solver} />
	) : tabs ? (
		<Tabs
			Dom={(e) => {
				return tabs?.form ? (
					<Form {...e.form} Solver={Solver} />
				) : e?.view?.structure?.prompt ? (
					<div className={`${V.prompt}`}>
						{e?.view?.structure?.prompt ?? ""}
					</div>
				) : (
					<Structure {...e?.view?.structure} id={e?.id} />
				);
			}}
			tabs={tabs}
			solve={Solver}
		/>
	) : (
		<Structure {...structure} />
	);
}
