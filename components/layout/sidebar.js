import React, { useEffect } from "react";
import * as S from "../../styles/components/layout/sidebar.module.scss";
import * as Logo from "../../src/logo.webp";
import Image from "next/image";
import DropdownLink from "../display/dropdownLink";
import { Icon } from "@iconify/react";
import { Dropdown, Popover, Tooltip, Whisper } from "rsuite";
import Link from "next/link";
import { useRouter } from "next/router";
import store from "store2";
import * as D from "../../styles/components/display/dropdownLink.module.scss";

export default function Sidebar({ page, collapsed }) {
	const router = useRouter();
	const Store = store;

	const [user_name, setUser_name] = React.useState("");
	React.useEffect(() => {
		!user_name &&
			Store.get("user")?.role &&
			setUser_name(Store.get("user")?.user_name ?? "");
	}, [Store, user_name]);
	const renderSpeaker = ({ onClose, left, top, className, ...rest }, ref) => {
		const handleSelect = (eventKey) => {
			onClose();
		};

		return (
			<Tooltip
				ref={ref}
				className={className + " " + D.drop_mother}
				style={{ left, top }}
				full
			>
				<Link href={`/${router.pathname.split("/")[1]}/change_password`}>
					<strong>تغییر رمز عبور</strong>
				</Link>

				{Store.get("user")?.role && (
					<Link href={`/${router.pathname.split("/")[1]}/edit_user_profile`}>
						<strong>ویرایش پروفایل</strong>
					</Link>
				)}
			</Tooltip>
		);
	};
	const [links, setLinks] = React.useState();
	React.useEffect(() => {
		const link_container = (a = true) =>
			a
				? [
						{ prompt: "مشاهده", href: "/" },
						{ prompt: "ایجاد", href: "/create" },
				  ]
				: [{ prompt: "مشاهده", href: "/" }];
		const l = Store.get("user")?.role
			? Store.get("user")?.role !== "user"
				? [
						{
							links: link_container(),
							prompt: "دوره ها",
							href: "/super-admin/courses/",
							icon: <Icon icon='carbon:course' color='white' height='22' />,
						},
						{
							links: link_container(),
							prompt: "تخفیفات",
							href: "/super-admin/discounts/",
							icon: <Icon icon='ic:round-discount' color='white' height='22' />,
						},
						{
							links: link_container(),
							prompt: "کلاس ها",
							href: "/super-admin/classrooms",
							icon: (
								<Icon
									icon='carbon:group-presentation'
									color='white'
									height='22'
								/>
							),
						},
						{
							links: link_container(),
							prompt: "موسسه ها",
							href: "/super-admin/organizations",
							icon: (
								<Icon
									icon='carbon:building-insights-2'
									color='white'
									height='22'
								/>
							),
						},
						{
							links: link_container(false),
							prompt: "پرداخت ها",
							href: "/super-admin/invoices",
							icon: <Icon icon='ic:round-payments' color='white' height='22' />,
						},
						{
							links: link_container(),
							prompt: "کاربران",
							href: "/super-admin/users",
							icon: (
								<Icon
									icon='ic:round-supervised-user-circle'
									color='white'
									height='22'
								/>
							),
						},
						{
							links: link_container(),
							prompt: "دسته بندی ها",
							href: "/super-admin/categories",
							icon: (
								<Icon
									icon='carbon:collapse-categories'
									color='white'
									height='22'
								/>
							),
						},
				  ]
				: [
						{
							links: link_container(),
							prompt: "دوره ها",
							href: "/user/courses/",
							icon: <Icon icon='carbon:course' color='white' height='22' />,
						},
						{
							links: link_container(),
							prompt: "کلاس آنلاین",
							href: "/user/online_class",
							icon: (
								<Icon
									icon='carbon:group-presentation'
									color='white'
									height='22'
								/>
							),
						},
						{
							links: link_container(),
							prompt: "آزمون آنلاین",
							href: "/user/online_exam",
							icon: <Icon icon='bi:list-check' color='white' height='22' />,
						},
						// {
						// 	links: link_container(),
						// 	prompt: "حل تمرین",
						// 	href: "/user/practices",
						// 	icon: <Icon icon="bi:list-check" color="white" height="22" />,
						// },
				  ]
			: [];
		JSON.stringify(l) !== JSON.stringify(links) && setLinks(l);
	}, [Store, links]);
	return (
		<aside className={`${S.wrapper} ${collapsed ? S.collapsed : ""}`}>
			<div className={`${S.logo_wrapper}`}>
				<div className={`${S.logo_container}`}>
					<Image
						src={Logo}
						alt='Afagh Logo'
						className={S.logo}
						layout={"fill"}
					/>
				</div>
			</div>
			<div className={`${S.links_container}`}>
				<div className={`${S.links}`}>
					{links &&
						links.map((v, i) => {
							return <DropdownLink {...v} page={page} key={`link-${i}`} />;
						})}
				</div>
			</div>
			<div className={`${S.user}`}>
				<div className={`${S.user_profile}`}>
					<div className={`${S.profile_container}`}>
						{/* <img
                src={
                  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                }
                layout={"fill"}
              /> */}
					</div>
				</div>
				<div className={`${S.user_info}`}>
					<strong>{user_name ?? ""}</strong>
				</div>

				<div className={`${S.utils}`}>
					<div className={`${S.settings}`}>
						{/* <Icon icon="carbon:settings" color="white" width={20} /> */}

						{
							<Whisper
								placement='auto'
								trigger={Store.get("user")?.role === "user" ? "click" : "none"}
								speaker={renderSpeaker}
							>
								<Icon icon='carbon:settings' color='white' width={20} />
							</Whisper>
						}
					</div>
					<div className={`${S.logout}`} onClick={() => {}}>
						<Icon icon='carbon:power' color='white' width={20} />
					</div>
				</div>
			</div>
		</aside>
	);
}
