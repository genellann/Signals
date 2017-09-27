/**
 * Created by gradley on 1/9/2017.
 */

/**
 * @interface ISignals
 */
class ISignals {

  registerSignal(key, listener, listenerContext) {
  }

  sendSignal(key, targetObj) {
  }

  removeSignal(key, listener, context) {
  }

  removeAllSignals(key) {
  }
}

export default ISignals;