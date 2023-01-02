import { Html, Head, Main, NextScript } from "next/document";
import { CustomProvider } from "rsuite";

export default function Document() {
	return (
		<Html dir='rtl'>
			<Head>
				<meta charSet='utf-8' />
			</Head>
			<CustomProvider rtl>
				<body>
					<Main />
					<NextScript />
				</body>
			</CustomProvider>
		</Html>
	);
}
