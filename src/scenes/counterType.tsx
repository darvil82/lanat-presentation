import { Code, Txt, lines, makeScene2D, word } from "@motion-canvas/2d"
import { styles } from "../styles"
import {
	Direction,
	all,
	beginSlide,
	chain,
	createRef,
	createRefArray,
	makeRef,
	makeRefs,
	range,
	sequence,
	slideTransition,
	waitFor,
} from "@motion-canvas/core"
import { TerminalResult } from "./todo"

export default makeScene2D(function* (view) {
	const code = createRef<Code>()

	view.fill("#111")

	view.add(
		<Code
			ref={code}
			{...styles.CODE}
			opacity={0}
			code={`\
public class CounterArgumentType extends ArgumentType<Integer> {
    public CounterArgumentType() {
        super(0);
    }

    @Override
    public Range getValueCountBounds() {
        return Range.NONE;
    }

    @Override
    public Range getUsageCountBounds() {
        return Range.AT_LEAST_ONE;
    }

    @Override
    public Integer parseValues(String[] values) {
        return this.getValue() + 1;
    }
}`}
		/>
	)

	yield* code().opacity(1, 0.5)

	yield* beginSlide("intro")

	const resultPreview = createRef<TerminalResult>()
	view.add(
		<TerminalResult
			ref={resultPreview}
			x={700}
			y={-100}
			opacity={0}
			fill={"#334"}
			command={"program -a 1 2 3"}
		></TerminalResult>
	)

	yield resultPreview().y(-170, 0.25)
	yield resultPreview().opacity(1, 0.25)
	yield code().x(-200, 0.5)
	yield* code().selection(lines(5, 8), 0.5)
	yield* resultPreview().command("program -a", 0.75)

	yield* beginSlide("highlight value count bounds")

	yield resultPreview().y(100, 0.5)
	yield* code().selection(lines(10, 14), 0.5)
	yield* resultPreview().command("program -a -a -a", 0.75)
	yield* beginSlide("highlight usage count bounds")

	yield code().selection(lines(15, 18), 0.5)
	yield* resultPreview().y(370, 0.5)

	const countTxts = createRefArray<Txt>()

	view.add(
		<>
			{range(3).map(i => (
				<Txt
					{...styles.TXT}
					fontSize={50}
					ref={countTxts}
					fill={"rgb(255,187,187)"}
					y={340}
					opacity={0}
					x={750 + i * 90}
					text={`${i + 1}`}
				></Txt>
			))}
		</>
	)

	yield* sequence(
		0.5,
		...countTxts.map(txt => all(txt.opacity(1, 0.25), txt.y(250, 0.5)))
	)
	yield* beginSlide("show counting")

	yield code().code.insert([17, 15], "(", 0.5)
	yield* code().code.insert([17, 34], ") * 2", 0.5)
	yield* waitFor(1)
	yield* sequence(
		0.5,
		...countTxts.map((txt, i) =>
			sequence(
				0.1,
				txt.scale(1.5, 0.25),
				txt.text(`${(i + 1) * 2}`, 0),
				txt.scale(1, 0.25)
			)
		)
	)
	yield* beginSlide("change template code")

	yield all(
		...countTxts.map(txt => txt.opacity(0, 0.25)),
		resultPreview().opacity(0, 0.25)
	)
	yield* code().selection(lines(1, 4), 0.5)
	yield* beginSlide("highlight ctor")
})
