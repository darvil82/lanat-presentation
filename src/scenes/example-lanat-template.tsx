import { Circle, Code, lines, makeScene2D, word } from "@motion-canvas/2d"
import {
	DEFAULT,
	Direction,
	all,
	beginSlide,
	createRef,
	range,
	slideTransition,
	waitFor,
} from "@motion-canvas/core"

/*
@Command.Define
public class App extends CommandTemplate {
    @Argument.Define(required = true, positional = true)
    public double a;

    @Argument.Define(required = true, positional = true)
    public double b;

    @Argument.Define
    public Operation op;

    @InitDef
    public static void beforeInit(CommandBuildContext ctx) {
        ctx.argWithType("op", new EnumArgumentType<>(Operation.ADD))
            .onOk(value -> System.out.println("operation explicitly set to " + value));
    }
}
*/

export default makeScene2D(function* (view) {
	const code = createRef<Code>()

	view.add(
		<Code
			ref={code}
			code={`\
public class Program { }`}
		/>
	)

	yield* slideTransition(Direction.Bottom, 0.5)
	yield* beginSlide("intro")

	yield code().code.insert([0, 0], "@Command.Define\n", 0.25)
	yield* code().code.insert([0, 20], " extends CommandTemplate", 0.25)
	yield* beginSlide("cmd define")

	yield* code().code.insert(
		[1, 47],
		`\

    public int a;

    public int b;

    public Operation op;
`,
		0.5
	)
	yield* beginSlide("prop define")

	yield* all(
		...range(3).map(i =>
			code().code.insert(
				[i * 2 + 2, 0],
				`\
    @Argument.Define
`,
				0.25
			)
		)
	)

	yield* beginSlide("arg define")

	yield code().scale(1.25, 0.25)
	yield* code().selection(lines(2, 7), 0.25)
	yield* beginSlide("highlight args")

	yield* all(
		...range(2).map(i =>
			code().code.insert(
				[i * 3 + 2, 20],
				"(type = IntegerArgumentType.class)",
				0.25
			)
		)
	)
	yield* code().selection(
		code().findAllRanges(/(int )|(type = .*\.class)/gi),
		0.25
	)

	yield* beginSlide("show argtype")

	yield code().code.replace(word(3, 11, 3), "double", 0.25)
	yield code().code.replace(word(6, 11, 3), "double", 0.25)
	yield code().code.replace(word(2, 28, 7), "Double", 0.25)
	yield code().code.replace(word(5, 28, 7), "Double", 0.25)
	yield* waitFor(0.15)
	yield* code().selection(
		code().findAllRanges(/(double )|(type = .*\.class)/gi),
		0.25
	)

	yield* beginSlide("change to double")

	yield code().selection(DEFAULT, 0.25)
	yield code().code.remove(word(2, 20, 33), 0.25)
	yield* code().code.remove(word(5, 20, 33), 0.25)

	yield* beginSlide("remove argtype")

	yield* code().selection(lines(8, 9), 0.25)

	yield* beginSlide("highlight operation arg")

	yield code().selection(DEFAULT, 0.25)
	yield* code().code.insert(
		[10, 0],
		`\

    @InitDef
    public static void beforeInit(CommandBuildContext ctx) {
        ctx.argWithType("op", new EnumArgumentType<>(Operation.ADD));
    }
`,
		0.25
	)

	yield* beginSlide("initdef")

	yield* code().selection(code().findAllRanges(/"?op"?/g), 0.25)
	yield* beginSlide("highlight op")

	yield* code().selection(
		code().findAllRanges(/(new Enum.*(?=\);))|(Operation)/gi),
		0.25
	)
	yield* beginSlide("highlight EnumArgumentType")

	yield code().scale(1, 0.25)
	yield* code().selection(DEFAULT, 0.25)
	yield* beginSlide("scale down")

	yield* all(
		...range(2).map(i =>
			code().code.insert([i * 3 + 2, 20], "(required = true)", 0.25)
		)
	)

	yield* beginSlide("set required")
})
