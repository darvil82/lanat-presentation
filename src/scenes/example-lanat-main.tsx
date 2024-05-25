import { Code, Rect, Txt, lines, makeScene2D } from "@motion-canvas/2d"
import {
	Direction,
	all,
	beginSlide,
	chain,
	createRef,
	slideTransition,
	waitFor,
} from "@motion-canvas/core"
import { styles } from "../styles"

/*
void main(String[] args) {
    var result = ArgumentParser.parseFromInto(App.class, args);

    System.out.printf(
        "%.2f %s %.2f = %.2f%n",
        result.a, result.op, result.b, result.op.execute(result.a, result.b)
    );
}
*/

export const TEMPLATE_CODE = `\
@Command.Define
public class App extends CommandTemplate {
    @Argument.Define(required = true)
    public double a;

    @Argument.Define(required = true)
    public double b;

    @Argument.Define
    public Operation op;
}`

export default makeScene2D(function* (view) {
	const code = createRef<Code>()
	const templateCode = createRef<Code>()
	const templateCodeRect = createRef<Rect>()

	view.add(
		<>
			<Code ref={templateCode} opacity={0} y={100} code={TEMPLATE_CODE} />

			<Rect
				ref={templateCodeRect}
				fill="#111"
				y={1500}
				height={700}
				width={2560}
				shadowColor={"#22222f"}
				shadowOffsetY={-70}
				shadowBlur={50}
			></Rect>

			<Code
				ref={code}
				code={`\
void main(String[] args) {

}`}
			/>
		</>
	)

	yield* slideTransition(Direction.Right, 0.5)
	yield* beginSlide("intro")

	yield code().code.insert(
		[1, 0],
		`\
    ArgumentParser.parseFromInto();`,
		0.25
	)
	yield* code().scale(1.2, 0.25)
	yield* beginSlide("parse args")

	yield* code().code.insert([1, 33], "Program.class", 0.25)
	yield* beginSlide("put arg 1")

	yield* code().code.insert([1, 46], ", args", 0.25)
	yield* beginSlide("put arg 2")

	yield* code().code.insert([1, 4], "var result = ", 0.25)
	yield* beginSlide("put var result")

	yield templateCodeRect().y(400, 0.25)
	yield chain(
		waitFor(0.1),
		all(templateCode().opacity(1, 0.25), templateCode().y(0, 0.25))
	)
	yield* code().y(400, 0.25)
	yield* waitFor(0.15)
	yield* beginSlide("show template")

	yield* code().code.insert(
		[2, 0],
		`\

    result.op
`,
		0.25
	)
	yield templateCode().selection(lines(8, 10), 0.25)
	yield* templateCode().y(-400, 0.5)
	yield* code().code.insert([3, 13], ".execute()", 0.25)
	yield* beginSlide("show op.execute")

	yield* code().code.insert([3, 22], "result.a", 0.25)
	yield templateCode().selection(lines(2, 4), 0.25)
	yield* templateCode().y(0, 0.5)
	yield* beginSlide("show result.a")

	yield* code().code.insert([3, 30], ", result.b", 0.25)
	yield templateCode().selection(lines(5, 7), 0.25)
	yield* templateCode().y(-100, 0.5)
	yield* beginSlide("show result.b")

	yield templateCodeRect().y(0, 0.5)
	yield code().y(0, 0.5)
	yield* templateCodeRect().height(1440, 0.5)

	yield* waitFor(0.25)

	yield code().code.insert([3, 4], "System.out.println(", 0.25)
	yield* code().code.insert([3, 41], ")", 0.25)
	yield* beginSlide("show full template")
})
