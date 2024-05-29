import { Camera, Code, Img, Rect, makeScene2D } from "@motion-canvas/2d"
import { TEMPLATE_CODE } from "./example-lanat-main"
import {
	DEFAULT,
	Direction,
	beginSlide,
	createRef,
	slideTransition,
} from "@motion-canvas/core"

import help1 from "../../images/help1.png"

export default makeScene2D(function* (view) {
	const cam = createRef<Camera>()
	const rect = createRef<Rect>()
	const rect2 = createRef<Rect>()
	const code = createRef<Code>()
	const code2 = createRef<Code>()

	view.add(
		<Camera ref={cam}>
			<Img src={help1} width={2000} />
			<Rect
				ref={rect}
				fill="#111"
				y={1500}
				x={500}
				height={1300}
				width={3500}
				rotation={-7}
			>
				<Code ref={code} y={-115} code={TEMPLATE_CODE} />
			</Rect>
			<Rect
				ref={rect2}
				fill="#334"
				y={-750}
				x={300}
				height={800}
				width={5000}
				rotation={5}
				opacity={0}
			>
				<Code
					ref={code2}
					code={`\
public class MyTag extends Tag {
    @Override
    protected String parse(NamedWithDescription user, String value) {
        return "My name is " + user.getName()
            + (value == null ? "" : " and I say " + value)
            + "!";
    }
}`}
				/>
			</Rect>
		</Camera>
	)

	yield* slideTransition(Direction.Bottom, 0.5)
	yield* rect().y(1200, 0.5)
	yield* beginSlide("intro")

	yield cam().rotation(rect().rotation, 0.75)
	yield* cam().position([500, 900], 0.75)

	yield code().code.insert(
		[0, 15],
		`\
(
    description = "A simple app that performs a mathematical "
        + "operation on two numbers."
)`,
		0.25
	)
	yield* code().code.insert(
		[8, 20],
		`\
(
        description = "The operation to perform with "
            + "<link=args.a> and <link=args.b>. <desc=!.type>"
    )`,
		0.25
	)

	yield* beginSlide("show more code")

	yield* code().selection(code().findAllRanges(/<[a-z]+=[a-z\.!]+>/gi), 0.25)

	yield* beginSlide("highlight tags")

	yield rect2().opacity(1)
	// yield* code().selection(DEFAULT, 0.25)

	yield cam().rotation(rect2().rotation, 1.25)
	yield* cam().centerOn(rect2(), 1.25)

	yield* beginSlide("show tag code")
})
