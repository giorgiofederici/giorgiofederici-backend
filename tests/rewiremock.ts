// rewiremock.es6.js
import rewiremock, { plugins } from 'rewiremock';
/// settings
rewiremock.overrideEntryPoint(module); // this is important
// and all stubs should be used. Lets make it default!
rewiremock.addPlugin(plugins.usedByDefault);
export { rewiremock };
