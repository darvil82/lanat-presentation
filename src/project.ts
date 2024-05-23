import { makeProject } from "@motion-canvas/core"

import start from "./scenes/start?scene"
import todo from "./scenes/todo?scene"
import example from "./scenes/example?scene"
import exampleLanatEnum from "./scenes/example-lanat-enum?scene"
import exampleLanatTemplate from "./scenes/example-lanat-template?scene"
import exampleLanatMain from "./scenes/example-lanat-main?scene"
import conclusion from "./scenes/conclusion?scene"

export default makeProject({
	scenes: [
		start,
		todo,
		example,
		exampleLanatEnum,
		exampleLanatTemplate,
		exampleLanatMain,
		conclusion,
	],
})
