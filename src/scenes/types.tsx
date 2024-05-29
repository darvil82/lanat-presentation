import { Camera, Grid, Rect, Txt, makeScene2D } from "@motion-canvas/2d"
import {
	Direction,
	Reference,
	beginSlide,
	createRef,
	createRefMap,
	easeOutCubic,
	easeOutQuad,
	linear,
	makeRef,
	sequence,
	slideTransition,
	useLogger,
	waitFor,
} from "@motion-canvas/core"
import { styles } from "../styles"

const ARGUMENT_TYPES = [
	"ActionArgumentType",
	"BooleanArgumentType",
	"ByteArgumentType",
	"CounterArgumentType",
	"DoubleArgumentType",
	"EnumArgumentType",
	"FileArgumentType",
	"FloatArgumentType",
	"FromParseableArgumentType",
	"IntegerArgumentType",
	"KeyValuesArgumentType",
	"LongArgumentType",
	"NumberArgumentType",
	"NumberRangeArgumentType",
	"OptListArgumentType",
	"Parseable",
	"ShortArgumentType",
	"SimpleArgumentType",
	"SingleValueListArgumentType",
	"StdinArgumentType",
	"StringArgumentType",
	"TryParseArgumentType",
	"TupleArgumentType",
]

const SPLICE_SIZE = ARGUMENT_TYPES.length / 3

function ArgumentType(name: string, ref?: Reference<Txt>) {
	return (
		<Rect
			fill={"#111"}
			padding={40}
			paddingLeft={50}
			paddingRight={50}
			radius={10}
		>
			<Txt
				ref={ref}
				{...styles.TXT}
				paddingTop={10}
				fontSize={50}
				fontWeight={900}
				text={name}
			></Txt>
		</Rect>
	)
}

export default makeScene2D(function* (view) {
	const mainRect = createRef<Rect>()
	const typesMap = createRefMap<Rect>()
	const typeTxt = createRef<Txt>()
	const cam = createRef<Camera>()

	view.add(
		<Camera ref={cam}>
			<Rect ref={mainRect} x={1500} scale={1.25}>
				<Rect layout gap={50} ref={typesMap.a} y={-225}>
					{[...ARGUMENT_TYPES]
						.splice(0, SPLICE_SIZE)
						.map(t =>
							ArgumentType(
								t,
								t === "CounterArgumentType"
									? typeTxt
									: undefined
							)
						)}
				</Rect>
				<Rect layout gap={50} ref={typesMap.b}>
					{[...ARGUMENT_TYPES]
						.splice(SPLICE_SIZE, SPLICE_SIZE)
						.map(t => ArgumentType(t))}
				</Rect>
				<Rect layout gap={50} ref={typesMap.c} y={225}>
					{[...ARGUMENT_TYPES]
						.splice(SPLICE_SIZE * 2, SPLICE_SIZE + 1)
						.map(t => ArgumentType(t))}
				</Rect>
			</Rect>
		</Camera>
	)

	yield typesMap.a().x(-2200, 7, linear)
	yield typesMap.b().x(-2000, 7, linear)
	yield typesMap.c().x(-2500, 7, linear)
	yield* slideTransition(Direction.Top, 0.75)
	yield* waitFor(5)
	yield typesMap.a().x(-2300, 3.5, easeOutCubic)
	yield typesMap.b().x(-2100, 3.5, easeOutCubic)
	yield* typesMap.c().x(-2600, 3.5, easeOutCubic)

	yield* beginSlide("intro")

	yield* sequence(
		0.5,
		cam().position([-1335, -281], 2),
		sequence(0.75, cam().zoom(7.7, 1.75), typeTxt().fill("#111", 0.5))
	)
})
