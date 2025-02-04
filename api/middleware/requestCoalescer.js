export default class RequestCoalescer {
  constructor() {
    this.inFlightRequests = {};
  }

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
}
