import AInput from "../inputs/input";
import * as F from "../../styles/components/solvers/form.module.scss";
import { Formik } from "formik";
import AfaghUploader from "../inputs/uploader";
import Selector from "../inputs/select";
import React from "react";
import { Button } from "rsuite";
import Solve from "./solve";
import Btn from "../inputs/button";
import Range from "../inputs/range";
import AToggle from "./toggle";

const Form = ({ config, structure, formik }) => {
	const [additional, setAdditional] = React.useState({});
	const solve = Solve({});
	const [status, setStatus] = React.useState("init");
	const value_handler = (props) =>{
		setAdditional(
			props?.multi
				? { ...additional, ...props?.multi }
				: { ...additional, [props.key]: props.val }
		);}
	let out;
	const {
		url,
		validation,
		initial,
		route = false,
		inline = false,
		content_type = "application/json",
		push_notif = true,
		callback,
		errCallback,
		noBtn,
		before,
		editorDefaultVals,
	} = config ?? {};
	const dummy = (name) =>
		name === "time"
			? {
					handleChange: (e) => {
						const val = solve.Convert.toEn(e);
						val !== additional?.time &&
							setAdditional({ ...additional, time: val });
					},
			  }
			: {};
	if (Array.isArray(structure)) {
		out = (formik) =>
			structure.map((value, index) => {
				return (
					<div className={`${F.row}`} key={`row-${index}`}>
						{Array.isArray(value) &&
							value.map((v, i) => {
								const { input, select, upload, btn, flex, range, toggle } =
									v ?? {};

								return (
									<div
										className={`${F.col}`}
										style={flex ? { "--flex": flex } : {}}
										key={`row-${index}-${i}`}
									>
										{input && (
											<AInput {...input} {...formik} {...dummy(input?.name)} isCash={additional.type} />
										)}
										{upload && (
											<AfaghUploader
												{...upload}
												handler={(e) => value_handler(e)}
												container={additional}
											/>
										)}
										{select && (
											<Selector {...select} {...formik} handler={(e) => value_handler(e)} />
										)}
										{range && (
											<Range {...range} handler={(e) => value_handler(e)} />
										)}
										{toggle && (
											<AToggle
												{...toggle}
												solve={solve}
												handler={(e) => value_handler(e)}
											/>
										)}
									</div>
								);
							})}
					</div>
				);
			});
	}
	const valid = { validationSchema: validation } ?? null;
	React.useEffect(() => {
		if (editorDefaultVals && !(Object.keys(additional).length > 0)) {
			let out = {};
			editorDefaultVals.map((v, i) => {
				// v => key, val
				out = { ...out, [v?.key]: v?.val };
			});
			value_handler({ multi: out });
		}
	}, [editorDefaultVals, value_handler]);
	// console.log(additional);
	return (
		<Formik
			initialValues={{
				...initial,
			}}
			{...valid}
			onSubmit={(v) => {
				const Does = () => {
					const temp_v = { ...v, ...additional};
					// console.log(temp_v);
					let formData =
						content_type === "multipart/form-data" ? new FormData() : {}; // Whatever happens, this is the data sent by the Request
					Object.entries(temp_v).map((v, i) => {
						let [name, value] = v;
						name === "price" && (value = value.replace(/[,]/g, ""));
						if (content_type === "multipart/form-data") {
							formData.append(
								name,
								!Array.isArray(value) &&
									(typeof value === "string" || typeof value === "number")
									? solve.Convert.toEn(value + "")
									: value
							);
                        } else {
                            formData = {
                                ...formData,
								[name]: Array.isArray(value)
                                ? value
                                : solve.Convert.toEn(value + ""),
							};
						}
					});

					console.log("form values:", formData);

					setStatus("loading");
					solve.Request({
						config: {
							url: url,
							req_data: formData,
							method: "post",
							content_type,
							push_notif,
						},
						dependencies: {

							callback: (e) => {
								setStatus("success");
                                // console.log("yes");
								typeof callback === "function" && callback(e);
                                // console.log("yes");
								route &&
									setTimeout(() => {
										solve.Router.path.set(
											solve.Router.path
												.get()
												.replace("create", "")
												.replace("edit", ""),
											""
										);
									}, 1500);
							},
							errCallback: (e) => {
								setStatus("failed");
								typeof errCallback === "function" && errCallback(e);
							},
						},
					});
				};

				if (typeof before === "function") {
					before()?.finally(() => {
						Does();
					});
				} else Does();
			}}
		>
			{(args) => (
				<div className={`${F.wrapper} ${inline ? F.inline : ""}`}>
					{typeof out === "function" && out(args)}
					{!noBtn && (
						<Btn clickHandler={() => args.handleSubmit()} status={status} />
					)}
				</div>
			)}
		</Formik>
	);
};
export default Form;
