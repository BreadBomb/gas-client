import { ScriptHistoryProvider } from './script-history-provider';
import { ScriptHostProvider } from './script-host-provider';

class ScriptHistoryFunctions extends ScriptHistoryProvider {
  constructor() {
    super();
    this.initializeScriptHostFunctions();
  }

  private initializeScriptHostFunctions(): void {
    this._historyFunctions = {
      push: google.script.history.push,
      replace: google.script.history.replace,
      setChangeHandler: google.script.history.setChangeHandler,
    };
  }
}

export { ScriptHistoryFunctions };
