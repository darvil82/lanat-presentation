import { Img, Rect, Txt, makeScene2D } from "@motion-canvas/2d"

import logo from "../../images/logo.png"
import { styles } from "../styles"
import {
	Direction,
	beginSlide,
	createRef,
	slideTransition,
	waitFor,
} from "@motion-canvas/core"
import qrWeb from "../../images/qr-web.png"
import qrDocs from "../../images/qr-docs.png"
import qrRepo from "../../images/qr-repo.png"

function Link({ qr, label }: { qr: string; label: string }) {
	return (
		<Rect layout direction={"column"} alignItems={"center"} gap={25}>
			<Img src={qr} width={225} />
			<Txt text={label} fontWeight={900} {...styles.TXT} />
		</Rect>
	)
}

export default makeScene2D(function* (view) {
	const logoAndName = createRef<Rect>()
	const links = createRef<Rect>()

	view.add(
		<>
			<Rect ref={logoAndName}>
				<Rect y={-50}>
					<Img src={logo} height={250} />
					<Txt
						{...styles.TXT}
						text="Proyecto de Fin de Grado"
						y={150}
					/>
				</Rect>
				<Txt {...styles.TXT} text="David Losantos González" y={450} />
			</Rect>
			<Rect
				ref={links}
				y={1100}
				radius={50}
				fill="#111"
				layout
				width={1500}
				height={750}
				padding={75}
				justifyContent={"center"}
				gap={100}
			>
				<Link qr={qrWeb} label="Página web" />
				<Link qr={qrDocs} label="Documentación" />
				<Link qr={qrRepo} label="Repositorio" />
			</Rect>
		</>
	)

	yield* slideTransition(Direction.Bottom, 0.5)

	yield* waitFor(1)
	yield links().y(650, 0.5)
	yield* logoAndName().y(-300, 0.5)
	yield* waitFor(1)

	yield* beginSlide("intro")
})
