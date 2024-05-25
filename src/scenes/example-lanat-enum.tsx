import {
	Circle,
	Code,
	Line,
	Rect,
	Txt,
	lines,
	makeScene2D,
} from "@motion-canvas/2d"
import {
	Direction,
	PossibleVector2,
	Vector2,
	all,
	beginSlide,
	chain,
	createRef,
	createSignal,
	slideTransition,
	waitFor,
} from "@motion-canvas/core"

export default makeScene2D(function* (view) {
	const enumCode = createRef<Code>()
	const oldCodeRect = createRef<Rect>()

	view.add(
		<>
			<Rect
				ref={oldCodeRect}
				fill="#111"
				height={2000}
				width={1500}
				x={2500}
				rotation={7}
			></Rect>

			<Code
				ref={enumCode}
				scale={1.2}
				code={`\
enum Operation {
    ADD,
    SUBTRACT,
    MULTIPLY,
    DIVIDE;
}`}
			/>
		</>
	)

	yield* slideTransition(Direction.Right, 0.5)
	yield* beginSlide("intro")

	const oldSwitchCode = createRef<Code>()

	view.add(
		<Code
			ref={oldSwitchCode}
			scale={0}
			opacity={0}
			x={700}
			code={`\
int res; switch (op) {
    case ADD -> res = a + b;
    case SUBTRACT -> res = a - b;
    case MULTIPLY -> res = a * b;
    case DIVIDE -> res = a / b;
};`}
		/>
	)

	yield enumCode().x(-600, 0.25)
	yield oldCodeRect().x(800, 0.25)
	yield* waitFor(0.1)
	yield oldSwitchCode().opacity(1, 0.25)
	yield* oldSwitchCode().scale(1, 0.25)

	yield* beginSlide("indicate switch")

	const mergeRect = createRef<Rect>()
	const mergeLine = createRef<Line>()
	const mergeCircle = createRef<Circle>()

	const mergeLineEnd = createSignal<PossibleVector2>([700, 0])
	const mergeLineStart = createSignal<PossibleVector2>([700, 0])
	const mergeCircleRad = createSignal<number>(150)

	view.add(
		<>
			<Rect
				ref={mergeRect}
				x={680}
				height={350}
				width={900}
				opacity={0}
				radius={70}
				fill="#97c8c6"
			></Rect>
			<Line
				ref={mergeLine}
				points={() => [mergeLineStart(), mergeLineEnd()]}
				lineWidth={mergeCircleRad}
				stroke={"#97c8c6"}
			/>
			<Circle
				ref={mergeCircle}
				fill={"#97c8c6"}
				opacity={0}
				position={mergeLineEnd}
				width={mergeCircleRad}
				height={mergeCircleRad}
			></Circle>
		</>
	)

	yield mergeRect().opacity(1, 0.1)
	yield* waitFor(0.08)
	yield mergeCircle().opacity(1, 0.05)
	yield mergeLineEnd([-600, 200], 0.1)
	yield oldSwitchCode().opacity(0)

	yield oldCodeRect().x(2500, 0.75)
	yield chain(waitFor(0.25), oldCodeRect().opacity(0, 0.75))

	yield mergeRect().size([0, 0], 0.15)
	yield* waitFor(0.04)
	yield mergeRect().opacity(0, 0.075)
	yield mergeLineStart([-600, 200], 0.1)

	yield mergeCircleRad(700, 0.25)
	yield* waitFor(0.1)
	yield mergeCircle().opacity(0, 0.25)

	yield enumCode().code.insert(
		[5, 0],
		`\

    double execute(double a, double b) {
        return switch (this) {
            case ADD -> a + b;
            case SUBTRACT -> a - b;
            case MULTIPLY -> a * b;
            case DIVIDE -> a / b;
        };
    }
`,
		0.25
	)
	yield* enumCode().position([0, 0], 0.5)

	yield* beginSlide("do merge")

	yield enumCode().code.insert(
		[1, 0],
		"    @EnumArgumentType.Default\n",
		0.25
	)
	yield* enumCode().selection(lines(1, 2), 0.25)
	yield* beginSlide("add annotation")
})
