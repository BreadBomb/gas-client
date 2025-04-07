import { State } from "./functions";

export enum MessageType {
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
  SCRIPT_HOST_FUNCTION_REQUEST = 'SCRIPT_HOST_FUNCTION_REQUEST',
  SCRIPT_HISTORY_FUNCTION_REQUEST = 'SCRIPT_HISTORY_FUNCTION_REQUEST',
  SCRIPT_HISTORY_CHANGE_RESPONSE = 'SCRIPT_HISTORY_CHANGE_RESPONSE',
}

export enum ResponseStatus {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export enum OriginType {
  GAS = 'GAS',
  APP = 'App',
}

export type GASStore = Record<
  string,
  {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
  }
>;

export interface GasScriptData {
  type: MessageType;
}

export interface DevServerRequest extends GasScriptData {
  id: string;
  args: unknown[];
  functionName: string;
  type: MessageType.REQUEST;
}

export interface DevServerResponse extends GasScriptData {
  id: string;
  response: unknown;
  status: ResponseStatus;
  type: MessageType.RESPONSE;
}

export interface DevServerScriptHostFunctionRequest extends GasScriptData {
  type: MessageType.SCRIPT_HOST_FUNCTION_REQUEST;
  functionName: string;
  args: unknown[];
}

export interface DevServerScriptHistoryFunctionRequest extends GasScriptData {
  type: MessageType.SCRIPT_HISTORY_FUNCTION_REQUEST;
  functionName: string;
  args: unknown[];
}

export interface DevServerScriptHistoryChangeResponse extends GasScriptData {
  type: MessageType.SCRIPT_HISTORY_CHANGE_RESPONSE;
  args: unknown[];
}

export interface DevServerContentWindow<Origin extends OriginType> extends Window {
  postMessage: {
    (
      message: Origin extends OriginType.GAS
        ? DevServerResponse | DevServerScriptHistoryChangeResponse
        : DevServerRequest | DevServerScriptHostFunctionRequest | DevServerScriptHistoryFunctionRequest,
      targetOrigin: string,
      transfer?: Transferable[]
    ): void;
    (message: any, options?: WindowPostMessageOptions): void;
  };
}

export type LocationChangeHandlerCallback = (event: { state: State; location: Location }) => void;

export interface AppWindow extends Window {
  parent: DevServerContentWindow<OriginType.APP>;
  gasStore: GASStore;
  locationChangeHandler: LocationChangeHandlerCallback
}

export interface DevServerRequestEvent extends MessageEvent {
  data: DevServerRequest;
}

export interface GASDevServerIFrame extends HTMLIFrameElement {
  contentWindow: DevServerContentWindow<OriginType.GAS>;
}
