import { Code, Img, Rect, Txt, makeScene2D } from "@motion-canvas/2d"
import {
	DEFAULT,
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
import error2 from "../../images/error2.png"
import error3 from "../../images/error3.png"
import error4 from "../../images/error4.png"

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
	const bgRect = createRef<Rect>()

	function* crazyFor(iterations: number) {
		yield* command(
			`program -a ${getRandomString(3)} -b ${getRandomString(
				3
			)} -op ${getRandomString(10)}`,
			0.15
		)

		yield* loop(iterations, () =>
			command(
				`program -a ${getRandomString(3)} -b ${getRandomString(
					3
				)} -op ${getRandomString(10)}`,
				0.03
			)
		)
	}

	view.add(
		<Rect
			layout
			alignItems={"center"}
			justifyContent={"start"}
			radius={20}
			fill={"#111"}
			padding={30}
			grow={0}
			ref={bgRect}
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

	yield bgRect().width(2560, 0.5)
	yield bgRect().radius(0, 0.5)
	yield resultsRect().opacity(0, 0.25)
	yield resultsRect().y(100, 0.25)
	yield bgRect().topLeft([-1280, -720], 0.5)
	yield* waitFor(0.15)
	resultsRect().remove()

	yield* crazyFor(25)

	yield command("program -a 60 -b 3 -op dvide", 0.25, easeOutCubic)

	const img = createRef<Img>()
	view.add(<Img ref={img} src={error1} opacity={0} width={1800} y={100} />)
	img().save()
	yield img().y(0, 0.25)
	yield* img().opacity(1, 0.25)

	yield* beginSlide("move and show error")

	yield img().restore(0.25)
	yield* crazyFor(25)
	img().remove()

	yield command("program -a 60 -b 3 -op", 0.25)

	view.add(<Img ref={img} src={error2} opacity={0} height={250} y={100} />)
	img().save()
	yield img().y(0, 0.25)
	yield* img().opacity(1, 0.25)

	yield* beginSlide("error 2")

	yield img().restore(0.25)
	yield* crazyFor(25)
	img().remove()

	yield command("program -a one -b test", 0.25)

	view.add(<Img ref={img} src={error3} opacity={0} width={1000} y={100} />)
	img().save()
	yield img().y(0, 0.25)
	yield* img().opacity(1, 0.25)

	yield* beginSlide("error 3")

	yield img().restore(0.25)
	yield* crazyFor(25)
	img().remove()

	yield command("program -op 'hello -a5 -b2", 0.25)

	view.add(<Img ref={img} src={error4} opacity={0} width={1000} y={100} />)
	img().save()
	yield img().y(0, 0.25)
	yield* img().opacity(1, 0.25)

	yield* beginSlide("error 4")
})
