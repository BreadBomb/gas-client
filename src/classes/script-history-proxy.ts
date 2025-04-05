import { proxyHandlerScriptHistoryFunction } from '../utils/proxy-handler';
import { HistoryFunctions } from '../types/functions';
import { ScriptHistoryProvider } from './script-history-provider';

class ScriptHistoryProxy extends ScriptHistoryProvider {
  constructor() {
    super();
    this._historyFunctions = new Proxy({}, { get: proxyHandlerScriptHistoryFunction }) as HistoryFunctions;
  }
}

export { ScriptHistoryProxy };
