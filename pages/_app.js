import { createContext, useState } from "react";
import Solve from "../components/solvers/solve";
import "../styles/globals.scss";
import "rsuite/dist/rsuite-rtl.min.css";
import AModal from "../components/display/modal";

function MyApp({ Component, pageProps }) {
	// const Page = createContext({});
	const [page, setPage] = useState(null); // page data

	const controller = new AbortController();
	const solve = Solve({ State: [page, setPage], controller });
	return (
		<>
			<AModal
				{...page?.modal}
				onClose={() => solve.Page.modal("close")}
				Solver={solve}
			/>
			<Component
				{...pageProps}
				/* Page={Page} */ solve={solve}
				controller={controller}
			/>
		</>
	);
}

export default MyApp;
