import { Img, Rect, Txt, makeScene2D } from "@motion-canvas/2d"

import logo from "../../images/logo.png"
import { styles } from "../styles"
import { Direction, beginSlide, slideTransition } from "@motion-canvas/core"

export default makeScene2D(function* (view) {
	view.add(
		<Rect y={-50}>
			<Img src={logo} height={250} />
			<Txt {...styles.TXT} text="Proyecto de Fin de Grado" y={150} />
		</Rect>
	)

	view.add(<Txt {...styles.TXT} text="David Losantos González" y={450} />)

	yield* slideTransition(Direction.Bottom, 0.5)
	yield* beginSlide("intro")
})
