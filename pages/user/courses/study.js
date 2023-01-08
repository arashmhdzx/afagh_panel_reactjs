import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Button, Divider, Drawer } from "rsuite";
import Main from "../../../components/layout/main";
import View from "../../../components/layout/view";
import StudySolve from "../../../components/solvers/study";
import * as S from "../../../styles/components/solvers/study.module.scss";
// import Rhp from 'react-hls-player';

import videojs from "video.js";


const Video = (props) => {

    const videoNode = useRef(null);
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        if (videoNode.current) {
            const _player = videojs(videoNode.current, props);
            setPlayer(_player);
            return () => {
                if (player !== null) {
                    player.dispose();
                }
            };
        }
    }, []);

    return (
        <div data-vjs-player>
            <video ref={videoNode} className="video-js"></video>
        </div>
    );
};


export default function Study({ solve }) {
    const router = useRouter();
    const [state, setState] = React.useState(null);
    const [solver, setSolver] = React.useState(null);
    const { title } = state ?? {};
    const sec = +router.query?.sec;
    const ep = +router.query?.ep;


    const onDownloadClick = (file) => {
        // using Java Script method to get PDF file
        fetch(file).then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = "file";
                alink.click();
            })
        })
    }



    const StudySolverTemp = StudySolve({ sec, ep, data: state });
    React.useEffect(() => {
        if (router.query?.id && !state) {
            solve.Request({
                config: {
                    url: `single-course/${router.query?.id}`,
                },
                dependencies: {
                    data: [state, setState],
                },
            });
        }
    }, [router.query?.id, solve, state]);
    React.useEffect(() => {
        if (sec === sec && ep === ep) {
            // Checks if NaN
            if (StudySolverTemp) {
                if (
                    +solver?._SEC_ !== sec ||
                    +solver?._EP_ !== ep ||
                    (solver === null && state !== null)
                ) {
                    setSolver({ ...StudySolverTemp, _SEC_: sec, _EP_: ep });
                }
            }
        }
    }, [
        StudySolverTemp,
        ep,
        router.query.ep,
        router.query.sec,
        sec,
        solver,
        state,
    ]);

    const secObj = state?.data?.sections?.find(
        (v) => v?.id === +solve.Router.query.get("sec")
    );
    const epObj = secObj?.episode?.find(
        (v) => v?.id === +solve.Router.query.get("ep")
    );

    const play = {
        fill: true,
        fluid: true,
        autoplay: true,
        controls: true,
        preload: "metadata",
        sources: [
            {
                src: epObj?.video_url,
                type: "application/x-mpegURL"
            }
        ]
    };

    return (
        <>
            <Main
                header={{
                    title: (
                        <div style={{ display: "flex" }}>
                            <h4>
                                <small>در حال مشاهده:</small>
                            </h4>
                            <span style={{ marginRight: ".5rem" }}>{`${solve.Convert.toPe(
                                secObj?.title ?? ""
                            )}`}</span>
                        </div>
                    ),
                    additional: epObj?.title,
                    metaTitle: epObj?.title,
                }}
                content={{
                    step0: state
                        ? {
                            upper: {
                                btn: {
                                    type: "back",
                                },
                            },
                            handCrafted: (
                                <div className={`${S.wrapper}`}>
                                    {Number.isInteger(+router.query?.sec) && //  && epObj?.mp3_url || epObj?.pdf_url || epObj?.video_url 
                                        Number.isInteger(+router.query?.ep) ? (
                                        <>
                                            <div className={`${S.content}`}>
                                                قسمت : {epObj?.body ?? ""}
                                            </div>
                                            <Divider />
                                            <div className={`${S.media}`}>
                                                <div
                                                    className={`${S.video}`}
                                                    style={{ textAlign: "center" }}
                                                >
                                                    {/* {console.log(epObj)} */}
                                                    {epObj?.video_url
                                                        ?
                                                        <Video {...play} />
                                                        : solve.Convert.withBadge({
                                                            val: <strong>ویدیو ندارد</strong>,
                                                            color: "grey",
                                                            size: "lg",
                                                        })}
                                                </div>
                                                <div className={`${S.additional}`}>
                                                    {epObj?.mp3_url && (
                                                        <div>
                                                            <Button onClick={() => onDownloadClick(epObj?.mp3_url)} appearance='ghost' size='sm'>
                                                                دانلود محتوای صوتی
                                                            </Button>
                                                        </div>
                                                    )}
                                                    {epObj?.pdf_url && (
                                                        <div>
                                                            <Button onClick={() => onDownloadClick(epObj?.pdf_url)} appearance='ghost' size='sm'>
                                                                دانلود PDF
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                        </>
                                    ) : (
                                        <div
                                            style={{
                                                display: "flex",
                                                height: "100%",
                                                width: "100%",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {solve.Convert.withBadge({
                                                val: <strong>قسمتی را انتخاب کنید</strong>,
                                                color: "grey",
                                                size: "lg",
                                            })}
                                        </div>
                                    )}
                                </div>
                            ),
                        }
                        : { loader: {} },
                }}
                solve={solve}
                overlay={
                    <div
                        className={`${S.over}`}
                        style={{
                            height: "100vh",
                            width: "25%",
                            background: "#eee",
                            position: "fixed",
                            top: 0,
                            left: 0,
                        }}
                    >
                        <div className={`${S.overlay}`}>
                            <div className={`${S.header}`}>
                                <h5>
                                    <strong>انتخاب قسمت</strong>
                                </h5>
                            </div>
                            <div className={`${S.content}`}>
                                <View
                                    config={{}}
                                    structure={{
                                        accord: {
                                            entries: state?.data?.sections ?? [],
                                            current: router.query?.sec,
                                            inside: {
                                                view: {
                                                    structure: {
                                                        table: {
                                                            data: (e) => {
                                                                console.log(
                                                                    state?.data?.sections?.find(
                                                                        (v) => v?.id === e
                                                                    )?.episode
                                                                );
                                                                return state?.data?.sections?.find(
                                                                    (v) => v?.id === e
                                                                )?.episode;
                                                            },

                                                            columns: [
                                                                {
                                                                    title: "نام قسمت",
                                                                    type: "title",
                                                                    key: "title",
                                                                },
                                                                { title: "مشاهده", type: "show" },
                                                            ],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                    Solver={solve}
                                />
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    );
}
