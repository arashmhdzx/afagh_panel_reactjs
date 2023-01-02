import React, { useEffect } from "react";
import { Uploader } from "rsuite";
import * as U from "../../styles/components/inputs/formal/uploader.module.scss";

export default function AfaghUploader({
	config,
	prompt,
	name,
	additional,
	additional_id,
	handler,
	container,
}) {
	const { draggable = true, multi = false } = config ?? {};
	const cont = container?.[name]?.raw;
	const [uploading, setUploading] = React.useState(false);
	const [fileInfo, setFileInfo] = React.useState(null);
	const [value, setValue] = React.useState(cont ?? undefined);

	useEffect(() => {
		value === undefined
			? fileInfo !== null && setFileInfo(null)
			: previewFile(value?.blobFile, (val) => {
					setFileInfo(val);
			  });
	}, [container]);

	function previewFile(file, callback) {
		const reader = new FileReader();
		reader.onloadend = () => {
			callback(reader.result);
		};
		reader?.readAsDataURL(file);
	}
	return (
		<>
			<div className={`${U.wrapper}`}>
				<div
					className={`${U.uploader_container} ${
						draggable ? U.uploader_draggable : ""
					}`}
				>
					<Uploader
						draggable={draggable ?? false}
						className={`${U.uploader}`}
						multiple={multi}
						action={"/"}
						autoUpload={false}
						fileListVisible={true}
						listType={`text`}
						name={name}
						onChange={(e) => {
							let eHelper = e.length > 1 ? e.pop() : e[0];

							const v = {};
							v[`${name}`] = {};

							v[`${name}`] = { ...v[`${name}`], ...eHelper };

							setValue(e[0]);
							typeof handler === "function" &&
								handler({ val: e[0]?.blobFile, key: name });
						}}
					>
						<div className={`${U.trigger}`}>
							{/* {handler.data[`${name}`]?.value && <Loader backdrop />} */}
							{fileInfo === null ? (
								<div className={`${U.uploader_prompt}`}>
									{prompt ?? "فایل مورد نظرتان را انتخاب یا اینجا رها کنید"}
								</div>
							) : (
								<div className={`${U.uploader_context}`}>
									<img src={fileInfo} width={100} height='100' />
								</div>
							)}
						</div>
					</Uploader>
				</div>
			</div>
		</>
	);
}
