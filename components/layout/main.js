import { Icon } from "@iconify/react";
import Head from "next/head";
import React, { useContext, useMemo, useState } from "react";
import { Button, Drawer, Loader } from "rsuite";
import * as M from "../../styles/components/layout/main.module.scss";
import AModal from "../display/modal";
import StudySolve from "../solvers/study";
import Content from "./content";
import Header from "./header";
import Sidebar from "./sidebar";

export default React.memo(function Main(props) {
	const { content, solve: Solver, header, overlay } = props ?? {};
	const Cont = useMemo(() => Content({ ...content, Solver }), [content]);
	const [side, setSide] = useState(false);
	const [study, setStudy] = useState(false);
	return (
		<div className={`${M.wrapper}`} suppressHydrationWarning>
			<Head>
				<title>{header?.metaTitle ?? header?.title ?? ""} | بنیاد آفاق</title>
			</Head>
			<div className={`${M.container}`}>
				<div className={M.side}>
					<Button
						appearance='primary'
						style={{
							display: "flex",
							aspectRatio: "1/1",
							alignItems: "center",
							borderRadius: "100rem",
							padding: "1rem",
						}}
						onClick={() => setSide(!side)}
					>
						<Icon
							icon={side ? "ic:round-close" : "ic:round-menu"}
							color='white'
						/>
					</Button>
				</div>
				{Solver.Router.path.get("all")?.pop() === "study" && (
					<div
						className={M.study}
						style={{
							bottom: study ? "2rem" : null,
							zIndex: study ? 100000 : null,
							width: "fit-content",
							top: study ? "unset" : null,
						}}
					>
						<Button
							appearance='primary'
							style={{
								display: "flex",
								aspectRatio: "1/1",
								alignItems: "center",
								borderRadius: "100rem",
								padding: "1rem",
								width: "fit-content",
							}}
							onClick={() => setStudy(!study)}
						>
							<Icon
								icon={study ? "ic:round-close" : "ic:round-menu"}
								color='white'
							/>
						</Button>
					</div>
				)}
				<div className={`${M.sidebar} ${side ? M.side_open : ""}`}>
					<Sidebar />
				</div>
				<div
					className={`${M.content_container}`}
					style={{
						"--overlay": overlay ? "33.5%" : "",
						"--open": study ? "block" : "none",
					}}
				>
					<Header {...header} Solver={Solver} />
					<div className={`${M.content}`}>
						{/* <Cont /> */}
						{content?.loading ? <Loader /> : Cont}
						{overlay ?? ""}
					</div>
				</div>
			</div>
		</div>
	);
});
