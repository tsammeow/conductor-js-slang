import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import { Context, createContext, runInContext } from "js-slang";
import { Chapter, Value, Variant } from "js-slang/dist/types";

export class JsSlangEvaluator extends BasicEvaluator {
    private ctx: Context;

    async evaluateChunk(chunk: string): Promise<void> {
        const res = await runInContext(chunk, this.ctx);
        if (res.status === "error") {
            console.error(res);
        } else {
            this.ctx = res.context;
            if (res.status === "finished") return res.value;
        }
    }

    constructor(conductor: IRunnerPlugin) {
        super(conductor);

        const rawDisplay = (value: Value, str: string, _externalContext: any) => {
            this.conductor.sendOutput((str === undefined ? '' : str + ' ') + String(value));
            return value;
        };

        this.ctx = createContext(Chapter.SOURCE_4, Variant.DEFAULT, undefined, [], undefined, {
            rawDisplay: rawDisplay,
            prompt: rawDisplay,
            alert: rawDisplay,
            visualiseList: (_v: Value) => {
            throw new Error('List visualizer is not enabled')
            }
        });

        console.log("Evaluator initialised!");
    }
}
