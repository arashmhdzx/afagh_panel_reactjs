import React from "react";
import { Tag, Toggle } from "rsuite";
import * as H from "../../styles/components/layout/header.module.scss";
import Solve from "../solvers/solve";

export default function Header({ Solver, title, toggle, additional }) {
	// const route = Solve({}).Router.path.get();

	return (
		<div className={`${H.wrapper}`}>
			<div className={`${H.content}`}>
				{
					<div className={`${H.path}`}>
						{Solver.Router.path.get("all") &&
							Solver.Router.path.get("all").map((v, i) => {
								let prompt = (p) => {
									let val;
									switch (p) {
										case "super-admin":
											val = {
												text: "پنل",
												link: "./",
											};
											break;
										case "view":
											val = {
												text: "مشاهده جزئیات",
												link: "./view",
											};
											break;
										case "failed_pay":
											val = {
												text: "پرداخت ناموفق",
												link: "./failed_pay",
											};
											break;
										case "study":
											val = {
												text: "کلاس درس",
												link: "./study",
											};
											break;
										case "success_pay":
											val = {
												text: "پرداخت موفق",
												link: "./success_pay",
											};
											break;
										case "invoices":
											val = {
												text: "پرداخت ها",
												link: "./invoices",
											};
											break;
										case "user":
											val = {
												text: "پنل",
												link: "./",
											};
											break;
										case "practices":
											val = {
												text: "حل تمرین",
												link: "./practices",
											};
											break;
										case "courses":
											val = {
												text: "دوره ها",
												link: "./courses",
											};
											break;
										case "organizations":
											val = {
												text: "موسسه ها",
												link: "./organizations",
											};
											break;
										case "users":
											val = {
												text: "کاربران",
												link: "./users",
											};
											break;
										case "classrooms":
											val = {
												text: "کلاس ها",
												link: "./classrooms",
											};
											break;
										case "categories":
											val = {
												text: "دسته بندی ها",
												link: "./categories",
											};
											break;
										case "create":
											val = {
												text: "ایجاد",
												link: null,
											};
											break;
										case "edit":
											val = {
												text: "ویرایش",
												link: null,
											};
											break;
										case "overview":
											val = {
												text: "مشاهده",
												link: null,
											};
											break;
										case "edit_user_profile":
											val = {
												text: "ویرایش اطلاعات کاربری",
												link: null,
											};
											break;
										case "change_password":
											val = {
												text: "تغییر رمز عبور",
												link: null,
											};
											break;
										case "discounts":
											val = {
												text: "تخفیفات",
												links: null,
											};
											break;
										default:
											val = {
												text: "",
												link: null,
											};
											break;
									}
									return val;
								};

								return (
									<span
										key={`path-${i}`}
										className={`${
											Solver.Router.path.get("all").pop() === v ? H.active : ""
										}`}
									>{`${i > 0 ? " › " : ""}${prompt(v)?.text} `}</span>
								);
							})}
					</div>
				}
				<div className={`${H.title}`}>
					<div className={`${H.heading}`}>
						<h1 className={`${H.heading_tag}`}>
							{typeof title === "string"
								? Solver.Convert.toPe(title ?? "عنوان صفحه")
								: title ?? ""}
						</h1>
						{additional && (
							<div className={`${H.badge}`}>
								<small className={`${H.header_slash}`}>/</small>
								<Tag
									color={
										additional === "عضو هستید"
											? "green"
											: additional === "عضو نیستید"
											? "red"
											: "violet"
									}
								>
									<strong>{Solver.Convert.toPe(additional ?? "")}</strong>
								</Tag>
							</div>
						)}
					</div>
					<div className={`${H.toggle}`}>
						{toggle && (
							<div
								style={{
									display: "grid",
									gridAutoFlow: "column",
									columnGap: ".35rem",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<label>
									<strong
										className={`${
											Solver.Router.query.get("toggle") === "1" ? "" : H.current
										}`}
									>
										{toggle?.off}
									</strong>
								</label>
								<Toggle
									size={"md"}
									checked={Solver.Router.query.get("toggle") === "1"}
									onChange={(e) => Solver.Router.query.set("toggle", e ? 1 : 0)}
								/>
								<label>
									<strong
										className={`${
											Solver.Router.query.get("toggle") === "1" ? H.current : ""
										}`}
									>
										{toggle?.on}
									</strong>
								</label>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
