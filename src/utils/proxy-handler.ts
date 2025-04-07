import { v4 as uuidv4 } from 'uuid';
import { AppWindow, LocationChangeHandlerCallback, MessageType } from '../types/dev-server';

declare const window: AppWindow;

const proxyHandlerServerFunction = (
  target: unknown,
  functionName: string
): ((...args: unknown[]) => Promise<unknown>) => {
  const id = uuidv4();
  const promise = new Promise((resolve, reject) => {
    window.gasStore[id] = { resolve, reject };
  });
  return (...args: unknown[]) => {
    window.parent.postMessage(
      {
        type: MessageType.REQUEST,
        id,
        functionName,
        args: [...args],
      },
      '*'
    );
    return promise;
  };
};

const proxyHandlerScriptHostFunction = (target: unknown, functionName: string): ((...args: unknown[]) => void) => {
  return (...args: unknown[]) => {
    window.parent.postMessage(
      {
        type: MessageType.SCRIPT_HOST_FUNCTION_REQUEST,
        functionName,
        args: [...args],
      },
      '*'
    );
  };
};

const proxyHandlerScriptHistoryFunction = (target: unknown, functionName: string): ((...args: unknown[]) => void) => {
  return (...args: unknown[]) => {

    if (functionName === "setChangeHandler") {
      console.log("set change handler");
      
      window.locationChangeHandler = args[0] as LocationChangeHandlerCallback;
      return;
    }

    console.log(functionName, [...args]);
    

    window.parent.postMessage(
      {
        type: MessageType.SCRIPT_HISTORY_FUNCTION_REQUEST,
        functionName,
        args: [...args],
      },
      '*'
    );
  };
};

export { proxyHandlerServerFunction, proxyHandlerScriptHostFunction, proxyHandlerScriptHistoryFunction };
