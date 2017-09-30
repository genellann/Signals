/**
 * Created by Genell Radley in 2017.
 *
 * https://github.com/gradley/Signals
 */

"use strict";

class Game extends Phaser.Game {

    constructor() {
        super();

        this.before();
        this.testGetSignal();

        this.before();
        this.testRegisterSignal();

        this.before();
        this.testPassObj();

        this.before();
        this.testAddOnce();

        this.before();
        this.testRemoveSignal();

        this.before();
        this.testRemoveAllOnOneSignal();

        this.before();
        this.testRemoveAll();

        this.before();
        this.testUndefinedKey();

        this.before();
        this.testUnacceptableKey();

        this.before();
        this.testDestroy();
    }

    before() {
        this.signals = null;
        this.signals = new Signals();
    }

    testGetSignal() {
        console.log("Running Test: testGetSignal()");

        this.signals.registerSignal(Game.ROSE, this.giveSun, this);

        let signal = this.signals.getSignal(Game.ROSE);
        if (!signal || signal._bindings[0]._listener !== this.giveSun || signal._bindings[0].context !== this) {
            console.log("Failed");
        } else {
            console.log("Passed");
        }
    }

    testRegisterSignal() {
        console.log("Running Test: testRegisterSignal()");

        this.signals.registerSignal(Game.VIOLET, this.giveWater, this);

        if (!this.signals._signals.hasOwnProperty(Game.VIOLET) ||
            this.signals._signals[Game.VIOLET]._bindings[0]._listener !== this.giveWater ||
            this.signals._signals[Game.VIOLET]._bindings[0].context !== this) {
            console.log("Failed");
        } else {
            console.log("Passed");
        }
    }

    testAddOnce() {
        console.log("Running Test: testAddOnce()");

        this.signals.registerSignal(Game.DAFFODIL, this.giveSun, this, true);

        this.signals.sendSignal(Game.DAFFODIL);

        if (this.signals._signals[Game.DAFFODIL]._bindings.length > 0) {
            console.log("Failed");
        } else {
            console.log("Passed");
        }
    }

    testPassObj() {
        console.log("Running Test: passObj");

        this.signals.registerSignal(Game.TULIP, (obj) => {
            if (!obj.test) {
                console.log("Failed");
            } else {
                console.log("Passed");
            }
        }, this);

        this.signals.sendSignal(Game.TULIP, {test: "test"});
    }

    testRemoveSignal() {
        console.log("Running Test: testRemoveSignal()");

        this.signals.registerSignal(Game.DAISY, this.giveWater, this);
        this.signals.registerSignal(Game.DAISY, this.giveSun, {});

        this.signals.removeSignal(Game.DAISY, this.giveWater, this);

        let pass = true;
        let len = this.signals._signals[Game.DAISY]._bindings.length;
        let binding;
        for (let i = 0; i < len; i++) {
            binding = this.signals._signals[Game.DAISY]._bindings[i];
            if (binding._listener === this.giveWater && binding.context === this) {
                pass = false;
            }
        }

        if (!pass) {
            console.log("Failed");
        } else {
            console.log("Passed");
        }
    }

    testRemoveAllOnOneSignal() {
        console.log("Running Test: testRemoveAllOnOneSignal()");

        this.signals.registerSignal(Game.PETUNIA, this.giveWater, this);
        this.signals.registerSignal(Game.PETUNIA, this.giveSun, this);

        this.signals.removeAllSignals(Game.PETUNIA);

        if (this.signals._signals.hasOwnProperty(Game.PETUNIA)) {
            console.log("Failed");
        } else {
            console.log("Passed");
        }
    }

    testRemoveAll() {
        console.log("Running Test: testRemoveAll()");

        this.signals.registerSignal(Game.LILY, this.giveWater, this);
        this.signals.registerSignal(Game.ZINNIA, this.giveShade, this);

        this.signals.removeAllSignals();

        if (Object.keys(this.signals._signals).length > 0) {
            console.log("Failed");
        } else {
            console.log("Passed");
        }
    }

    testUndefinedKey() {
        console.log("Running Test: testUndefinedKey()");

        this.signals.sendSignal();
        this.signals.sendSignal(null);

        console.log("Passed if the previous 2 console logs said: 'Signals:: Attempted to dispatch a signal with an undefined or null key.'");
    }

    testUnacceptableKey() {
        console.log("Running Test: testUnacceptableKey()");

        this.signals.sendSignal(1);
        this.signals.sendSignal({});

        console.log("Passed if the previous 2 console logs began with: 'Signals:: Keys must be of type 'string'...");
    }

    testDestroy() {
        console.log("Running Test: testDestroy()");

        this.signals.destroy();

        if (this.signals._signals) {
            console.log("Failed");
        } else {
            console.log("Passed");
        }
    }

    giveWater() {
    }

    giveSun() {
    }

    giveShade() {
    }
}

Object.defineProperties(Game, {
    "ROSE": {
        value: "rose"
    },
    "DAFFODIL": {
        value: "daffodil"
    },
    "TULIP": {
        value: "tulip"
    },
    "PETUNIA": {
        value: "petunia"
    },
    "LILY": {
        value: "lily"
    },
    "DAISY": {
        value: "daisy"
    },
    "PANSY": {
        value: "pansy"
    },
    "CARNATION": {
        value: "carnation"
    },
    "VIOLET": {
        value: "violet"
    },
    "ZINNIA": {
        value: "zinnia"
    }
});

new Game();
