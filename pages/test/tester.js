import Head from "next/head";
import Image from "next/image";
import { Button } from "rsuite";
import Main from "../../components/layout/main";
import Form from "../../components/solvers/form";
import Solve from "../../components/solvers/solve";
// import styles from '../styles/Home.module.css'

export default function Home({ solve, Page }) {
	return (
		<Main
			solve={solve}
			Page={Page}
			content={{
				step0: {
					form: {
						structure: [
							[
								{
									upload: {
										name: "molotov",
									},
								},
							],
						],
					},
					/* form: {
						config: {
							initial: {
								test: "",
								test1: "",
								test2: "",
								upl: "",
								sag: "",
							},
						},
						structure: [
							[
								{
									input: {
										placeholder: "تست",
										name: "test",
									},
									flex: 2,
								},
								{
									input: {
										placeholder: "تست ۳",
										name: "test2",
									},
								},
							],
							[
								{
									input: {
										placeholder: "hfhfhfvevf",
									},
									flex: 1.5,
								},
								{
									input: {
										placeholder: "wducpwieuc",
										name: "test1",
									},
								},
							],
							[
								{
									upload: {
										prompt: "تکون بخور مادرسگ",
										name: "upl",
									},
								},
							],
							[
								{
									select: {
										placeholder: "سلکت شدگان",
										name: "sag",
										data: [{ value: "d", label: "f" }],
									},
								},
							],
						],
					}, */
				},
			}}
		/>
	);
}
