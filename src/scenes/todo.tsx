import {
	Code,
	LezerHighlighter,
	Line,
	Node,
	NodeProps,
	PossibleCanvasStyle,
	Rect,
	RectProps,
	Txt,
	initial,
	makeScene2D,
	signal,
} from "@motion-canvas/2d"

import { styles } from "../styles"
import {
	Direction,
	SignalValue,
	SimpleSignal,
	beginSlide,
	createRef,
	createRefMap,
	slideTransition,
	waitFor,
} from "@motion-canvas/core"
import { parser } from "@lezer/java"

Code.defaultHighlighter = new LezerHighlighter(parser)

export interface TerminalResultProps extends RectProps {
	command: SignalValue<string>
	result?: SignalValue<string>
}

export class TerminalResult extends Rect {
	@signal()
	public declare readonly command: SimpleSignal<string, this>

	@signal()
	public declare readonly result: SimpleSignal<string, this>

	private readonly resultRect = createRef<Rect>()
	private readonly commandRect = createRef<Rect>()

	public constructor(props: TerminalResultProps) {
		super({
			...props,
			layout: true,
			alignItems: "center",
			radius: 20,
			fill: props.fill ?? "#111",
			padding: 30,
		})

		this.add(
			<>
				<Rect
					padding={20}
					paddingLeft={30}
					paddingRight={30}
					radius={15}
					ref={this.commandRect}
				>
					<Txt
						text={"$ "}
						{...styles.CODE}
						fill={"#fbb"}
						paddingTop={6}
						paddingRight={20}
					/>
					<Code
						{...styles.CODE}
						highlighter={null}
						code={this.command}
					/>
				</Rect>
				<Rect
					layout
					gap={40}
					alignItems={"center"}
					ref={this.resultRect}
					opacity={0}
					width={0}
				>
					<Line
						lineWidth={10}
						points={[
							[0, 0],
							[100, 0],
						]}
						endArrow
						stroke={"#fbb"}
					/>
					<Txt
						{...styles.TXT}
						text={this.result}
						fontSize={70}
						paddingTop={10}
						fontWeight={900}
					/>
				</Rect>
			</>
		)
	}

	public *showResult(res: string) {
		this.result(res)
		yield this.resultRect().margin.left(40, 0.25)
		yield this.resultRect().width(null, 0.25)
		yield this.commandRect().fill("#222", 0.25)
		yield* waitFor(0.1)
		yield* this.resultRect().opacity(1, 0.25)
	}
}

export default makeScene2D(function* (view) {
	const rect = createRef<Rect>()
	const results = createRefMap<TerminalResult>()

	view.add(
		<Rect
			ref={rect}
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

	yield* slideTransition(Direction.Bottom, 0.5)

	yield* beginSlide("show resutls")

	yield* results.a().showResult("66")
	yield* beginSlide("show a")
	yield* results.b().showResult("30")
	yield* beginSlide("show b")
	yield* results.c().showResult("57")
	yield* beginSlide("show c")

	yield results.c().command("program -a 60 -b 3 -op DIVIDE", 0.25)
	yield* results.c().result("20", 0.25)
	yield* beginSlide("show c divide")

	yield results.c().command("program -a 60 -b 3 -op MULTIPLY", 0.25)
	yield* results.c().result("180", 0.25)
	yield* beginSlide("show c multiply")

	yield results.c().command("program -a 60 -b 3 -op ADD", 0.25)
	yield* results.c().result("63", 0.25)
	yield* beginSlide("show c add")
})
