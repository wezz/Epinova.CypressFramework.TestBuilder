import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dirs = {
	templates: path.join(__dirname, "../", "template"),
	current: path.resolve('')
}
const files = {
	templatefixture: path.join(dirs.templates, 'template.fixture.js'),
	templatetest: path.join(dirs.templates, 'template.spec.js'),
}

function getTemplateContent (options)
{
	let fixtureContent = '';
	let testContent = '';
	if (fs.existsSync(files.templatefixture))
	{
		fixtureContent = fs.readFileSync(files.templatefixture, {encoding: 'utf8'});
	}
	if (fs.existsSync(files.templatetest))
	{
		testContent = fs.readFileSync(files.templatetest, {encoding: 'utf8'});
	}
	return { fixtureContent, testContent };
}

function NameToFileName(name){
	if (!name){
		return '';
	}
	name = name.toLowerCase().replace(/\s/g, "-");
	return name
}

const CapitalizeFirstLetter = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();

function UrlToRelative(url = ''){
	url = url.trim();
	if (url.indexOf('/') === 0){
		return url;
	}
	url = url.substr(8, url.length)
	url = url.substr(url.indexOf('/'), url.length);
	
	return url;
}

function compileFixture(content, options){
	content = content.replace("[NAME]", options.name);
	content = content.replace("[URL]", UrlToRelative(options.url));
	content = content.replace("[SELECTOR]", options.selector);
	return content;
}
function compileTest(content, options){
	const fixtureFilename = `${NameToFileName(options.name)}.fixture`;
	const typeName = CapitalizeFirstLetter(options.testtype);
	content = content.replace("import component", `import ${options.testtype}`);
	content = content.replace("template.fixture", fixtureFilename);
	content = content.replace("COMPONENTTYPE:", `${typeName}:`);
	content = content.replace("COMPONENTTYPE exists", typeName);
	content = content.replace("(component)", `(${options.testtype})`);
	content = content.replace("component.elements", `${options.testtype}.elements`);
	return content;
}

function saveFixture(content, options){
	const filename = NameToFileName(options.name) + ".fixture.js";
	const filepathfolder = path.join(dirs.current, 'IntegrationTests');
	SaveFile(filepathfolder, filename, content);
}
function saveTest(content, options){
	const filename = NameToFileName(options.name) + ".spec.js";
	const filepathfolder = path.join(dirs.current, 'IntegrationTests');
	SaveFile(filepathfolder, filename, content);
}

function SaveFile(filepathfolder, filename, content)
{
	const filepath = path.join(filepathfolder, filename);
	if (fs.existsSync(filepath))
	{
		console.warn('File exists! Aborted file write', filepathfolder, filename);
		return;
	}
	if (!fs.existsSync(filepathfolder))
	{
		fs.mkdirSync(filepathfolder);

	}
	fs.writeFileSync(filepath, content, {encoding: 'utf8'});
}

export default {
	getTemplateContent,
	compileFixture,
	compileTest,
	saveFixture,
	saveTest
}