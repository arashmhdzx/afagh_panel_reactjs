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
        ...restArg
    } = args ?? {};
    const { data_info, defaultValue } = a ?? {};
    const solve = Solve({});
    const { pointer, url } = data_info ?? {};
    const [data, setData] = React.useState(d ?? null);
    const [val, setVal] = React.useState(
        // data && (defaultValue ?? page.p.get("form_temp")?.values[0]?.[name] ?? null)
        ""
    );
    // console.log(val, defaultValue);
    function optionChangeHandler(...e) {

        // args?.handleSelect(e[1]?.value, multi); // form state
        // console.log(e);
        typeof args?.handler === "function" &&
            // console.log("first");
        // args?.handler({ val: multi ? e[0] : e[1]?.value, key: name }); // custom state handler  ORGINAL CODE
            args?.handler({ val: multi ? e[1].value : e[0], key: name }); // custom state handler
        typeof args?.callback === "function" &&
            args?.callback({ val: multi ? e[1].value : e[0], key: name });

        val !== e[0] && setVal(multi ? e[1].value : e[0]);

        
    }
    React.useEffect(() => {
        // console.log(args);
        // d?.initialValues.type && setVal(d?.initialValues?.type) 
    }, []);

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
        // ...args,
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
        // onChange: (...e) => {
        //     // args?.handleSelect(e[1]?.value, multi); // form state
        //     console.log(e);
        //     console.log({ val: multi ? e[1].value : e[0], key: name });
        //     typeof args?.handler === "function" &&
        //         // args?.handler({ val: multi ? e[0] : e[1]?.value, key: name }); // custom state handler  ORGINAL CODE
        //         args?.handler({ val: multi ? e[1].value : e[0], key: name }); // custom state handler
        //     typeof args?.callback === "function" &&
        //         args?.callback({ val: multi ? e[0] : e[1]?.value, key: name });
        //     // val !== e[0] && setVal(multi ? e[1].value : e[0]);
        // },
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
    ) :
        (
            <SelectPicker placement='auto' {...conf} onChange={optionChangeHandler} defaultValue={defaultValue} />
        );
}
