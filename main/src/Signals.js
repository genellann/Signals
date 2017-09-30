/**
 * Created by Genell Radley in 2017.
 *
 * https://github.com/gradley/PhaserSignals
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
     * Get a signal by its key.
     * @param {string} key - The key mapped to a signal.
     */
    getSignal(key) {
        return (this._signals.hasOwnProperty(key)) ? this._signals[key] : null;
    }

    /**
     * Register a listener to a signal key.
     * @param {string} key - The key mapped to a signal. Be sure to use unique keys.
     * @param {function} listener - The function that will respond when this signal is dispatched.
     * @param {object} listenerContext - The context of the listener.
     * @param {boolean} [addOnce=false] - Remove signal after sent once.
     */
    registerSignal(key, listener, listenerContext, addOnce = false) {
        if (!this._signals.hasOwnProperty(key)) {
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
     * @param {string} key - The key mapped to a signal.
     * @param {ITargetObj|object} [targetObj=null] - An object you can pass to the listener function(s).
     */
    sendSignal(key, targetObj = null) {
        if (key === null || typeof key === "undefined") {
            console.log("Signals:: Attempted to dispatch a signal with an undefined or null key.");
        }
        else if (typeof key !== "string") {
            console.log("Signals:: Keys must be of type 'string'. Attempted to dispatch a signal with an invalid key: " + key);
        }
        else if (this._signals[key]) {
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
     * @param {string} [key=null] - The key mapped to the signal. If null, all signals for every key will be removed.
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
