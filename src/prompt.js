import inquirer from "inquirer";
export default function optionPrompt (){
	
	const questions = [
		{
			name: "testtype",
			message: "Which name should we use to prefix the test?",
			type: 'list',
			choices:["Component", "Page", "Block", "Blank (No prefix)"],
			default: "Component"
		},
		{
			name: "name",
			message: "What should the test be called? (Will be used for creating the filename)	",
			default: "Generic component"
		},
		{
			name: "url",
			message: "Which URL is relevant for the test",
			default: null
		},
		{
			name: "selector",
			message: "Enter the relevant initial selector of the test",
			default: null
		}
	];
	
	return inquirer.prompt(questions);
}
