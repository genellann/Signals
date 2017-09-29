/**
 * Created by Genell Radley in 2017.
 *
 * https://github.com/gradley/PhaserSignals
 */

"use strict";

class Game extends Phaser.Game {

    constructor() {
        super();

        this.game.signals = new Signals();

        this.testRegisterSignal();
        this.testPassObj();
        this.testAddOnce();
        this.testRemoveSignal();
        this.testRemoveAllOnOneSignal();
        this.testRemoveAll();
    }

    testAddOnce() {
        console.log("Running Test: addOnce");

        this.game.signals.registerSignal("addOnce", () => {
            if (this.game.signals._signals.hasOwnProperty("addOnce")) {
                console.log("Test Failed: addOnce - ");
            } else {
                console.log("Test Passed: addOnce - ");
            }
        }, this, true);

        this.game.signals.sendSignal("addOnce");
    }

    testPassObj() {
        console.log("Running Test: passObj");

        this.game.signals.registerSignal("key1", (obj) => {
            if (!obj.hasOwnProperty("test")) {
                console.log("Test Failed: passObj - ");
            } else {
                console.log("Test Passed: passObj - ");
            }
        }, this);

        this.game.signals.sendSignal("key1", {"test": "test"});
    }

    testRemoveSignal() {
        console.log("Running Test: removeSignal");

        this.game.signals.registerSignal("key3", this.listener1, this);
        this.game.signals.registerSignal("key3", this.listener2, this);
        this.game.signals.removeSignal("key3", this.listener1, this);
    }

    testRemoveAllOnOneSignal() {
        console.log("Running Test: removeAll");

        this.game.signals.registerSignal("key4", this.listener1, this);
        this.game.signals.registerSignal("key4", this.listener2, this);

        this.game.signals.removeAllSignals("key4");

        if (this.game.signals._signals.hasOwnProperty("key4")) {
            console.log("Test Failed: removeAll - ");
        } else {
            console.log("Test Passed: removeAll - ");
        }
    }

    testRemoveAll() {
        console.log("Running Test: removeAll");

        this.game.signals.registerSignal("key5", this.listener1, this);

        this.game.signals.removeAllSignals();

        if (Object.length(this.game.signals._signals) > 0) {
            console.log("Test Failed: removeAll - ");
        } else {
            console.log("Test Passed: removeAll - ");
        }
    }

    listener1(obj) {
    }

    listener2(obj) {
    }
}

new Game();
