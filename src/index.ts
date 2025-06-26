import { initialise } from "conductor/dist/conductor/runner/util/";
import { JsSlangEvaluator } from "./JsSlangEvaluator";

const {runnerPlugin, conduit} = initialise(JsSlangEvaluator);
