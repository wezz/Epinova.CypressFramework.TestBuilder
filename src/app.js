
import optionPrompt from "./prompt.js";
import createTest from "./createTest.js";

export default async function app(){
	const options = await optionPrompt();
	if (options){
		createTest(options)
	}
}
