import { makeProject } from "@motion-canvas/core"

import start from "./scenes/start?scene"
import todo from "./scenes/todo?scene"
import example from "./scenes/example?scene"
import exampleLanatEnum from "./scenes/example-lanat-enum?scene"
import exampleLanatTemplate from "./scenes/example-lanat-template?scene"
import exampleLanatMain from "./scenes/example-lanat-main?scene"
import errors from "./scenes/errors?scene"
import help from "./scenes/help?scene"
import types from "./scenes/types?scene"
import counterType from "./scenes/counterType?scene"

export default makeProject({
	scenes: [
		start,
		todo,
		example,
		exampleLanatEnum,
		exampleLanatTemplate,
		exampleLanatMain,
		errors,
		help,
		types,
		counterType,
	],
})
