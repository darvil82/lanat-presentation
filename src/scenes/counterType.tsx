import { Code, makeScene2D } from "@motion-canvas/2d"
import { styles } from "../styles"
import {
	Direction,
	beginSlide,
	createRef,
	slideTransition,
} from "@motion-canvas/core"

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
})
