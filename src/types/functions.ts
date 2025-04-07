type FunctionMap = Record<string, (...args: any[]) => any>;

type Promisified<F extends (...args: any[]) => any> = (...params: Parameters<F>) => Promise<ReturnType<F>>;

type RecognizedServerFunctions<R extends FunctionMap> = {
  [Name in keyof R]: Promisified<R[Name]>;
};

type UnrecognizedServerFunctions = {
  [key: string]: (...args: any[]) => Promise<any>;
};

type ServerFunctions<FM extends FunctionMap> = RecognizedServerFunctions<FM> & UnrecognizedServerFunctions;

type HostFunctions = {
  /**
   * Closes the current dialog or sidebar.
   */
  close: () => void;
  /**
   * Sets the height of the current dialog. Doesn't work in sidebars.
   * @param height the new height, in pixels
   */
  setHeight: (height: number) => void;
  /**
   * Sets the width of the current dialog. Doesn't work in sidebars.
   * @param width the new width, in pixels
   */
  setWidth: (width: number) => void;
  /**
   * Switches browser focus from the dialog or sidebar to the Google Docs, Sheets, or Forms editor.
   */
  focusEditor: () => void;
};

type State = object | null;
type Query = {
    [key: string]: string | readonly string[];
}

type UrlLocation = {
  /**
   * The string value of URL fragment after the # character, or an emptry string if no URL fragment is present
   */
  hash: string;

  /**
   * An object of key/value pairs that correspond to the URL request parameters.
   * Only the first value will be returned for parameters that have multiple values.
   * If no parameters are present, this will be an empty object.
   */
  parameter: { [key: string]: string };

  /**
   * An object similar to location.parameter, but with an array of values for each key.
   * If no parameters are present, this will be an empty object.
   */
  parameters: { [key: string]: readonly string[] };
}

type HistoryChangeEvent = {
  /**
   * The state object associated with the popped event.
   * This object is identical to the state object that used in the corresponding push() or replace() method that added the popped state to the history stack.
   */
  state: State;

  /**
   * A location object associated with the popped event
   */
  location: UrlLocation;
}

type HistoryFunctions = {
  /**
   * Pushes the provided state object, URL parameters and URL fragment onto the browser history stack.
   * @param stateObject An developer-defined object to be associated with a browser history event, and which resurfaces when the state is popped.
   * Typically used to store application state information (such as page data) for future retrieval.
   * @param params An object containing URL parameters to associate with this state.
   * For example, {foo: “bar”, fiz: “baz”} equates to "?foo=bar&fiz=baz".
   * Alternatively, arrays can be used: {foo: [“bar”, “cat”], fiz: “baz”} equates to "?foo=bar&foo=cat&fiz=baz".
   * If null or undefined, the current URL parameters are not changed. If empty, the URL parameters are cleared.
   * @param hash The string URL fragment appearing after the '#' character.
   * If null or undefined, the current URL fragment is not changed. If empty, the URL fragment is cleared.
   */
  push: (stateObject: State, params?: Query, hash?: string) => void;

  /**
   * Replaces the top event on the browser history stack with the provided (developer-defined) state object, URL parameters and URL fragment.
   * @param stateObject An developer-defined object to be associated with a browser history event, and which resurfaces when the state is popped.
   * Typically used to store application state information (such as page data) for future retrieval.
   * @param params An object containing URL parameters to associate with this state.
   * For example, {foo: “bar”, fiz: “baz”} equates to "?foo=bar&fiz=baz".
   * Alternatively, arrays can be used: {foo: [“bar”, “cat”], fiz: “baz”} equates to "?foo=bar&foo=cat&fiz=baz".
   * If null or undefined, the current URL parameters are not changed. If empty, the URL parameters are cleared.
   * @param hash The string URL fragment appearing after the '#' character.
   * If null or undefined, the current URL fragment is not changed. If empty, the URL fragment is cleared.
   */
  replace: (stateObject: State, params?: Query, hash?: string) => void;

  /**
   * Sets a callback function to respond to changes in the browser history.
   * @param callback a client-side callback function to run upon a history change event, using the event object as the only argument.
   */
  setChangeHandler: (handler: (event: HistoryChangeEvent) => void) => void;
}

export { FunctionMap, ServerFunctions, HostFunctions, HistoryFunctions, State, Query };
