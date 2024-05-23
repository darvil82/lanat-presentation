import { Code, Img, Rect, Txt, makeScene2D } from "@motion-canvas/2d"
import {
	Direction,
	all,
	beginSlide,
	chain,
	createRef,
	createRefMap,
	createSignal,
	easeInCubic,
	easeOutBack,
	easeOutCubic,
	easeOutElastic,
	linear,
	loop,
	sequence,
	slideTransition,
	waitFor,
} from "@motion-canvas/core"
import { TerminalResult } from "./todo"
import { styles } from "../styles"
import error1 from "../../images/error1.png"

function getRandomString(length: number) {
	return Array.from({ length }, () =>
		String.fromCharCode(65 + Math.random() * 50)
	).join("")
}

export default makeScene2D(function* (view) {
	const results = createRefMap<TerminalResult>()
	const resultsRect = createRef<Rect>()

	view.add(
		<Rect
			ref={resultsRect}
			layout
			direction={"column"}
			gap={40}
			alignItems={"center"}
		>
			<TerminalResult command="program -a 56 -b 10" ref={results.a} />
			<TerminalResult command="program -b 10 -a 20" ref={results.b} />
			<TerminalResult
				command="program -a 60 -b 3 -op SUBTRACT"
				ref={results.c}
			/>
		</Rect>
	)

	yield* slideTransition(Direction.Left, 0.5)

	yield* sequence(
		0.1,
		results.a().showResult("66"),
		results.b().showResult("30"),
		results.c().showResult("57")
	)

	yield* beginSlide("intro")

	const commandRect = createRef<Rect>()
	const command = createSignal("program -a 60 -b 3 -op SUBTRACT")
	const bg = createRef<Rect>()

	const crazyFor = (iterations: number) =>
		loop(iterations, () =>
			command(
				`program -a ${getRandomString(3)} -b ${getRandomString(
					3
				)} -op ${getRandomString(10)}`,
				0.03
			)
		)

	view.add(
		<Rect
			layout
			alignItems={"center"}
			justifyContent={"start"}
			radius={20}
			fill={"#111"}
			padding={30}
			grow={0}
			ref={bg}
			position={[-130, 205]}
		>
			<Rect
				layout
				padding={20}
				paddingLeft={30}
				paddingRight={30}
				radius={15}
				fill="#222"
				ref={commandRect}
			>
				<Txt
					text={"$ "}
					{...styles.CODE}
					fill={"#fbb"}
					paddingTop={6}
					paddingRight={20}
				/>
				<Code {...styles.CODE} highlighter={null} code={command} />
			</Rect>
		</Rect>
	)

	yield bg().width(3000, 0.5)
	yield bg().radius(0, 0.5)
	yield resultsRect().opacity(0, 0.25)
	yield resultsRect().y(100, 0.25)
	yield bg().topLeft([-1280, -720], 0.5)
	yield* waitFor(0.15)
	resultsRect().remove()

	yield* crazyFor(25)

	const imagesRect = createRef<Rect>()

	view.add(<Rect layout ref={imagesRect}></Rect>)

	yield* command("program -a 60 -b 3 -op dvide", 0.25, easeOutCubic)

	yield* beginSlide("move")
})