import Solve from "./solve";

const StudySolve = ({ sec, ep, data, drawer = false }) => {
	const SecData =
		Array.isArray(data?.sections) &&
		(data.sections.find((e) => +e?.id === +sec) || data?.sections?.[0]);
	const EpData =
		(Array.isArray(SecData?.episode) &&
			SecData?.episode.find((e) => +e?.id === +ep)) ||
		SecData?.episode?.[0];

	const { title, id } = SecData ?? {};
	const {
		body,
		description,
		title: epTitle,
		mp3_url,
		pdf_url,
		video_url,
	} = EpData ?? {};

	return drawer ? (
		<div style={{ backgroundColor: "black", height: "100%" }}></div>
	) : (
		id !== undefined && {
			section: { title, id },
			episode: { epTitle, description, body, mp3_url, pdf_url, video_url },
		}
	);
};
export default StudySolve;
