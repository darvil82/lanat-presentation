import { Code, Rect, makeScene2D } from "@motion-canvas/2d"
import {
	Direction,
	beginSlide,
	createRef,
	easeInOutBack,
	easeInOutQuad,
	makeRef,
	slideTransition,
} from "@motion-canvas/core"
import { styles } from "../styles"

const CODE_OLD = `\
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
}`

const CODE_OLD_AFTER = `\
public class Program {
    public void main(String[] args) {
        Double a = null, b = null;
        String op = "add";

        for (int i = 0; i < args.length; i++) {
            try {
                switch (args[i]) {
                    case "-a" -> a = Double.parseDouble(args[++i]);
                    case "-b" -> b = Double.parseDouble(args[++i]);
                    case "-op" -> op = args[++i].toLowerCase();
                    case "-h", "--help" -> printHelp();
                    default -> System.err.println("Invalid value: " + args[i]);
                }
            } catch (NumberFormatException ignored) {
                System.err.println("Invalid double value: " + args[i])
            } catch (IndexOutOfBoundsException ignored) {
                System.out.println("No value specified for " + args[i-1]);
            }
        }

        final var errors = new ArrayList<String>();

        if (a == null)
            errors.add("a is not specified");

        if (b == null)
            errors.add("b is not specified");

        int res; switch (op) {
            case "subtract" -> res = a - b;
            case "multiply" -> res = a * b;
            case "divide" -> res = a / b;
            case "add" -> res = a + b;
            default -> errors.add("Invalid operation: " + op)
        };

        if (!errors.isEmpty()) {
            errors.forEach(System.err::println);
            return;
        }

        System.out.println(res);
    }

    private static void printHelp() {
        System.out.println("""
        program:

            -a Double -b Double -op (ADD | SUBTRACT | MULTIPLY | DIVIDE)"""
        );
    }
}`

const CODE_NEW = `\
@Command.Define
public class Program extends CommandTemplate {
    @Argument.Define(required = true)
    public double a;

    @Argument.Define(required = true)
    public double b;

    @Argument.Define
    public Operation op;

    public static void main(String[] args) {
        var result = ArgumentParser.parseFromInto(App.class, args);

        System.out.println(result.op.execute(result.a, result.b))
    }
}


public enum Operation {
    @EnumArgumentType.Default
    ADD,
    SUBTRACT,
    MULTIPLY,
    DIVIDE;

    double execute(double a, double b) {
        return switch (this) {
            case ADD -> a + b;
            case SUBTRACT -> a - b;
            case MULTIPLY -> a * b;
            case DIVIDE -> a / b;
        };
    }
}`

export default makeScene2D(function* (view) {
	const codeOld = createRef<Code>()
	const codeNew = createRef<Rect>()

	view.add(
		<Rect layout gap={100} scale={0.6} alignItems={"center"}>
			<Code {...styles.CODE} ref={codeOld} code={CODE_OLD} opacity={0} />
			<Rect
				fill="#111"
				padding={50}
				radius={50}
				opacity={0}
				ref={codeNew}
			>
				<Code {...styles.CODE} code={CODE_NEW} />
			</Rect>
		</Rect>
	)

	yield* slideTransition(Direction.Right, 1)
	yield codeOld().opacity(1, 0.5)
	yield* codeNew().opacity(1, 0.5)
	yield* beginSlide("intro")

	yield codeOld().code(CODE_OLD_AFTER, 1.5)
	yield* codeOld().margin([0, 0, -700, 0], 1.5)
	yield* codeOld().margin([0, 0, 700, 0], 5)
	yield* beginSlide("update old")
})
