import axios from "axios";
import { useRouter } from "next/router";
import {
    Notification,
    useToaster,
    Message,
    Modal,
    Button,
    Tag,
    Whisper,
    Tooltip,
    Divider,
} from "rsuite";
import store from "store2";
import * as S from "../../styles/components/solvers/solve.module.scss";
import * as T from "../../styles/components/display/table.module.scss";
import date from "date-and-time";
import PN from "persian-number";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect } from "react";
import Form from "./form";
import View from "../layout/view";

const Solve = ({ State, controller }) => {
    const router = useRouter();
    const storage = store;
    const toaster = useToaster();
    const [pg, setPg] = State ?? [];

    // const cont = useContext(Context)

    const Convert = {
        toPe: (e) => PN.convertEnToPe(e),
        toEn: (e) => PN.convertPeToEn(e),
        toPrice: (val, seperator = ",") => {
            return PN.sliceNumber(val, seperator);
        },
        withBadge: ({ val, color, size }) => {
            return (
                <Tag
                    color={color ?? "blue"}
                    className={"badge_tag"}
                    size={size ?? "md"}
                >
                    {val ?? ""}
                </Tag>
            );
        },
        toLabelPair: (val) => {
            return [
                val?.map((v, i) => {
                    const { name, title, id, phone } = v ?? {};
                    return {
                        label: (
                            <span>
                                <span style={{ display: "none" }}>{phone}</span>
                                {`${name ?? title} - ${Convert.toPe(phone)}`}
                            </span>
                        ),
                        value: id,
                    };
                }),
            ];
        },
    };
    const Router = {
        path: {
            get: (index = null) => {
                // index is optional - if ommitted returns the whole path
                let out = router.pathname;
                if (index !== null) {
                    out = router.pathname.split("/");

                    Array.isArray(out) && out.splice(0, 1);
                    out = index !== "all" ? out[index] : out;
                }

                return out;
            },
            set: (val, method = "push") => {
                return router.push(
                    {
                        pathname:
                            method === "push"
                                ? `${router.pathname}/${val}`
                                : `${method === "replace" ? "/" : ""}${val}`,
                    },
                    undefined,
                    { shallow: true }
                );
            },
            remove: () => { },
        },
        query: {
            get: (key) => {
                // Key is optional, if ommitted, return an object of queries
                let out = router.query;
                return key ? out[key] : out;
            },
            set: (key, val, clearAll = false) => {
                let out = clearAll
                    ? {
                        query: {
                            [key]: val,
                        },
                    }
                    : {
                        query: {
                            ...router.query,
                            [key]: val,
                        },
                    };
                return router.push(out);
            },
            remove: (key) => {
                // Key is optional, if ommitted, clears all queries
                let out = key
                    ? {
                        query: {
                            ...router.query,
                        },
                    }
                    : { query: {} };
                key && delete out?.query[key];
                return router.push(out);
            },
        },
    };
    const Request = async ({ config, dependencies }) => {
        const { v4: uuidv4 } = require("uuid");

        const uid = uuidv4();
        const before = Store.get({ key: "REQS" }) ?? [];

        before.push(uid);
        Store.set({ key: "REQS", val: before });
        let {
            url,
            pointer,
            isLogout = false,
            method = "get",
            content_type = "application/json",
            req_data,
            noRole = false, // Used when you don't want the url to include role
            noAuth = true,
            push_notif = false,
            paginate,
        } = config ?? {};
        const s = storage.local.get("user");
        const {
            id,
            target,
            queries,
            type,
            data,
            status: st,
            callback,
            errCallback,
        } = dependencies ?? {};
        const [status, setStatus] = st ?? [];
        const [state, setState] = data ?? [];
		url =isLogout ? "https://api.afagh.ir/api/v1/logout"  : `https://api.afagh.ir/api/v1/${
			noRole ? "" : `${s.role === "super_admin" ? "super-admin" : s.role}/`
            }${url}${id ? `/${id}` : ""}${queries ? `keywords=${queries}&` : ""}`; // processes url, adding role, ids and search params
        let Authorization = noRole && noAuth ? "" : `Bearer ${s?.token}`; // no role === no auth

        const conf = {
            url,
            method,
            headers: { content_type, Authorization },
            data: req_data,
        };
        let req = axios({ ...conf }); // initialize the request
        const temp_then = ({ meta, data, organization, message, is_member, v }) => {
            typeof setStatus === "function" && setStatus("success");
            typeof setState === "function" &&
                setState(
                    paginate
                        ? data
                            ? { data: data, paginate: meta, is_member }
                            : { data: organization, paginate: meta, is_member }
                        : data
                            ? { data, is_member }
                            : { organization }
                );
            typeof callback === "function" && callback(v);
            push_notif &&
                Page.notify({ title: "موفق", body: message ?? v?.data?.message });
        };
        req
            .then((v) => {
                const { status, data: d, message } = v ?? {};

                if (status === 200 || status === 201) {
                    const { meta, data, organization, is_member } = d ?? {};

                    if (method === "get") {
                        const temp = Store.get({ key: "REQS" }) ?? [];
                        const index = temp.indexOf(uid);
                        return index + 1 - temp.length === 0
                            ? temp_then({
                                meta,
                                data,
                                organization,
                                message,
                                is_member,
                                v,
                            })
                            : undefined;
                    } else {
                        temp_then({ meta, data, organization, message, is_member, v });
                    }
                    return;
                }
            })
            .catch((v) => {
                const { status, data: d, message, code } = v ?? {};
                // typeof setStatus && setStatus("failed");
                code !== "ERR_CANCELED" &&
                    message &&
                    Page.notify({
                        title: "شکست",
                        body: `عملیات شکست خورد\n پیام سیستم: ${v.response.data.message}`,
                    });
                typeof errCallback === "function" && errCallback(v);
            });
        return req;
    };
    const Dummy_Request = async ({ config, dependencies }) => {
        const { values } = config ?? {};
        dependencies.set("loading");
        const p = new Promise(function (resolve, reject) {
            setTimeout(() => {
                resolve(values);
                // console.log(values);
                dependencies.set("success");
            }, 1000);
        });
        const temp = await p;
        return temp;
    };
    const Page = {
        modal: (props) => {
            const { header, body, footer } = props ?? {};
            props !== "close" &&
                setPg({ ...pg, modal: { open: true, header, body, footer } });
            if (props === "close") {
                setPg({ ...pg, modal: { ...pg?.modal, open: false } });
            }
        },
        notify: ({ header, body, type }) =>
            toaster.push(
                <Notification
                    duration={2500}
                    className={`notif`}
                    header={header ?? ""}
                    type={type ?? "info"}
                >
                    {body}
                </Notification>
            ),
        toggle: () => { },
    };
    const Table = (args) => {
        const { type, ke: key, title, v: va, columns, target, aid } = args ?? {};
        let value = va?.[key];
        const ID = () => <span className={`${T.id}`}>{Convert.toPe(value)}</span>;
        const Title = () => (
            <strong className={`${T.name}`} style={{cursor:"pointer"}} onClick={()=> router.push(`${Router.path.get()}/view?id=${va?.id}`) } >
                <i>{Convert.toPe(value ?? "")}</i>
            </strong>
        );
        const Creator = () => {
            const { user_name, user_id, user_phone } = value ?? {};
            return Convert.withBadge({
                val: (
                    <div>
                        <small>{Convert.toPe(`${user_id} - `)}</small>
                        <strong>{`${Convert.toPe(user_name)}`}</strong>
                    </div>
                ),
                color: "violet",
            });
        };
        const Show = () => {
            let active = Router.query.get("ep") === va?.id + "";
            return (
                <Button
                    appearance={active ? "primary" : "ghost"}
                    style={{ display: "flex" }}
                    href={`?id=${Router.query.get("id")}&sec=${aid}&ep=${va?.id}`}
                >
                    <Icon icon='ic:round-play-arrow' color={active ? "white" : "black"} />
                </Button>
            );
        };
        const BooleanSolve = () =>
            value?.[target] || value ? (
                <Icon icon='pajamas:status-closed' color='#4caf50' height='24' />
            ) : (
                <Whisper
                    trigger={"hover"}
                    speaker={
                        <Tooltip>
                            <small>پرداخت نشده</small>
                        </Tooltip>
                    }
                >
                    <Icon icon='pajamas:status' color='#ff9800' height='24' />
                </Whisper>
            );
        const Email = () =>
            value ? (
                <strong>
                    <small>{value ?? ""}</small>
                </strong>
            ) : (
                Convert.withBadge({ val: "فاقد ایمیل", size: "sm", color: "grey" })
            );
        const Date = () => {
            let time, d;
            if (typeof value === "string") {
                const a = date.parse(value, "YYYY-MM-D hh:mm:ss"); // Date Object
                time = `${Math.floor(a.getHours() / 10) === 0
                        ? `0${a.getHours()}`
                        : a.getHours()
                    }:${Math.floor(a.getMinutes() / 10) === 0
                        ? `0${a.getMinutes()}`
                        : a.getMinutes()
                    }`;
                d = value?.split(" ")[0].replace(/-/g, "/"); // Formatted Date
            }

            return (
                <span>
                    {Convert.withBadge({ val: Convert.toPe(time), size: "sm" })}{" "}
                    {Convert.withBadge({ val: Convert.toPe(d), size: "sm" })}
                </span>
            );
        };
        const Role = () => {
            let dummy_v = value ?? "";

            let temp;
            switch (dummy_v) {
                case "":
                    temp = "کاربر معمولی";
                    break;
                case "super_admin":
                    temp = "سوپر ادمین";
                    break;
                case "teacher":
                    temp = "مدرس";
                    break;
                default:
                    break;
            }
            return Convert.withBadge({ val: temp, color: "blue" });
        };
        const Description = () => {
            return value ? (
                <small>{value}</small>
            ) : (
                Convert.withBadge({
                    val: "فاقد توضیحات",
                    color: "grey",
                    size: "sm",
                })
            );
        };
        const Logo = () => {
            return value ? (
                <div className={`${T.logo_container}`}>
                    <img className={`${T.logo}`} src={value} alt={""} />
                </div>
            ) : (
                Convert.withBadge({ val: "فاقد تصویر", color: "grey" })
            );
        };
        const Phone = () => (
            <small>
                <strong>{Convert.toPe(value)}</strong>
            </small>
        );
        const Manager = () => {
            const { id, name } = value ?? {};
            return Convert.withBadge({ val: name, color: "blue" });
        };
        const Category = () => {
            return value?.length > 0
                ? value?.map((v, i) => {
                    return Convert.withBadge({ val: v?.title, size: "md" });
                })
                : Convert.withBadge({
                    val: <small>دسته بندی نشده</small>,
                    size: "sm",
                    color: "grey",
                });
        };
        const Price = () => {
            let v;

            v = typeof value === "string" ? value?.replace(",", "") : value;

            return (
                <span className={`${T.price}`}>
                    {va?.type === "cash" || va?.type === undefined
                        ? Number.isInteger(+v)
                            ? +v > 0
                                ? Convert.withBadge({
                                    val: (
                                        <span>
                                            <strong>{`${Convert.toPe(Convert.toPrice(v))}`}</strong>
                                            <small> تومان</small>
                                        </span>
                                    ),
                                    color: "violet",
                                })
                                : Convert.withBadge({
                                    val: <strong>رایگان</strong>,
                                    color: "green",
                                    size: "sm",
                                })
                            : Convert.withBadge({
                                val: <strong>رایگان</strong>,
                                color: "green",
                                size: "sm",
                            })
                        : Convert.withBadge({
                            val: <strong>رایگان</strong>,
                            color: "green",
                            size: "sm",
                        })}
                </span>
            );
        };
        const Actions = () => {
            const actions = columns?.find((v) => v?.type === "actions")?.actions;
            const Edit = () => {
                return (
                    <Link href={`${Router.path.get()}/edit?id=${va?.id}`}>
                        <div>ویرایش</div>
                    </Link>
                );
            };
            const Enter = (props) => {
                async function getClassRoute (){
                    // console.log();
                    await Request({
                        config:{
                                url: `online-class/meetings/jump-start/${va?.id}`
                        },
                        dependencies: {
                            
                        },
                    }).then(res => res.status == 200 ? window.open(res.data.join_link, '_blank').focus() : Page.notify({
                        title: "شکست",
                        body: `عملیات شکست خورد\n پیام سیستم: ${res}`,
                    }))
                }
                return (
                    <span onClick={()=>getClassRoute()} >
                        <div>ورود به جلسه آنلاین</div>
                    </span>
                );
            };
            const Delete = ({ url, method, success, failed }) => {
                const [state, setState] = React.useState("init");
                return (
                    <div
                        onClick={() =>
                            Page.modal({
                                header: `حذف ${va?.title ?? va?.name ?? va?.code}`,
                                body: "آیا نسبت به حذف این آیتم مطمئن هستید؟",
                                footer: [
                                    {
                                        type: "cta",
                                        prompt: "حذف",
                                        state,
                                        color: "red",
                                        onClick: (e) => {
                                            e?.setStatus("loading");
                                            Request({
                                                config: {
                                                    url:
                                                        url !== "delete-course-user" &&
                                                            url !== "detach-course-from-organization"
                                                            ? `${url}/${va?.id}`
                                                            : url,
                                                    method: method ?? "delete",
                                                    req_data:
                                                        url === "delete-course-user"
                                                            ? {
                                                                course_id: Router.query.get("id") + "",
                                                                user_id: (va?.id ?? va?.user_id) + "",
                                                            }
                                                            : url === "detach-course-from-organization"
                                                                ? {
                                                                    course_id: Router.query.get("id") + "",
                                                                    organization_id: va?.id,
                                                                }
                                                                : {},
                                                    push_notif: true,
                                                },
                                                dependencies: {
                                                    callback: (v) => {
                                                        v?.setStatus("success");
                                                        setTimeout(() => {
                                                            router.reload();
                                                        }, 1000);
                                                    },
                                                    errCallback: (v) => {
                                                        v?.setStatus("failed");
                                                        setTimeout(() => {
                                                            Page.modal("close");
                                                        }, 1500);
                                                    },
                                                },
                                            });
                                        },
                                    },
                                    {
                                        type: "cta",
                                        prompt: "بازگشت",

                                        color: "green",
                                        onClick: (e) => {
                                            Page.modal("close");
                                        },
                                    },
                                ],
                            })
                        }
                    >
                        حذف
                    </div>
                );
            };
            const Related_Modal = ({ action, prompt, type, url }) => {
                const [open, setOpen] = React.useState(false);
                const [data, setData] = React.useState(null);
                React.useEffect(() => {
                    if (open) {
                        Page.modal(Temp({ data: null, selection: null }));
                        (action === "related_users" || action === "related_courses") &&
                            data === null &&
                            Request({
                                config: {
                                    url: `${url ?? type}/${va?.id}`,
                                    pointer: "cls_single",
                                },
                                dependencies: {
                                    callback: (e) => {
                                        // setData(e?.data?.data)
                                        if (action === "related_users" && type === "classrooms") {
                                            Request({
                                                config: {
                                                    url: `all-users-without-paginate`,
                                                    pointer: "users-all",
                                                },
                                                dependencies: {
                                                    callback: (d) => {
                                                        Page.modal(
                                                            Temp({
                                                                data: e?.data?.data,
                                                                selection: d?.data?.data,
                                                            })
                                                        );
                                                    },
                                                },
                                            });
                                        } else {
                                            Page.modal(
                                                Temp({
                                                    data: e?.data?.data ?? e?.data?.organization,
                                                    selection: null,
                                                })
                                            );
                                        }
                                        // Page.modal(Temp(e?.data?.data));
                                    },
                                },
                            });
                    }
                }, [open]);

                let Temp = ({ data, selection }) => {
                    return {
                        header: `${action === "excel"
                                ? "افزودن کاربران با فایل اکسل"
                                : action === "related_users"
                                    ? `مشاهده کاربران مرتبط ${va?.title ?? va?.name ?? va?.code}`
                                    : action === "related_courses"
                                        ? `مشاهده دوره های مرتبط ${va?.title ?? va?.name ?? va?.code}`
                                        : action === "invoice"
                                            ? `مشاهده مشخصات پرداخت #${Convert.toPe(va?.id)}`
                                            : ""
                            }`,
                        body:
                            action === "excel" ? (
                                <Form
                                    config={{
                                        url: "excel/import/users",
                                        initial: {
                                            classroom_id: va?.id,
                                        },
                                        content_type: "multipart/form-data",
                                        push_notif: true,
                                        callback: (e) => {
                                            setTimeout(() => {
                                                Page.modal("close");
                                            }, 1500);
                                        },
                                    }}
                                    structure={[
                                        [
                                            {
                                                upload: {
                                                    prompt: "فایل اکسل را انتخاب کنید",
                                                    name: "users_excel_file",
                                                },
                                            },
                                        ],
                                    ]}
                                />
                            ) : action === "related_users" ? (
                                <div>
                                    {type === "classrooms" && (
                                        <Form
                                            config={{
                                                inline: true,
                                                initial: {
                                                    classroom_id: va?.id,
                                                },
                                                url: "add-users-to-classroom",
                                                callback: (e) => {
                                                    Page.modal(
                                                        Temp({
                                                            data: null,
                                                            selection: selection,
                                                        })
                                                    );
                                                    Request({
                                                        config: {
                                                            url: `classrooms/${va?.id}`,
                                                            pointer: "cls_single",
                                                        },
                                                        dependencies: {
                                                            callback: (d) => {
                                                                Page.modal(
                                                                    Temp({
                                                                        data: d?.data?.data,
                                                                        selection: selection,
                                                                    })
                                                                );
                                                            },
                                                        },
                                                    });
                                                },
                                            }}
                                            structure={[
                                                [
                                                    {
                                                        select: {
                                                            placeholder: "انتخاب کاربران",
                                                            multi: true,
                                                            data: selection,
                                                            name: "users_id",
                                                            searchable: true,
                                                        },
                                                    },
                                                ],
                                            ]}
                                        />
                                    )}
                                    <View
                                        config={{}}
                                        structure={{
                                            table: {
                                                data:
                                                    (type === "classrooms"
                                                        ? data?.members?.data
                                                        : type === "org" && data?.users?.data) ?? [],
                                                loading: data === null,
                                                autoHeight: true,
                                                columns: [
                                                    { title: "#", type: "id" },
                                                    {
                                                        title: "نام و نام و خانوادگی",
                                                        type: "title",
                                                        key: "name",
                                                        align: "right",
                                                    },
                                                    {
                                                        title: "شماره تلفن",
                                                        type: "phone",
                                                        key: "phone",
                                                    },
                                                    {
                                                        title: "ایمیل",
                                                        key: "email",
                                                        type: "email",
                                                        key: "email",
                                                    },
                                                    { title: "نقش", type: "role" },
                                                ],
                                            },
                                        }}
                                        Solver={{
                                            Router,
                                            Convert,
                                            Request,
                                            Table,
                                            Page,
                                            Store,
                                        }}
                                    />
                                </div>
                            ) : action === "related_courses" ? (
                                <div>
                                    <View
                                        config={{}}
                                        structure={{
                                            table: {
                                                data:
                                                    (type === "classrooms"
                                                        ? data?.courses
                                                        : type === "org"
                                                            ? data?.courses
                                                            : "") ?? [],
                                                loading: data === null,
                                                autoHeight: true,
                                                columns: [
                                                    { title: "#", type: "id" },
                                                    {
                                                        title: "عنوان دوره",
                                                        type: "title",
                                                        align: "right",
                                                    },
                                                    { title: "قیمت", type: "price" },
                                                    {
                                                        title: "تاریخ ایجاد",
                                                        key: "created_at",
                                                        type: "date",
                                                    },
                                                    {
                                                        title: "دسته بندی ها",
                                                        type: "categories",
                                                    },
                                                ],
                                            },
                                        }}
                                        Solver={{
                                            Router,
                                            Convert,
                                            Request,
                                            Table,
                                            Page,
                                            Store,
                                        }}
                                    />
                                </div>
                            ) : action === "invoice" ? (
                                <div>
                                    <div>
                                        <strong>
                                            <small>شناسه پرداخت: </small>
                                        </strong>
                                        {Convert.withBadge({
                                            val: (
                                                <strong style={{ color: "black" }}>
                                                    {Convert.toPe(va?.transaction_id)}
                                                </strong>
                                            ),
                                            color: "yellow",
                                            size: "lg",
                                        })}
                                    </div>
                                    <div
                                        style={{
                                            backgroundColor: "rgba(0, 0, 0, .05)",
                                            padding: ".75rem",
                                            borderRadius: "1rem",
                                            marginTop: ".5rem",
                                        }}
                                    >
                                        <h4>
                                            <strong>
                                                <small>
                                                    اطلاعات کاربر -{" "}
                                                    <strong>{Convert.toPe(va?.creator?.user_id)}</strong>
                                                </small>
                                            </strong>
                                        </h4>
                                        <div className={`${S.user_grid}`}>
                                            <div>
                                                <strong>نام: </strong>
                                                {Convert.withBadge({
                                                    val: <strong>{va?.creator?.user_name}</strong>,
                                                })}
                                            </div>
                                            <div>
                                                <strong>ایمیل: </strong>
                                                {Convert.withBadge({
                                                    val: <strong>{va?.creator?.user_email}</strong>,
                                                })}
                                            </div>
                                            <div>
                                                <strong>تلفن: </strong>
                                                {Convert.withBadge({
                                                    val: (
                                                        <strong>
                                                            {Convert.toPe(va?.creator?.user_phone)}
                                                        </strong>
                                                    ),
                                                })}
                                            </div>
                                        </div>
                                        <h4 style={{ marginTop: "1rem" }}>
                                            <strong>
                                                <small>
                                                    اطلاعات سفارش -{" "}
                                                    <strong>{Convert.toPe(va?.id)}</strong>
                                                </small>
                                            </strong>
                                        </h4>
                                        <div className={`${S.order_grid} ${S.user_grid}`}>
                                            <div>
                                                <strong>شناسه سفارش: </strong>
                                                {Convert.withBadge({
                                                    val: <strong>{Convert.toPe(va?.order?.id)}</strong>,
                                                })}
                                            </div>
                                            <div>
                                                <strong>مبلغ: </strong>
                                                {Convert.withBadge({
                                                    val: (
                                                        <strong>
                                                            {Convert.toPe(
                                                                Convert.toPrice(va?.order?.total_price)
                                                            )}{" "}
                                                            تومان
                                                        </strong>
                                                    ),
                                                })}
                                            </div>
                                            <div>
                                                <strong>درگاه: </strong>
                                                {Convert.withBadge({
                                                    val: (
                                                        <strong>
                                                            {va?.order?.payment_gate === "zarinpal"
                                                                ? "زرین پال"
                                                                : ""}
                                                        </strong>
                                                    ),
                                                })}
                                            </div>
                                            <div>
                                                <strong>تخفیف: </strong>
                                                {Convert.withBadge({
                                                    val: (
                                                        <strong>
                                                            {va?.order?.discount_percent === 0 ||
                                                                va?.order?.discount_amount === "0"
                                                                ? "اعمال نشده"
                                                                : Convert.toPe(
                                                                    va?.order?.discount_percent + " درصد"
                                                                )}
                                                        </strong>
                                                    ),
                                                    color:
                                                        va?.order?.discount_percent === 0 ||
                                                            va?.order?.discount_amount === "0"
                                                            ? "red"
                                                            : "violet",
                                                })}
                                            </div>
                                        </div>
                                        <h4 style={{ marginTop: "1rem" }}>
                                            <strong>
                                                <small>
                                                    <Divider>اقلام سفارش</Divider>
                                                </small>
                                            </strong>
                                        </h4>
                                        <View
                                            config={{}}
                                            structure={{
                                                accord: {
                                                    entries: va?.order?.items,
                                                },
                                            }}
                                            Solver={{
                                                Router,
                                                Convert,
                                                Request,
                                                Table,
                                                Page,
                                                Store,
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                ""
                            ),
                    };
                };

                return <div onClick={() => setOpen(true)}>{prompt}</div>;
            };
            const Show = ({ id }) => (
                <Link href={`${Router.path.get()}/view?id=${va?.id}`}>
                    <div>مشاهده</div>
                </Link>
            );
            return (
                <div className={`${T.dicon}`}>
                    <Whisper
                        trigger={"click"}
                        speaker={
                            <Tooltip className={`${T.Tooltip}`}>
                                {actions?.map((v, i) => {
                                    const { key, url, method } = v ?? {};
                                    let out;
                                    switch (key) {
                                        case "enter":
                                            out = <Enter/>;
                                            break;
                                        case "edit":
                                            out = <Edit />;
                                            break;
                                        case "delete":
                                            out = <Delete url={url} method={method} />;
                                            break;
                                        case "related_modal":
                                            out = <Related_Modal {...v} />;
                                            break;
                                        case "show":
                                            out = <Show id={va?.id} />;
                                            break;
                                        default:
                                            break;
                                    }
                                    return out;
                                })}
                            </Tooltip>
                        }
                    >
                        <Button>
                            <Icon icon='ic:round-more-vert' height='18' />
                        </Button>
                    </Whisper>
                </div>
            );
        };
        const NumberSolver = () => {
            return Convert.withBadge({ val: Convert.toPe(value), color: "green" });
        };
        const CodeSolver = () => {
            return Convert.withBadge({
                val: <strong>{value}</strong>,
                color: "black",
                size: "lg",
            });
        };
        const Org = () => Convert.withBadge({ val: value?.title, color: "green" });
        const Viewer = () => {
            return (
                <Button appearance='ghost' href={`../overview?id=${va?.id}`}>
                    مشاهده
                </Button>
            );
        };
        const TypeSolver = () => {
            let out;
            switch (value) {
                case "server":
                    out = "سرور";
                    break;
                case "course":
                    out = "دوره";
                    break;
            }
            return Convert.withBadge({
                val: out ?? "داده ای موجود نیست",
                color: out ? "blue" : "grey",
                size: out ? "md" : "sm",
            });
        };
        const Dependencies = () => {

            const column = columns.find((e) => e.key === key);
            // console.log("column data",column);
            const isVid = column?.title === "ویدیو";
            return value ? (
                <div className={`${T.dependencies_true}`} onClick={() => { }}>
                    {Convert.withBadge({
                        val: <strong>مشاهده</strong>,
                        color: "green",
                    })}
                </div>
            ) : (
                <div
                    className={`${T.dependencies_false}`}
                    onClick={() =>
                        Page.modal({
                            header: `افزودن ${column?.title}`,
                            body: {
                                form: {
                                    config: {
                                        noBtn: true,
                                    },
                                    structure: [
                                        [
                                            {
                                                toggle: {
                                                    // state: column?.state,
                                                    // setState: (e) => column?.setState(e),
                                                    prompt: `آپلود ${column?.title}`,
                                                    on: !isVid
                                                        ? 
                                                        {
                                                            form: {
                                                                config: {
                                                                    url: "upload-file",
                                                                    initial: {
                                                                        file: {},
                                                                    },
                                                                    content_type: "multipart/form-data",
                                                                    callback: (e) => {
                                                                        console.log(e);
                                                                        const fileUrl = e?.data?.data?.fileUrl;
                                                                        const fileExtension = e?.data?.data?.fileExtension;
                                                                        // const { data } = e ?? {};
                                                                        // const {
                                                                        //     video_id,
                                                                        //     videoUrl,
                                                                        //     lockFileUrl,
                                                                        //     videoTime,
                                                                        // } = data ?? {};
                                                                        Request({
                                                                            config: {
                                                                                url: "files",
                                                                                method: "post",
                                                                                req_data: {
                                                                                    extension:fileExtension,
                                                                                    fileUrl:fileUrl,
                                                                                    driver: "sftp",
                                                                                    type: "open",
                                                                                    episode_id: va?.id,
                                                                                },
                                                                                push_notif: false,
                                                                            },
                                                                            dependencies: {},
                                                                        });
                                                                    },
                                                                },
                                                                structure: [
                                                                    [
                                                                        {
                                                                            upload: {
                                                                                name: "file",
                                                                                prompt: "فایل را انتخاب کنید",
                                                                            },
                                                                        },
                                                                    ],
                                                                ],
                                                            },
                                                        }
                                                        :
                                                        {
                                                            form: {
                                                                config: {
                                                                    url: "upload-public-video-file",
                                                                    initial: {
                                                                        file: {},
                                                                    },
                                                                    content_type: "multipart/form-data",
																		callback: (e) => { // watch out // here's problem // change here
																			// const { data } = e ?? {};
                                                                            const videoUrl = e?.data?.data?.videoUrl;
                                                                            // const fileExtension = e?.data?.data?.fileExtension; 
                                                                            const videoTime = e?.data?.data?.videoTime;  
																			Request({
																				config: {
																					url: "videos",
																					method: "post",
																					req_data: {
                                                                                        time:videoTime,
                                                                                        // extension: fileExtension,
																						driver: "sftp",
																						videoUrl:videoUrl,
																						type: "lock",
																						episode_id: va?.id,
																					},
																					push_notif: false,
																				},
																				dependencies: {},
																			});
																		},
                                                                },
                                                                structure: [
                                                                    [
                                                                        {
                                                                            upload: {
                                                                                name: "file",
                                                                                prompt: "فایل را انتخاب کنید",
                                                                            },
                                                                        },
                                                                    ],
                                                                ],
                                                            },
                                                        }
                                                        
                                                        ,
                                                    off: {
                                                        form: {
                                                            config: {
                                                                url: isVid ? "videos" : "files",
                                                                initial: isVid
                                                                    ? {
                                                                        videoUrl: "",
                                                                        time: "00:00:00",
                                                                        episode_id: va?.id,
                                                                        driver: "sftp",
                                                                        type: "open",
                                                                    }
                                                                    : {
                                                                        fileUrl: "",
                                                                        extension:
                                                                            columns?.title === "صوت"
                                                                                ? "mp3"
                                                                                : "pdf",
                                                                        episode_id: va?.id,
                                                                        driver: "sftp",
                                                                        type: "open",
                                                                    },
                                                            },
                                                            structure: isVid
                                                                ? [
                                                                    [
                                                                        {
                                                                            input: {
                                                                                name: "fileUrl",
                                                                                placeholder: "لینک فایل",
                                                                            },
                                                                        },
                                                                    ],
                                                                    [
                                                                        {
                                                                            input: {
                                                                                // type: 'time',

                                                                                name: "time",
                                                                                addon: {
                                                                                    first: {
                                                                                        prompt: "مدت زمان",
                                                                                    },
                                                                                    last: {
                                                                                        prompt: "ث:د:س",
                                                                                    },
                                                                                },
                                                                                masked: true,
                                                                                showMask: true,
                                                                                guide: true,
                                                                                placeholderChar: "۰",
                                                                                mask: [
                                                                                    /[\u06F0-\u06F90-9]/,
                                                                                    /[\u06F0-\u06F90-9]/,
                                                                                    ":",
                                                                                    /[\u06F0-\u06F90-9]/,
                                                                                    /[\u06F0-\u06F90-9]/,
                                                                                    ":",
                                                                                    /[\u06F0-\u06F90-9]/,
                                                                                    /[\u06F0-\u06F90-9]/,
                                                                                ],
                                                                                keepCharPositions: true,
                                                                                direction: "ltr",
                                                                            },
                                                                        },
                                                                    ],
                                                                ]
                                                                : [
                                                                    [
                                                                        {
                                                                            input: {
                                                                                name: "fileUrl",
                                                                                placeholder: "لینک فایل",
                                                                            },
                                                                        },
                                                                    ],
                                                                ],
                                                        },
                                                    },
                                                },
                                            },
                                        ],
                                    ],
                                },
                            },
                        })
                    }
                >
                    {Convert.withBadge({
                        val: <strong>افزودن</strong>,
                        color: "yellow",
                    })}
                </div>
            );
        };
        const DependenciesWatch = () => {
            const column = columns.find((e) => e.key === key);
            const isVid = columns?.title === "ویدیو";
            return value ? (
                <div className={`${T.dependencies_true}`} onClick={() => { }}>
                    {Convert.withBadge({
                        val: <strong>مشاهده</strong>,
                        color: "green",
                    })}
                </div>
            ) : (
                <div className={`${T.dependencies_false}`}>
                    {Convert.withBadge({ val: <small>ندارد</small>, color: "grey" })}
                </div>
            );
        };
        const Create = () => {
            let out;
            switch (type) {
                case "id":
                    out = <ID />;
                    break;
                case "number":
                    out = <NumberSolver />;
                    break;
                case "organization":
                    out = <Org />;
                    break;
                case "title":
                    out = <Title />;
                    break;
                case "code":
                    out = <CodeSolver />;
                    break;
                case "email":
                    out = <Email />;
                    break;
                case "show":
                    out = <Show />;
                    break;
                case "date":
                    out = <Date />;
                    break;
                case "role":
                    out = <Role />;
                    break;
                case "description":
                    out = <Description />;
                    break;
                case "creator":
                    out = <Creator />;
                    break;
                case "boolean":
                    out = <BooleanSolve />;
                    break;
                case "logo":
                    out = <Logo />;
                    break;
                case "phone":
                    out = <Phone />;
                    break;
                case "manager":
                    out = <Manager />;
                    break;
                case "categories":
                    out = <Category />;
                    break;
                case "price":
                    out = <Price />;
                    break;
                case "actions":
                    out = <Actions />;
                    break;
                case "view":
                    out = <Viewer />;
                    break;
                case "type":
                    out = <TypeSolver />;
                    break;
                case "dependencies":
                    out = <Dependencies />;
                    break;
                case "dependencies_watch":
                    out = <DependenciesWatch />;
                    break;
                default:
                    break;
            }
            return out;
        };
        return Create();
    };
    const Store = {
        set: ({ key, val, localStorage = false }) =>
            store?.[localStorage ? "local" : "session"]?.set(key, val, true),
        get: ({ key, localStorage = false }) =>
            store?.[localStorage ? "local" : "session"]?.get(key),
        remove: ({ key, localStorage = false }) =>
            store?.[localStorage ? "local" : "session"]?.remove(key),
    };
    return { Router, Request, Page, Table, Convert, Dummy_Request, Store };
};
export default Solve;
