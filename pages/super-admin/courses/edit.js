import { useRouter } from "next/router";
import React from "react";
import { Checkbox, Loader, Toggle } from "rsuite";
import Main from "../../../components/layout/main";
import Form from "../../../components/solvers/form";

export default function CourseCreate({ solve, Page }) {
    const router = useRouter();
    const [data, setData] = React.useState(null);
    const [op, setOp] = React.useState({});
    const [onlineMeetingData, setOnlineMeetingData] = React.useState(null);
    
    const [toggle, setToggle] = React.useState(false);
	const [page, setPage] = React.useState(router.query?.page ?? null);
    const [state, setState] = React.useState({
        step0: data?.cu?.type ?? "cash",
        step2: "free",
    });

    React.useEffect(() => {
        page !== router.query?.page &&
            router.query?.page &&
            setPage(router.query?.page);
    }, [router.query]);
    React.useEffect(() => {
		// if (state === null || page) {
			solve.Request({
				config: {
					url: `online-class/meetings?${`page=${page ?? 1}`}`,
					// pointer: "course",
					method: "get",
					paginate: true,
				},
				dependencies: {
					data: [onlineMeetingData, setOnlineMeetingData],
				},
			}).then(res => console.log(res.data.data));
		// }
	}, []);

    React.useEffect(() => {
        if (solve.Router.query.get("id") && !data) {
            const id = solve.Router.query.get("id");
            solve.Request({
                config: {
                    url: `courses/${id}`,
                    pointer: "cu",
                    method: "get",
                },
                dependencies: {
                    callback: (e) => {
                        let temp = { cu: e?.data?.data };
                        solve.Request({
                            config: {
                                url: "all-users-without-paginate",
                                pointer: "pg",
                                method: "get",
                            },
                            dependencies: {
                                callback: (e) => {
                                    let temp2 = { pg: e?.data?.data };
                                    solve.Request({
                                        config: {
                                            url: `get-course-members/${id}`,
                                            pointer: "mems",
                                            method: "get",
                                        },
                                        dependencies: {
                                            callback: (e) => {
                                                let temp3 = { mems: e?.data?.data };
                                                solve.Request({
                                                    config: {
                                                        url: "classrooms",
                                                        pointer: "cls",
                                                        method: "get",
                                                    },
                                                    dependencies: {
                                                        callback: (e) => {
                                                            let temp4 = { cls: e?.data?.data };
                                                            solve.Request({
                                                                config: {
                                                                    url: "all-orgs-without-paginate",
                                                                    pointer: "orgs",
                                                                },
                                                                dependencies: {
                                                                    callback: (e) => {
                                                                        let temp5 = { orgs: e?.data?.data };
                                                                        solve.Request({
                                                                            config: {
                                                                                url: "categories",
                                                                                pointer: "cat",
                                                                            },
                                                                            dependencies: {
                                                                                callback: (e) => {
                                                                                    let temp6 = { cat: e?.data?.data };
                                                                                    setData({
                                                                                        ...temp,
                                                                                        ...temp2,
                                                                                        ...temp3,
                                                                                        ...temp4,
                                                                                        ...temp5,
                                                                                        ...temp6,
                                                                                    });
                                                                                },
                                                                            },
                                                                        });
                                                                    },
                                                                },
                                                            });
                                                        },
                                                    },
                                                });
                                            },
                                        },
                                    });
                                },
                            },
                        });
                    },
                },
            });
        }
        // console.log("edit.js data",data);

    }, [data, solve]);
    const { classrooms, organizations, sections, categories, title, id } =
        data?.cu ?? {};

    return (
        <Main
            solve={solve}
            header={{
                title: (
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        ویرایش دوره
                        <small style={{ marginRight: ".5rem" }}>/</small>
                        <span style={{ marginRight: ".5rem", display: "flex" }}>
                            {solve.Convert.withBadge({
                                val: solve.Convert.toPe(title),
                                color: "violet",
                            })}
                        </span>
                    </span>
                ),
            }}
            content={
                data
                    ? {
                        step0: {
                            label: "مشخصات",
                            btn: {
                                action: "back",
                            },
                            form: {
                                config: {
                                    url: `courses/${router.query?.id}?_method=PUT`,
                                    content_type: "multipart/form-data",
                                    route: true,
                                    push_notif: true,
                                    initial: {
                                        title: data.cu.title,
                                        description: data.cu.description,
                                        price: data.cu.price,
                                        type: data.cu.type,
                                        time: data.cu.time,
                                        body: data.cu.body,
                                    },
                                },
                                structure: [
                                    [
                                        {
                                            input: {
                                                name: "title",
                                                type: "text",
                                                placeholder: "نام دوره",
                                            },
                                            flex: 0.5,
                                        },
                                        {
                                            input: {
                                                name: "description",
                                                placeholder: "توضیح مختصر",
                                                addon: {
                                                    last: {
                                                        prompt: "SP-counter-150",
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                    [
                                        {
                                            select: {
                                                placeholder: "نوع",
                                                data: [
                                                    { title: "نقدی", value: "cash" },
                                                    { title: "رایگان", value: "free" },
                                                ],
                                                args: {
                                                    defaultValue: data.cu.type,
                                                },
                                                name: "type",
                                                callback: (e) => {
                                                    state !== e.val &&
                                                        setState({ ...state, step0: e.val });
                                                },
                                            },
                                        },
                                        {
                                            input: {
                                                type: "price",
                                                name: "price",
                                                direction: "ltr",
                                                placeholder: "۰",
                                                addon: {
                                                    first: {
                                                        prompt: "قیمت",
                                                    },
                                                    last: {
                                                        prompt: "تومان",
                                                    },
                                                },
                                                disabled: state?.step0 !== "cash",
                                            },
                                        },
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
                                    [
                                        {
                                            upload: {
                                                prompt: "تصویر دوره را انتخاب کنید",
                                                name: "image",
                                            },
                                        },
                                    ],
                                    [
                                        {
                                            input: {
                                                type: "textarea",
                                                placeholder: "توضیحات تکمیلی",
                                                name: "body",
                                            },
                                        },
                                    ],
                                ],
                            },
                        },
                        step1: {
                            label: "دسته بندی",
                            btn: {
                                action: "back",
                            },
                            form: {
                                config: {
                                    url: "add-course-to-category",
                                    initial: {
                                        course_id: +router.query?.id,
                                    },
                                    // content_type: 'multipart/form-data'
                                },
                                structure: [
                                    [
                                        {
                                            select: {
                                                name: "category_ids",
                                                data: data?.cat,
                                                multi: true,
                                                placeholder: "انتخاب دسته بندی ها",
                                                args: {
                                                    defaultValue: Array.isArray(data?.cat)
                                                        ? data?.cat?.map((val) => val?.id)
                                                        : null,
                                                },
                                            },
                                        },
                                    ],
                                ],
                            },
                        },
                        step2: {
                            label: "ارتباطات",
                            btn: {
                                action: "back",
                            },
                            view: {
                                structure: {
                                    tabs: {
                                        data: [
                                            {
                                                label: "موسسات",
                                                cta: {
                                                    prompt: "افزودن موسسه",
                                                    modal: {
                                                        header: `افزودن دوره به موسسه`,
                                                        body: (
                                                            <Form
                                                                config={{
                                                                    url: "add-course-to-organization",
                                                                    initial: {
                                                                        course_id: id + "",
                                                                        organization_id: "",
                                                                    },
                                                                    callback: () => router.reload(),
                                                                }}
                                                                structure={[
                                                                    [
                                                                        {
                                                                            select: {
                                                                                name: "organization_id",
                                                                                placeholder: "انتخاب موسسه",
                                                                                data: data?.orgs,
                                                                                searchable: true,
                                                                            },
                                                                        },
                                                                    ],
                                                                ]}
                                                            />
                                                        ),
                                                    },
                                                },
                                                content: {
                                                    view: {
                                                        config: {},
                                                        structure: {
                                                            table: {
                                                                data: organizations,
                                                                columns: [
                                                                    { title: "#", type: "id" },
                                                                    {
                                                                        title: "لوگو",
                                                                        type: "logo",
                                                                        key: "logo_img",
                                                                    },
                                                                    {
                                                                        title: "نام موسسه",
                                                                        type: "title",
                                                                        align: "right",
                                                                    },
                                                                    {
                                                                        title: "مدیر",
                                                                        type: "manager",
                                                                        key: "manager",
                                                                    },
                                                                    {
                                                                        title: "عملیات ها",
                                                                        type: "actions",
                                                                        actions: [
                                                                            {
                                                                                key: "delete",
                                                                                url: "detach-course-from-organization",
                                                                                method: "post",
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                            {
                                                label: "کلاس ها",
                                                cta: {
                                                    prompt: "افزودن کلاس",
                                                    modal: {
                                                        header: `افزودن کلاس به دوره`,
                                                        body: (
                                                            <Form
                                                                config={{
                                                                    url: "add-classroom-to-course",
                                                                    initial: {
                                                                        course_id: id + "",
                                                                        type: "free",
                                                                        price: "0",
                                                                    },
                                                                    callback: () => router.reload(),
                                                                }}
                                                                structure={[
                                                                    [
                                                                        {
                                                                            select: {
                                                                                name: "classroom_id",
                                                                                placeholder: "انتخاب کلاس",
                                                                                data: data?.cls,
                                                                                searchable: true,
                                                                            },
                                                                        },
                                                                    ],
                                                                    [
                                                                        {
                                                                            select: {
                                                                                name: "type",
                                                                                placeholder: "نوع",
                                                                                value: "free",
                                                                                data: [
                                                                                    { title: "نقدی", value: "cash" },
                                                                                    { title: "رایگان", value: "free" },
                                                                                ],
                                                                            },
                                                                        },
                                                                        {
                                                                            input: {
                                                                                name: "price",
                                                                                type: "price",
                                                                                placeholder: "۰",
                                                                                direction: "ltr",
                                                                                disabled: state?.step2 === "free",
                                                                                addon: {
                                                                                    first: {
                                                                                        prompt: "قیمت",
                                                                                    },
                                                                                    last: {
                                                                                        prompt: "تومان",
                                                                                    },
                                                                                },
                                                                            },
                                                                        },
                                                                    ],
                                                                ]}
                                                            />
                                                        ),
                                                    },
                                                },
                                                content: {
                                                    view: {
                                                        config: {},
                                                        structure: {
                                                            accord: {
                                                                entries: classrooms ?? [],
                                                                ctas: [
                                                                    {
                                                                        prompt: "حذف کلاس از دوره",
                                                                        color: "red",
                                                                        onClick: (e) => {
                                                                            setToggle(false);
                                                                            solve.Page.modal({
                                                                                header: "حذف",
                                                                                body: (
                                                                                    <div>
                                                                                        {`آیا نسبت به حذف کلاس '${e?.title}' از دوره '${data.cu.title}' مطمئن هستید؟`}
                                                                                        <div>
                                                                                            {toggle !== null &&
                                                                                                solve.Convert.withBadge({
                                                                                                    val: (
                                                                                                        <label>
                                                                                                            حذف تمامی کاربران کلاس
                                                                                                            از دوره
                                                                                                        </label>
                                                                                                    ),
                                                                                                    color: "red",
                                                                                                })}{" "}
                                                                                            <Checkbox
                                                                                                onChange={(e, a) =>
                                                                                                    setToggle({
                                                                                                        ...toggle,
                                                                                                        cls: a,
                                                                                                    })
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                ),
                                                                                footer: [
                                                                                    {
                                                                                        prompt: "حذف",
                                                                                        color: "red",
                                                                                        state: op?.clsDelete ?? "init",
                                                                                        handleClick: () => {
                                                                                            setOp({
                                                                                                ...op,
                                                                                                clsDelete: "loading",
                                                                                            });
                                                                                            solve.Request({
                                                                                                config: {
                                                                                                    url: "detach-classroom-from-course",
                                                                                                    method: "post",
                                                                                                    req_data: {
                                                                                                        course_id: data.cu.id,
                                                                                                        classroom_id: e?.id,
                                                                                                        delete_all_class_members_from_course:
                                                                                                            toggle?.cls ?? false,
                                                                                                    },
                                                                                                    push_notif: true,
                                                                                                },
                                                                                                dependencies: {
                                                                                                    callback: (e) => {
                                                                                                        setOp({
                                                                                                            ...op,
                                                                                                            orgDelete: "success",
                                                                                                        });
                                                                                                        router.reload();
                                                                                                    },
                                                                                                },
                                                                                            });
                                                                                        },
                                                                                    },
                                                                                ],
                                                                            });
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                            {
                                                label: "کاربران",
                                                cta: {
                                                    prompt: "افزودن کاربر",
                                                    modal: {
                                                        header: `افزودن کاربر به دوره`,
                                                        body: (
                                                            <Form
                                                                config={{
                                                                    url: "add-user-to-course-member",
                                                                    initial: {
                                                                        course_id: id + "",

                                                                    },
                                                                    callback: () => {

                                                                        return router.reload();
                                                                    },

                                                                }}

                                                                structure={[
                                                                    [
                                                                        {
                                                                            select: {
                                                                                name: "user_id",
                                                                                placeholder: "انتخاب کاربر",
                                                                                data: data?.pg,
                                                                                searchable: true,
                                                                            },
                                                                        },
                                                                    ],
                                                                ]}
                                                            />
                                                        ),
                                                    },
                                                },
                                                content: {
                                                    view: {
                                                        config: {},
                                                        structure: {
                                                            table: {
                                                                data: data?.mems ?? [],
                                                                autoHeight: null,
                                                                fillHeight: null,
                                                                columns: [
                                                                    { title: "#", type: "id", key: "user_id" },
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
                                                                        title: "عملیات ها",
                                                                        type: "actions",
                                                                        actions: [
                                                                            {
                                                                                key: "delete",
                                                                                url: "delete-course-user",
                                                                                method: "post",
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                        step3: {
                            label: "سرفصل ها",
                            btn: {
                                action: "back",
                            },
                            sections: {
                                data,
                            },
                        },
                        // step4: {
                        //     isCustom:true,
                        //     label: "جلسه آنلاین",
                        //     btn: {
                        //         action: "back",
                        //     },
                        //     // search: true,
                        //     view: {
                        //         config: {
                        //             paginate: {
                        //                 total: onlineMeetingData?.paginate?.total,
                        //                 limit: onlineMeetingData?.paginate?.per_page,
                        //                 activePage: onlineMeetingData?.paginate?.current_page,
                        //             },
                        //         },
                        //         structure: {
                        //             table: {
                        //                 data: Array.from(onlineMeetingData?.data ?? {}),
                        //                 loading: onlineMeetingData?.data ? false : true,
                        //                 course_id:data.cu.id,
                        //                 fillHeight: true,
                        //                 columns: [
                        //                     { title: "#", type: "id" },
                        //                     { title: "عنوان جلسه", type: "title", align: "right" },
                        //                     { title: "تاریخ ایجاد", key: "created_at", type: "date" },
                        //                     { title: "ضبط", type: "record" },
                        //                     { title: "شروع ضبط اتوماتیک", type: "start_auto_record" },
                        //                     { title: "مهمان", type: "guest" },
                        //                     { title: "وضعیت", type: "status" },
                        //                     {
                        //                         title: "عملیات ها",
                        //                         type: "actions",
                        //                         actions: [
                        //                             { key: "edit" },
                        //                             { key: "delete", url: "courses" },
                        //                         ],
                        //                     },
                        //                 ],
                        //             },
                        //         },
                        //     },
                        // }
                    }
                    : { loader: {} }
            }
        />
    );
}
