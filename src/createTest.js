import fs from "fs";
import createTestHelper from "./createTestHelper.js";
export default function createTest(options)
{
	let { fixtureContent, testContent } = createTestHelper.getTemplateContent();

	fixtureContent = createTestHelper.compileFixture(fixtureContent, options);
	testContent = createTestHelper.compileTest(testContent, options);

	createTestHelper.saveFixture(fixtureContent, options);
	createTestHelper.saveTest(testContent, options);

	return async () => {
		console.log('Done creating test')
	} ;
}
