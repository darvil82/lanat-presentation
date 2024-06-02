import { Code, Rect, Txt, lines, makeScene2D } from "@motion-canvas/2d"
import {
	DEFAULT,
	Direction,
	beginSlide,
	createRef,
	createSignal,
	makeRef,
	slideTransition,
} from "@motion-canvas/core"

/*
void main(String[] args) {
    Integer a = null, b = null;
    String op = "add";

    for (int i = 0; i < args.length; i++) {
        switch (args[i]) {
            case "-a" -> a = Integer.parseInt(args[++i]);
            case "-b" -> b = Integer.parseInt(args[++i]);
            case "-op" -> op = args[++i].toLowerCase();
            default -> System.err.println("Invalid value: " + args[i]);
        }
    }

    if (a == null || b == null) {
        System.err.println("a and b are both required.");
        return;
    }

    int res; switch (op) {
        case "subtract" -> res = a - b;
        case "multiply" -> res = a * b;
        case "divide" -> res = a / b;
        case "add" -> res = a + b;
        default -> {
            System.err.println("Invalid operation: " + op);
            return;
        }
    };

    System.out.println(res);
}
*/

export default makeScene2D(function* (view) {
	const code = createRef<Code>()
	const wrapper = createRef<Rect>()
	const errorRect = createRef<Rect>()

	view.add(
		<Rect ref={wrapper}>
			<Rect
				ref={errorRect}
				fill="#15161d"
				y={-430}
				height={525}
				width={4000}
				opacity={0}
			></Rect>
			<Code
				ref={code}
				code={`\
void main(String[] args) {

}`}
			/>
		</Rect>
	)

	yield* slideTransition(Direction.Right, 0.5)
	yield* beginSlide("show code")

	const showNextDuration = 0.25

	yield* code().code.insert(
		[1, 0],
		`\
    Integer a = null, b = null;
    String op = "add";`,
		showNextDuration
	)
	yield* beginSlide("show vars")

	yield* code().code.insert(
		[3, 0],
		`\

    for (int i = 0; i < args.length; i++) {
        switch (args[i]) {

        }
    }
`,
		showNextDuration
	)
	yield* beginSlide("show loop")

	yield* code().code.insert(
		[6, 0],
		`\
            case "-a" -> a = Integer.parseInt(args[++i]);
            case "-b" -> b = Integer.parseInt(args[++i]);`,
		showNextDuration
	)
	yield* beginSlide("show -a -b")

	yield* code().code.insert(
		[8, 0],
		`\
            case "-op" -> op = args[++i].toLowerCase();
`,
		showNextDuration
	)
	yield* beginSlide("show -op")

	yield* code().code.insert(
		[9, 0],
		`\
            default -> System.err.println("Invalid value: " + args[i]);
`,
		showNextDuration
	)
	yield* beginSlide("show default")

	yield* code().code.insert(
		[12, 0],
		`\

    if (a == null || b == null) {
        System.err.println("a and b are both required.");
        return;
    }
`,
		showNextDuration
	)
	yield* beginSlide("show check")

	yield code().code.insert(
		[17, 0],
		`\

    int res; switch (op) {
        case "add" -> res = a + b;
        case "subtract" -> res = a - b;
        case "multiply" -> res = a * b;
        case "divide" -> res = a / b;
    };
`,
		showNextDuration
	)
	yield* wrapper().y(-250, showNextDuration)
	yield* beginSlide("show switch")

	yield* code().code.insert(
		[23, 0],
		`\
        default -> {
            System.err.println("Invalid operation: " + op);
            return;
        }
`,
		showNextDuration
	)
	yield* beginSlide("show default switch")

	yield* code().code.insert(
		[28, 0],
		`\

    System.out.println(res);
`,
		showNextDuration
	)
	yield* beginSlide("show print")

	yield wrapper().y(0, 0.5)
	yield* wrapper().scale(0.75, 0.5)
	yield* beginSlide("zoom out")

	// -------------------------------- ERRORS--------------------------------

	yield* errorRect().opacity(1, 0.25)
	yield wrapper().y(500, 0.5)
	yield code().selection(lines(4, 11), 0.25)
	yield* wrapper().scale(1.25, 0.5)

	const errorText = createSignal<string>("")
	const errorTextRect = createRef<Rect>()

	view.add(
		<Rect
			ref={errorTextRect}
			fill={"#e78282"}
			layout
			y={290}
			padding={30}
			radius={20}
			opacity={0}
		>
			<Txt
				fill={"#222"}
				fontWeight={900}
				text={errorText}
				paddingTop={10}
			></Txt>
		</Rect>
	)

	yield* beginSlide("show errors")

	yield code().selection(code().findAllRanges(/Integer\.parseInt/gi), 0.25)
	yield errorTextRect().opacity(1, 0.25)
	yield* errorText("NumberFormatException", 0.25)
	yield* beginSlide("show parseInt")

	yield code().selection(code().findAllRanges(/args\[\+\+i\]/gi), 0.25)
	yield* errorText("IndexOutOfBoundsException", 0.25)
	yield* beginSlide("show increment")

	yield errorTextRect().opacity(0, 0.25)
	yield* code().selection(DEFAULT, 0.25)

	yield errorRect().height(750, 0.5)
	yield errorRect().y(-310, 0.5)
	yield* code().y(-800, 0.5)
	yield* code().selection(lines(17, 29), 0.25)
	yield* beginSlide("show errors 2")

	yield errorRect().opacity(0, 0.25)
	yield* errorRect().height(0, 0.25)
})
