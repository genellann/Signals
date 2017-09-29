/**
 * Created by Genell Radley in 2017.
 *
 * https://github.com/gradley/PhaserSignals
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