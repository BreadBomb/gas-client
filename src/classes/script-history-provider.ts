import { HistoryFunctions } from '../types/functions';

abstract class ScriptHistoryProvider {
  protected _historyFunctions = {} as HistoryFunctions;

  get historyFunctions(): HistoryFunctions {
    return this._historyFunctions;
  }
}

export { ScriptHistoryProvider };
