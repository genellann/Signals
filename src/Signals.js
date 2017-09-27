/**
 * Created by Genell Radley on 12/6/16.
 */

import ISignals from "./ISignals";
import IDestructable from "./IDestructable";
import ITargetObj from "./ITargetObj";
let Phaser = require("../lib/phaser.min");

/**
 * Register your listener to a signal key.
 * Send a signal from anywhere.
 * @implements ISignals
 * @implements IDestructable
 */
class Signals /* implements ISignals, IDestructable */ {

  /**
   * A new Signals class creates a new mapping for signal keys.
   */
  constructor() {
    this._signals = {};
  }

  /**
   * Register a listener to a signal key.
   * TODO: check for unique keys. https://spingames.atlassian.net/browse/GR-230
   * @param {string} key - The key mapped to a signal. Be careful to use unique
   *     keys. No type checking yet so your signal will replace another if it
   *     is not unique.
   * @param {function} listener - The function that will respond when this
   *     signal is dispatched.
   * @param {object} listenerContext - The context of the listener.
   * @param {boolean} [addOnce=false] - Remove signal after sent once.
   */
  registerSignal(key, listener, listenerContext, addOnce) {
    if (!this._signals[key]) {
      this._signals[key] = new Phaser.Signal();
    }
    if (addOnce) {
      this._signals[key].addOnce(listener, listenerContext);
    } else {
      this._signals[key].add(listener, listenerContext);
    }
  }

  /**
   * Dispatch the signal mapped to this key.
   * TODO: Notify engineer if key does not exists in console.
   * @param {string} key - The key mapped to a signal.
   * @param {ITargetObj|object} [targetObj] - An object you can pass from where
   *     the signal is sent to the listener function.
   */
  sendSignal(key, targetObj) {
    if (this._signals[key]) {
      if (key !== "tick") {
        console.log("signal sent: " + key);
        if (typeof targetObj !== "undefined") {
          console.log("with obj: ", targetObj);
        }
      }
      if (typeof key === "undefined") {
        console.log("an undefined signal was sent out.");
      }
      this._signals[key].dispatch(targetObj);
    }
  }

  /**
   * Remove a listener from a signal.
   * @param {string} key - The key mapped to the signal.
   * @param {function} listener - The listener mapped to the signal.
   * @param {object} context - The context of the listener mapped to the signal.
   */
  removeSignal(key, listener, context) {
    if (this._signals[key]) {
      this._signals[key].remove(listener, context);
    }
  }

  /**
   * Remove all listeners from a signal.
   * @param {string} [key=null] - The key mapped to the signal. If null, all
   *     signals for every key will be removed.
   */
  removeAllSignals(key = null) {
    if (key === null) {
      for (key in this._signals) {
        if (this._signals.hasOwnProperty(key)) {
          this._signals[key].removeAll();
          delete this._signals[key];
        }
      }
    } else {
      if (this._signals.hasOwnProperty(key)) {
        this._signals[key].removeAll();
        delete this._signals[key];
      }
    }
  }

  destroy() {
    this.removeAllSignals();
    this._signals = null;
  }
}

export default Signals;