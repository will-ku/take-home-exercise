export default class RequestCoalescer {
  constructor() {
    this.inFlightRequests = {};
  }

  /**
   * Executes a function and caches the result.
   * @param {string} key - The key of the request.
   * @param {function} executableFunction - The function to execute.
   * @returns {Promise<any>} The result of the function execution.
   */
  async getOrExecute(key, executableFunction) {
    if (key in this.inFlightRequests) {
      return this.inFlightRequests[key];
    }

    const promise = executableFunction();
    this.inFlightRequests[key] = promise;

    try {
      const result = await promise;
      return result;
    } catch (e) {
      console.error(`Something went wrong when executing for ${key}`, e);
      throw e;
    } finally {
      delete this.inFlightRequests[key];
    }
  }

  /**
   * Waits for a request to finish, if it is in flight.
   * @param {string} key - The key of the request to wait for.
   */
  async awaitRequest(key) {
    if (key in this.inFlightRequests) {
      await this.inFlightRequests[key];
    }
  }
}
