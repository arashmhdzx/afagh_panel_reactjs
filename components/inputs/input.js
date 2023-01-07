import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React from "react";
import { Input, InputGroup, MaskedInput, Tooltip, Whisper } from "rsuite";
import * as In from "../../styles/components/inputs/formal/input.module.scss";
import Solve from "../solvers/solve";

export default function AInput({
    label,
    defaultVal,
    placeholder,
    state,
    addon,
    useLocalStates = true,
    className,
    masked,
    direction,
    isCash,
    ...args
}) {
    // args.type === "price" && console.log(args);
    const { disabled ,...restArgs } = args
    const { name, handleChange, values, handleBlur, page, errors } = args ?? {};
    const [value, setValue] = React.useState(defaultVal ?? values?.[name]);
    const [raw, setRaw] = React.useState(value);
    const router = useRouter();
    React.useEffect(() => {
        if (masked && value) {
            const remove_dashes = value.replace(/[_]+/g, "");
            setRaw(remove_dashes);
        }
    }, [value]);
    const [visibility, setVisibility] = React.useState(null);
    const solve = Solve({});

    // You can add or modify input addon commands, just follow the template below
    const command_list = [
        {
            cmd: "counter",
            act: (states, options) => {
                const length = states.value ? states.value.length : 0;

                return (
                    <div
                        className={`${In.counter} ${length !== 0 && !(length > options) ? In.contains : ""
                            } ${length > options ? In.exceeds : ""}`}
                    >
                        {solve?.Convert?.toPe(options)}
                        <small>
                            <small>/</small>
                        </small>
                        {solve?.Convert?.toPe(length)}
                    </div>
                );
            },
        },
        { cmd: "validation", act: () => { } },
        { cmd: "tooltip", act: () => { } },
        {
            cmd: "visibility",
            act: (states, options) => {
                let out;
                out = (
                    <div
                        className={`${In.visibility}`}
                        style={{ position: "relative" }}
                        onClick={() => {
                            states.v_valSet(!states.v_val);
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "rgba(0,0,0,.37)",
                                borderRadius: "100rem",
                                display: "flex",
                                position: "absolute",
                                left: 0,
                                top: "-.5rem",
                            }}
                        >
                            {states.v_val ? (
                                <Icon
                                    icon='akar-icons:eye-open'
                                    height={18}
                                    color={"rgba(255,255,255,.87)"}
                                />
                            ) : (
                                <Icon
                                    icon='akar-icons:eye-closed'
                                    height={18}
                                    color={"rgba(255,255,255,.87)"}
                                />
                            )}
                        </div>
                    </div>
                );
                return out;
            },
        },
    ];
    const CommandExtractor = ({ input }) => {
        // There are several commands like Validation indicator, Char Counter and tooltips for addons
        // This method extracts the command from the normal prompts
        // To specify a command use ** SP- ** at the beggining, e.g. SP-counter
        if (input) {
            let cap;
            let prompt = input;
            let instruction =
                typeof prompt === "string"
                    ? prompt.startsWith("SP-")
                        ? prompt.slice(3)
                        : prompt
                    : null;
            if (instruction.includes("counter")) {
                cap = instruction.match(/\d+$/g);
                instruction = instruction.match(/^\w+/g);
            }
            return cap ? { instruction, option: cap } : instruction + "";
        }
    };
    const Initiator = ({ input, state }) => {
        let options, suspect;
        const suspect_raw = CommandExtractor({ input });
        if (typeof suspect_raw === "object") {
            (suspect = suspect_raw["instruction"] + ""),
                (options = suspect_raw["option"] + "");
        } else suspect = suspect_raw;

        const index = command_list.findIndex((object) => object.cmd === suspect);
        const cmd = command_list[index]?.act(state, options) ?? suspect;
        return cmd;
    };
    const AddonSolver = ({
        icon,
        prompt,
        secondary,
        className,
        states,
        onClick,
    }) => {
        return (
            <div className={`${In.addon} ${className ?? ""}`} onClick={onClick}>
                {icon && <div>{icon}</div>}
                {prompt && (
                    <div className={`${secondary ? In.secondary : ""}`}>
                        <Initiator
                            input={prompt}
                            state={{
                                value: states.value,
                                setValue: (e) => states.setValue(e),
                                v_val: states.v_val ?? null,
                                v_valSet: (e) => states.v_valSet(e) ?? null,
                            }}
                        />
                    </div>
                )}
            </div>
        );
    };

    const changeHandler = useLocalStates
        ? {
            onChange: (e) => {
                value !== e &&
                    setValue(args?.type !== "password" ? solve.Convert.toPe(e) : e);
            },
        }
        : {};

    const TextAreaHelper = args?.type === "textarea" && {
        as: "textarea",
        rows: args?.rows ?? 3,
    };

    return (
        <Whisper
            trigger={errors?.[name] ? "hover" : "none"}
            placement={"auto"}
            speaker={
                <Tooltip className='tooltip' arrow={true}>
                    {errors?.[name]}
                </Tooltip>
            }
        >
            <InputGroup
                className={`${In.wrapper} ${errors?.[name] ? In.danger : ""} ${className ?? ""
                    }`}
                style={{ borderColor: "rgba(255,255,255, 0.1)" }}
            >
                {addon?.first && (
                    <InputGroup.Addon
                        className={`${In.addon_container} ${In.first_addon_container}`}
                    >
                        <AddonSolver
                            {...addon.first}
                            states={{ value: value, setValue: (e) => setValue(e) }}
                        />
                    </InputGroup.Addon>
                )}
                {masked ? (
                    <MaskedInput
                        placeholder={placeholder}
                        className={`${In.input} ${direction === "ltr" ? In.ltr : ""}`}
                        value={solve.Convert.toPe(value)}
                        {...args}
                        onChange={(e, ...rest) => {
                            const remove_dashes = ({ value }) => {
                                return value?.replace(/[_]+/g, "");
                            };
                            changeHandler?.onChange(remove_dashes({ value: e }));
                            typeof handleChange === "function" &&
                                handleChange(remove_dashes({ value: rest[0]?.target?.value }));
                            typeof args?.handleChange === "function" &&
                                args?.handleChange(
                                    remove_dashes({ value: rest[0]?.target?.value })
                                );
                        }}
                        onFocus={(e) => {
                            const real = raw?.length ?? 0;
                            const input = e.target;
                            setTimeout(() => {
                                input.setSelectionRange(real, real);
                            }, 1);
                        }}
                    />
                ) : (
                    <Input
                        placeholder={placeholder}
                        {...TextAreaHelper}
                        id={name ?? ""}
                        name={name ?? ""}
                        value={solve.Convert.toPe(
                            args?.type === "price" ? solve.Convert.toPrice(value) : value
                        )}
                        onBlur={handleBlur}
                        {...restArgs}
                        
                        type={
                            args?.type
                                ? args.type === "password" && visibility
                                    ? "text"
                                    : args.type
                                : "text"
                        }
                        onChange={(e, ...rest) => {
                            useLocalStates &&
                                value !== e &&
                                setValue(
                                    args?.type !== "password"
                                        ? solve?.Convert?.toEn(
                                            args?.type === "price" ? e.replace(/[,]/g, "") : e
                                        )
                                        : e
                                        );
                                        
                                        typeof handleChange === "function" &&
                                        handleChange(
                                            solve?.Convert?.toEn(
                                                args?.type === "price"
                                            ? rest[0]?.target?.value?.replace(/[,]/g, "")
                                            : rest[0]?.target?.value
                                            )
                                            );

                                            typeof args?.handleChange === "function" &&
                                args?.handleChange(rest[0]);
                        }}
                        className={`${In.input} ${direction === "ltr" ? In.ltr : ""} input`}
                        disabled= { args.type === "price" && isCash === "free" }
                    />
                )}
                {errors?.[name] && (
                    <InputGroup.Addon
                        className={`${In.addon_container} ${In.last_addon_container}`}
                    >
                        <AddonSolver
                            icon={
                                <Icon icon='ic:round-dangerous' color={"red"} height={18} />
                            }
                        />
                    </InputGroup.Addon>
                )}
                {addon?.last && (
                    <InputGroup.Addon
                        className={`${In.addon_container} ${In.last_addon_container}`}
                    >
                        <AddonSolver
                            {...addon.last}
                            states={{
                                value: value,
                                setValue: (e) => setValue(e),
                                v_val: visibility,
                                v_valSet: (e) => setVisibility(e),
                            }}
                            onClick={() =>
                                args?.type === "search" &&
                                router.push({
                                    query: {
                                        ...router.query,
                                        s: value,
                                    },
                                })
                            }
                        />
                    </InputGroup.Addon>
                )}
            </InputGroup>
        </Whisper>
    );
}
