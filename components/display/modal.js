import React, { useContext } from "react";
import { Modal } from "rsuite";
import Btn from "../inputs/button";
import * as M from "../../styles/components/display/modal.module.scss";
import Form from "../solvers/form";
import View from "../layout/view";

export default function AModal({
	open,
	header,
	body,
	footer,
	onClose,
	Solver,
}) {
	return (
		<Modal open={open} onClose={() => onClose()} className={`${M.wrapper}`}>
			{header && (
				<Modal.Header className={`${M.header}`}>
					<h3>{header}</h3>
				</Modal.Header>
			)}
			<Modal.Body className={`${M.body}`}>
				{body?.form ? (
					<Form {...body.form} Solver={Solver} />
				) : body?.view ? (
					<View {...body.view} Solver={Solver} />
				) : (
					body
				)}
			</Modal.Body>
			{footer && (
				<Modal.Footer className={`${M.footer}`}>
					{Array.isArray(footer) &&
						footer.map((v, i) => {
							const { type, prompt, state, onClick, handleClick, color } =
								v ?? {};
							return (
								<div className={`${M.btn}`} key={`modal-btn-${i}`}>
									<Btn
										status={state}
										clickHandler={onClick ?? handleClick}
										prompt={prompt}
										color={color}
									/>
								</div>
							);
						})}
				</Modal.Footer>
			)}
		</Modal>
	);
}
