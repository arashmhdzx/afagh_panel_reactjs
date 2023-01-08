import { Html, Head, Main, NextScript } from "next/document";
import { CustomProvider } from "rsuite";

export default function Document() {
    return (
        <Html dir='rtl'>
            <Head>
                <meta charSet='utf-8' />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/video.js/5.10.2/alt/video-js-cdn.css" rel="stylesheet" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/video.js/5.10.2/video.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/3.0.2/videojs-contrib-hls.js"></script>
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
