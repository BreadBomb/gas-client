import { proxyHandlerScriptHistoryFunction } from '../utils/proxy-handler';
import { HistoryFunctions } from '../types/functions';
import { ScriptHistoryProvider } from './script-history-provider';
import { checkAllowList } from '../utils/check-allow-list';
import { AppWindow, MessageType } from '../types/dev-server';
import { ServerConfig } from '../types/config';

declare const window: AppWindow;

class ScriptHistoryProxy extends ScriptHistoryProvider {
  constructor(private _config?: ServerConfig) {
    super();
    window.addEventListener('message', this.buildHistoryChangeListener(), false);
    this._historyFunctions = new Proxy({}, { get: proxyHandlerScriptHistoryFunction }) as HistoryFunctions;
  }

  private buildHistoryChangeListener(): (event: MessageEvent) => void {    
    return (event: MessageEvent) => {
      console.log("history", event);
      const allowOrigin = checkAllowList(event.origin, this._config?.allowedDevelopmentDomains);
      if (!allowOrigin || event.data.type !== MessageType.SCRIPT_HISTORY_CHANGE_RESPONSE) return;

      const { response } = event.data;
      if (window.locationChangeHandler != null) {
        window.locationChangeHandler(response);
      }
    };
  }
}

export { ScriptHistoryProxy };
