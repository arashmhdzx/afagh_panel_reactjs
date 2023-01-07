import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, Drawer, Loader, Pagination, Steps } from "rsuite";
import * as C from "../../styles/components/layout/content.module.scss";
import Step4 from "../display/step4";
import AfaghSteps from "../display/steps";
import AInput from "../inputs/input";
import Form from "../solvers/form";
import Sections from "../solvers/section";
import View from "./view";

export default function Content(props) {
    const router = useRouter();
    console.log(props);
    const {
        isCustom,
        btn,
        title,
        view,
        form,
        search = false,
        loader,
        sections,
        handCrafted,
    } = props?.[`step${router.query?.step ? +router.query.step - 1 : 0}`] ?? {};
    const { loader: l } = props ?? {};
    const Solver = props.Solver;
    const Formm = (e) => {
        return <Form {...e} Solver={Solver} />;
    };

    return (
        <div className={`${C.wrapper}`}>
            <div className={`${C.upper}`}>
                {props?.["step1"] && (
                    <AfaghSteps
                        steps={Object.keys(props).filter((v) => v.includes("step") ?? [])}
                        content={props}
                        page={{ p: Solver, u: Solver.Convert }}
                    />
                )}
                {view && search && (
                    <AInput
                        className={C.search}
                        type={"search"}
                        defaultValue={router.query?.s ?? ""} // this thing right here should change
                        addon={{
                            first: {
                                prompt: "جستجو",
                            },
                            last: {
                                icon: <Icon icon='ic:round-search' height='24' />,
                            },
                        }}
                    />
                )}
                {btn && (
                    <Button className={`${C.btn}`}>
                        {btn?.action === "create" ? (
                            <Link href={`${Solver.Router.path.get()}/create`}>
                                <span className={`${C.btn_container}`}>
                                    <strong>ایجاد {btn?.prompt} جدید</strong>
                                    <div className={`${C.icon}`}>
                                        <Icon icon='ic:round-add' height='32' />
                                    </div>
                                </span>
                            </Link>
                        ) : (
                            <Link
                                href={
                                    btn?.href ??
                                    Solver.Router.path
                                        .get()
                                        .replace("create", "")
                                        .replace("edit", "")
                                        .replace("view", "")
                                        .replace("study", "")
                                }
                            >
                                <span className={`${C.btn_container}`}>
                                    <strong>بازگشت</strong>
                                    <div className={`${C.icon}`}>
                                        <Icon icon='ic:round-arrow-back-ios-new' height='24' />
                                    </div>
                                </span>
                            </Link>
                        )}
                    </Button>
                )}
                {title && <h3>{title}</h3>}
            </div>
            <div className={`${C.content}`}>

                {view && !isCustom && <View {...view} Solver={Solver} />} {/* display course list */}
                {form && !isCustom && <Formm {...form} />}
                {(loader || l) && <Loader center />}
                {/*  sar fasl section  is down | */}
                {sections && !isCustom && (
                    <Sections
                        {...sections}
                        Solver={Solver}
                        View={({ structure }) => (
                            <View structure={structure} Solver={Solver} />
                        )}
                    />
                )}
                {isCustom &&
                    <Step4 data={props.step4} Solver={solver} />
                }
                {handCrafted ?? ""}
            </div>
        </div>
    );
}
