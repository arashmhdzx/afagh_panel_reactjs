import Btn from "../components/inputs/button";
import Field from "../components/inputs/input";
// import Search from "../components/inputs/formal/search";
// import Base from "../components/layout/base";
import * as L from "../styles/login.module.scss";
import * as Logo from "../src/logo.webp";
import Image from "next/image";
import { Icon } from "@iconify/react";
import React from "react";
import { useRouter } from "next/router";
import Solve from "../components/solvers/solve";
import Link from "next/link";
// import Utils from "../components/solvers/utils1";

export default function Login(props) {
	const [state, setState] = React.useState("init");
	const [data, setData] = React.useState({});
	const p = Solve({ State: [state, setState] });
	const u = p.Convert;
	return (
		<div className={`${L.main}`}>
			<div className={`${L.card}`}>
				<div className={`${L.logo}`}>
					<div className={`${L.logo_container}`}>
						<Image
							src={Logo}
							alt='Afagh Logo'
							className={L.image}
							layout={"fill"}
						/>
					</div>
				</div>
				<div className={`${L.form}`}>
					<Field
						placeholder={"شماره تلفن"}
						className={`${L.ltr}`}
						masked
						showMask
						guide
						mask={[
							/[\u06F0-\u06F90]/,
							/[\u06F9-\u06F99]/,
							/[\u06F0-\u06F90-9]/,
							/[\u06F0-\u06F90-9]/,
							/[\u06F0-\u06F90-9]/,
							/[\u06F0-\u06F90-9]/,
							/[\u06F0-\u06F90-9]/,
							/[\u06F0-\u06F90-9]/,
							/[\u06F0-\u06F90-9]/,
							/[\u06F0-\u06F90-9]/,
							/[\u06F0-\u06F90-9]/,
						]}
						keepCharPositions={true}
						handleChange={(e) => {
							const val = u.toEn(e);
							val !== data?.phone && setData({ ...data, phone: val });
						}}
						addon={{
							last: {
								icon: (
									<div>
										<Icon
											icon='carbon:phone-filled'
											hFlip={true}
											height={18}
											color={"rgba(255,255,255,.6)"}
										/>
									</div>
								),
							},
							first: {
								prompt: "شماره تلفن",
								secondary: true,
							},
						}}
					/>
					<Field
						placeholder={"رمز عبور"}
						type={"password"}
						addon={{
							first: {
								icon: (
									<Icon
										icon='carbon:ibm-cloud-key-protect'
										height={18}
										color={"rgba(255,255,255,.6)"}
									/>
								),
							},
							last: {
								prompt: "visibility",
							},
						}}
						handleChange={(e) => {
							const val = u.toEn(e?.target?.value);
							val !== data?.password && setData({ ...data, password: val });
						}}
					/>
					<div className={`${L.submit}`}>
						<Btn
							type={"CTA"}
							clickHandler={() => {
								setState("loading");
								p.Request({
									config: {
										url: "login",
										method: "post",
										req_data: data,
										content_type: "application/json",
										noRole: true,
									},
									dependencies: {
										callback: (e) => {
											const { status, data } = e ?? {};
											const { role } = data ?? {};
											console.log(e);
											if (status === 201 || status === 200) {
												setState("success");
												p.Store.set({
													key: "user",
													val: { ...data },
													localStorage: true,
												});
												p.Router.path.set(
													`/${
														role === "super_admin"
															? "super-admin"
															: role === "user"
															? "user"
															: ""
													}/courses`,
													true
												);
											}
										},
										errCallback: (e) => {
											setState("failed");
										},
									},
								});
							}}
							status={`${state}`}
							prompt={"ورود"}
							color={"rgba(84,186,177, .37)"}
							hover={"rgba(103, 58, 183, .37)"}
						/>
					</div>
				</div>
				<div className={`${L.links}`} style={{ textAlign: "center" }}>
					<small>
						<strong>عضو نیستید؟</strong>
					</small>
					<div>
						<Link href={"/register"}>ثبت نام</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
