import Btn from "../components/inputs/button";
import Field from "../components/inputs/input";
import * as L from "../styles/login.module.scss";
import * as Logo from "../src/logo.webp";
import Image from "next/image";
import { Icon } from "@iconify/react";
import React from "react";
import { useRouter } from "next/router";

export default function Register(props) {
	const [state, setState] = React.useState("init");
	const [data, setData] = React.useState({});
	const router = useRouter();
	const p = props?.solve;
	const u = p.Convert;
	return (
		<div className={`${L.main} ${L.register}`}>
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
						placeholder={"نام کاربری"}
						type={"name"}
						addon={{
							first: {
								icon: (
									<Icon
										icon='ic:round-account-circle'
										height={18}
										color={"rgba(255,255,255,.6)"}
									/>
								),
							},
						}}
						page={{ p, u }}
						handleChange={(e) => {
							const val = u.toEn(e);
							val !== data?.name && setData({ ...data, name: val });
						}}
					/>
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
						page={{ p, u }}
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
						placeholder={"شماره ملی"}
						className={`${L.ltr}`}
						masked
						showMask
						guide
						mask={[
							/[\u06F0-\u06F90-9]/,
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
							val !== data?.national_code &&
								setData({ ...data, national_code: val });
						}}
						page={{ p, u }}
						addon={{
							last: {
								icon: (
									<div>
										<Icon
											icon='ic:round-numbers'
											// hFlip={true}
											height={18}
											color={"rgba(255,255,255,.6)"}
										/>
									</div>
								),
							},
							first: {
								prompt: "شماره ملی",
								secondary: true,
							},
						}}
					/>
					<Field
						placeholder={"آدرس ایمیل"}
						type={"email"}
						addon={{
							first: {
								icon: (
									<Icon
										icon='ic:round-alternate-email'
										height={18}
										color={"rgba(255,255,255,.6)"}
									/>
								),
							},
						}}
						page={{ p, u }}
						handleChange={(e) => {
							const val = u.toEn(e);
							val !== data?.name && setData({ ...data, email: val });
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
						page={{ p, u }}
						handleChange={(e) => {
							const val = u.toEn(e);
							val !== data?.password && setData({ ...data, password: val });
						}}
					/>
					<Field
						placeholder={"تایید رمز عبور"}
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
						page={{ p, u }}
						handleChange={(e) => {
							const val = u.toEn(e);
							val !== data?.password &&
								setData({ ...data, passwordـconfirmation: val });
						}}
					/>
					<div className={`${L.submit}`}>
						<Btn
							type={"CTA"}
							clickHandler={() => {
								setState("loading");

								p.doPOST(
									{
										url: "register",
										data: data,
										login: true,
										role: "",
										content_type: "application/json",
										callback: (e) => {
											const { status, data } = e ?? {};
											const { role } = data ?? {};
											(status === 201 || status === 200) &&
												p.store("user", { ...data }, "local");
											p.Router.path.set(
												`/${
													role === "super_admin"
														? "super-admin"
														: role === "user"
														? "user"
														: ""
												}/courses`
											);
										},
									},
									{ state, setState }
								);
							}}
							status={`${state}`}
							prompt={"ثبت نام"}
							color={"rgba(84,186,177, .37)"}
							hover={"rgba(103, 58, 183, .37)"}
						/>
					</div>
				</div>
				<div className={`${L.links}`}></div>
			</div>
		</div>
	);
}
