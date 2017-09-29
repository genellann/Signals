(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Genell Radley in 2017.
 *
 * https://github.com/gradley/PhaserSignals
 */

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Phaser$Game) {
    _inherits(Game, _Phaser$Game);

    function Game() {
        _classCallCheck(this, Game);

        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this));

        _this.before();
        _this.testRegisterSignal();

        _this.before();
        _this.testPassObj();

        _this.before();
        _this.testAddOnce();

        _this.before();
        _this.testRemoveSignal();

        _this.before();
        _this.testRemoveAllOnOneSignal();

        _this.before();
        _this.testRemoveAll();

        _this.before();
        _this.testUndefinedKey();

        _this.before();
        _this.testUnacceptableKey();

        _this.before();
        _this.testDestroy();
        return _this;
    }

    _createClass(Game, [{
        key: "before",
        value: function before() {
            this.signals = null;
            this.signals = new Signals();
        }
    }, {
        key: "testRegisterSignal",
        value: function testRegisterSignal() {
            console.log("Running Test: testRegisterSignal()");

            this.signals.registerSignal(Game.VIOLET, this.giveWater, this);

            if (!this.signals._signals.hasOwnProperty(Game.VIOLET) || this.signals._signals[Game.VIOLET]._bindings[0]._listener !== this.giveWater || this.signals._signals[Game.VIOLET]._bindings[0].context !== this) {
                console.log("Failed");
            } else {
                console.log("Passed");
            }
        }
    }, {
        key: "testAddOnce",
        value: function testAddOnce() {
            console.log("Running Test: testAddOnce()");

            this.signals.registerSignal(Game.DAFFODIL, this.giveSun, this, true);

            this.signals.sendSignal(Game.DAFFODIL);

            if (this.signals._signals[Game.DAFFODIL]._bindings.length > 0) {
                console.log("Failed");
            } else {
                console.log("Passed");
            }
        }
    }, {
        key: "testPassObj",
        value: function testPassObj() {
            console.log("Running Test: passObj");

            this.signals.registerSignal(Game.TULIP, function (obj) {
                if (!obj.test) {
                    console.log("Failed");
                } else {
                    console.log("Passed");
                }
            }, this);

            this.signals.sendSignal(Game.TULIP, { test: "test" });
        }
    }, {
        key: "testRemoveSignal",
        value: function testRemoveSignal() {
            console.log("Running Test: testRemoveSignal()");

            this.signals.registerSignal(Game.DAISY, this.giveWater, this);
            this.signals.registerSignal(Game.DAISY, this.giveSun, {});

            this.signals.removeSignal(Game.DAISY, this.giveWater, this);

            var pass = true;
            var len = this.signals._signals[Game.DAISY]._bindings.length;
            var binding = void 0;
            for (var i = 0; i < len; i++) {
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
    }, {
        key: "testRemoveAllOnOneSignal",
        value: function testRemoveAllOnOneSignal() {
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
    }, {
        key: "testRemoveAll",
        value: function testRemoveAll() {
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
    }, {
        key: "testUndefinedKey",
        value: function testUndefinedKey() {
            console.log("Running Test: testUndefinedKey()");

            this.signals.sendSignal();
            this.signals.sendSignal(null);

            console.log("Passed if the previous 2 console logs said: 'Signals:: Attempted to dispatch a signal with an undefined or null key.'");
        }
    }, {
        key: "testUnacceptableKey",
        value: function testUnacceptableKey() {
            console.log("Running Test: testUnacceptableKey()");

            this.signals.sendSignal(1);
            this.signals.sendSignal({});

            console.log("Passed if the previous 2 console logs began with: 'Signals:: Keys must be of type 'string'...");
        }
    }, {
        key: "testDestroy",
        value: function testDestroy() {
            console.log("Running Test: testDestroy()");

            this.signals.destroy();

            if (this.signals._signals) {
                console.log("Failed");
            } else {
                console.log("Passed");
            }
        }
    }, {
        key: "giveWater",
        value: function giveWater() {}
    }, {
        key: "giveSun",
        value: function giveSun() {}
    }, {
        key: "giveShade",
        value: function giveShade() {}
    }]);

    return Game;
}(Phaser.Game);

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvR2FtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7QUFNQTs7Ozs7Ozs7OztJQUVNLEk7OztBQUVGLG9CQUFjO0FBQUE7O0FBQUE7O0FBR1YsY0FBSyxNQUFMO0FBQ0EsY0FBSyxrQkFBTDs7QUFFQSxjQUFLLE1BQUw7QUFDQSxjQUFLLFdBQUw7O0FBRUEsY0FBSyxNQUFMO0FBQ0EsY0FBSyxXQUFMOztBQUVBLGNBQUssTUFBTDtBQUNBLGNBQUssZ0JBQUw7O0FBRUEsY0FBSyxNQUFMO0FBQ0EsY0FBSyx3QkFBTDs7QUFFQSxjQUFLLE1BQUw7QUFDQSxjQUFLLGFBQUw7O0FBRUEsY0FBSyxNQUFMO0FBQ0EsY0FBSyxnQkFBTDs7QUFFQSxjQUFLLE1BQUw7QUFDQSxjQUFLLG1CQUFMOztBQUVBLGNBQUssTUFBTDtBQUNBLGNBQUssV0FBTDtBQTVCVTtBQTZCYjs7OztpQ0FFUTtBQUNMLGlCQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsaUJBQUssT0FBTCxHQUFlLElBQUksT0FBSixFQUFmO0FBQ0g7Ozs2Q0FFb0I7QUFDakIsb0JBQVEsR0FBUixDQUFZLG9DQUFaOztBQUVBLGlCQUFLLE9BQUwsQ0FBYSxjQUFiLENBQTRCLEtBQUssTUFBakMsRUFBeUMsS0FBSyxTQUE5QyxFQUF5RCxJQUF6RDs7QUFFQSxnQkFBSSxDQUFDLEtBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsY0FBdEIsQ0FBcUMsS0FBSyxNQUExQyxDQUFELElBQ0EsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixLQUFLLE1BQTNCLEVBQW1DLFNBQW5DLENBQTZDLENBQTdDLEVBQWdELFNBQWhELEtBQThELEtBQUssU0FEbkUsSUFFQSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLEtBQUssTUFBM0IsRUFBbUMsU0FBbkMsQ0FBNkMsQ0FBN0MsRUFBZ0QsT0FBaEQsS0FBNEQsSUFGaEUs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QkFBUCxDQUF3QixJQUF4QixFQUE4QjtBQUMxQixZQUFRO0FBQ0osZUFBTztBQURILEtBRGtCO0FBSTFCLGdCQUFZO0FBQ1IsZUFBTztBQURDLEtBSmM7QUFPMUIsYUFBUztBQUNMLGVBQU87QUFERixLQVBpQjtBQVUxQixlQUFXO0FBQ1AsZUFBTztBQURBLEtBVmU7QUFhMUIsWUFBUTtBQUNKLGVBQU87QUFESCxLQWJrQjtBQWdCMUIsYUFBUztBQUNMLGVBQU87QUFERixLQWhCaUI7QUFtQjFCLGFBQVM7QUFDTCxlQUFPO0FBREYsS0FuQmlCO0FBc0IxQixpQkFBYTtBQUNULGVBQU87QUFERSxLQXRCYTtBQXlCMUIsY0FBVTtBQUNOLGVBQU87QUFERCxLQXpCZ0I7QUE0QjFCLGNBQVU7QUFDTixlQUFPO0FBREQ7QUE1QmdCLENBQTlCOztBQWlDQSxJQUFJLElBQUoiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEdlbmVsbCBSYWRsZXkgaW4gMjAxNy5cbiAqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ3JhZGxleS9QaGFzZXJTaWduYWxzXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNsYXNzIEdhbWUgZXh0ZW5kcyBQaGFzZXIuR2FtZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmJlZm9yZSgpO1xuICAgICAgICB0aGlzLnRlc3RSZWdpc3RlclNpZ25hbCgpO1xuXG4gICAgICAgIHRoaXMuYmVmb3JlKCk7XG4gICAgICAgIHRoaXMudGVzdFBhc3NPYmooKTtcblxuICAgICAgICB0aGlzLmJlZm9yZSgpO1xuICAgICAgICB0aGlzLnRlc3RBZGRPbmNlKCk7XG5cbiAgICAgICAgdGhpcy5iZWZvcmUoKTtcbiAgICAgICAgdGhpcy50ZXN0UmVtb3ZlU2lnbmFsKCk7XG5cbiAgICAgICAgdGhpcy5iZWZvcmUoKTtcbiAgICAgICAgdGhpcy50ZXN0UmVtb3ZlQWxsT25PbmVTaWduYWwoKTtcblxuICAgICAgICB0aGlzLmJlZm9yZSgpO1xuICAgICAgICB0aGlzLnRlc3RSZW1vdmVBbGwoKTtcblxuICAgICAgICB0aGlzLmJlZm9yZSgpO1xuICAgICAgICB0aGlzLnRlc3RVbmRlZmluZWRLZXkoKTtcblxuICAgICAgICB0aGlzLmJlZm9yZSgpO1xuICAgICAgICB0aGlzLnRlc3RVbmFjY2VwdGFibGVLZXkoKTtcblxuICAgICAgICB0aGlzLmJlZm9yZSgpO1xuICAgICAgICB0aGlzLnRlc3REZXN0cm95KCk7XG4gICAgfVxuXG4gICAgYmVmb3JlKCkge1xuICAgICAgICB0aGlzLnNpZ25hbHMgPSBudWxsO1xuICAgICAgICB0aGlzLnNpZ25hbHMgPSBuZXcgU2lnbmFscygpO1xuICAgIH1cblxuICAgIHRlc3RSZWdpc3RlclNpZ25hbCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSdW5uaW5nIFRlc3Q6IHRlc3RSZWdpc3RlclNpZ25hbCgpXCIpO1xuXG4gICAgICAgIHRoaXMuc2lnbmFscy5yZWdpc3RlclNpZ25hbChHYW1lLlZJT0xFVCwgdGhpcy5naXZlV2F0ZXIsIHRoaXMpO1xuXG4gICAgICAgIGlmICghdGhpcy5zaWduYWxzLl9zaWduYWxzLmhhc093blByb3BlcnR5KEdhbWUuVklPTEVUKSB8fFxuICAgICAgICAgICAgdGhpcy5zaWduYWxzLl9zaWduYWxzW0dhbWUuVklPTEVUXS5fYmluZGluZ3NbMF0uX2xpc3RlbmVyICE9PSB0aGlzLmdpdmVXYXRlciB8fFxuICAgICAgICAgICAgdGhpcy5zaWduYWxzLl9zaWduYWxzW0dhbWUuVklPTEVUXS5fYmluZGluZ3NbMF0uY29udGV4dCAhPT0gdGhpcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBhc3NlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRlc3RBZGRPbmNlKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJ1bm5pbmcgVGVzdDogdGVzdEFkZE9uY2UoKVwiKTtcblxuICAgICAgICB0aGlzLnNpZ25hbHMucmVnaXN0ZXJTaWduYWwoR2FtZS5EQUZGT0RJTCwgdGhpcy5naXZlU3VuLCB0aGlzLCB0cnVlKTtcblxuICAgICAgICB0aGlzLnNpZ25hbHMuc2VuZFNpZ25hbChHYW1lLkRBRkZPRElMKTtcblxuICAgICAgICBpZiAodGhpcy5zaWduYWxzLl9zaWduYWxzW0dhbWUuREFGRk9ESUxdLl9iaW5kaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGFzc2VkXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGVzdFBhc3NPYmooKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUnVubmluZyBUZXN0OiBwYXNzT2JqXCIpO1xuXG4gICAgICAgIHRoaXMuc2lnbmFscy5yZWdpc3RlclNpZ25hbChHYW1lLlRVTElQLCAob2JqKSA9PiB7XG4gICAgICAgICAgICBpZiAoIW9iai50ZXN0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGFzc2VkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB0aGlzLnNpZ25hbHMuc2VuZFNpZ25hbChHYW1lLlRVTElQLCB7dGVzdDogXCJ0ZXN0XCJ9KTtcbiAgICB9XG5cbiAgICB0ZXN0UmVtb3ZlU2lnbmFsKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJ1bm5pbmcgVGVzdDogdGVzdFJlbW92ZVNpZ25hbCgpXCIpO1xuXG4gICAgICAgIHRoaXMuc2lnbmFscy5yZWdpc3RlclNpZ25hbChHYW1lLkRBSVNZLCB0aGlzLmdpdmVXYXRlciwgdGhpcyk7XG4gICAgICAgIHRoaXMuc2lnbmFscy5yZWdpc3RlclNpZ25hbChHYW1lLkRBSVNZLCB0aGlzLmdpdmVTdW4sIHt9KTtcblxuICAgICAgICB0aGlzLnNpZ25hbHMucmVtb3ZlU2lnbmFsKEdhbWUuREFJU1ksIHRoaXMuZ2l2ZVdhdGVyLCB0aGlzKTtcblxuICAgICAgICBsZXQgcGFzcyA9IHRydWU7XG4gICAgICAgIGxldCBsZW4gPSB0aGlzLnNpZ25hbHMuX3NpZ25hbHNbR2FtZS5EQUlTWV0uX2JpbmRpbmdzLmxlbmd0aDtcbiAgICAgICAgbGV0IGJpbmRpbmc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGJpbmRpbmcgPSB0aGlzLnNpZ25hbHMuX3NpZ25hbHNbR2FtZS5EQUlTWV0uX2JpbmRpbmdzW2ldO1xuICAgICAgICAgICAgaWYgKGJpbmRpbmcuX2xpc3RlbmVyID09PSB0aGlzLmdpdmVXYXRlciAmJiBiaW5kaW5nLmNvbnRleHQgPT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICBwYXNzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXBhc3MpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXNzZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0ZXN0UmVtb3ZlQWxsT25PbmVTaWduYWwoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUnVubmluZyBUZXN0OiB0ZXN0UmVtb3ZlQWxsT25PbmVTaWduYWwoKVwiKTtcblxuICAgICAgICB0aGlzLnNpZ25hbHMucmVnaXN0ZXJTaWduYWwoR2FtZS5QRVRVTklBLCB0aGlzLmdpdmVXYXRlciwgdGhpcyk7XG4gICAgICAgIHRoaXMuc2lnbmFscy5yZWdpc3RlclNpZ25hbChHYW1lLlBFVFVOSUEsIHRoaXMuZ2l2ZVN1biwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5zaWduYWxzLnJlbW92ZUFsbFNpZ25hbHMoR2FtZS5QRVRVTklBKTtcblxuICAgICAgICBpZiAodGhpcy5zaWduYWxzLl9zaWduYWxzLmhhc093blByb3BlcnR5KEdhbWUuUEVUVU5JQSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXNzZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0ZXN0UmVtb3ZlQWxsKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJ1bm5pbmcgVGVzdDogdGVzdFJlbW92ZUFsbCgpXCIpO1xuXG4gICAgICAgIHRoaXMuc2lnbmFscy5yZWdpc3RlclNpZ25hbChHYW1lLkxJTFksIHRoaXMuZ2l2ZVdhdGVyLCB0aGlzKTtcbiAgICAgICAgdGhpcy5zaWduYWxzLnJlZ2lzdGVyU2lnbmFsKEdhbWUuWklOTklBLCB0aGlzLmdpdmVTaGFkZSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5zaWduYWxzLnJlbW92ZUFsbFNpZ25hbHMoKTtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5zaWduYWxzLl9zaWduYWxzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGFzc2VkXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGVzdFVuZGVmaW5lZEtleSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSdW5uaW5nIFRlc3Q6IHRlc3RVbmRlZmluZWRLZXkoKVwiKTtcblxuICAgICAgICB0aGlzLnNpZ25hbHMuc2VuZFNpZ25hbCgpO1xuICAgICAgICB0aGlzLnNpZ25hbHMuc2VuZFNpZ25hbChudWxsKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlBhc3NlZCBpZiB0aGUgcHJldmlvdXMgMiBjb25zb2xlIGxvZ3Mgc2FpZDogJ1NpZ25hbHM6OiBBdHRlbXB0ZWQgdG8gZGlzcGF0Y2ggYSBzaWduYWwgd2l0aCBhbiB1bmRlZmluZWQgb3IgbnVsbCBrZXkuJ1wiKTtcbiAgICB9XG5cbiAgICB0ZXN0VW5hY2NlcHRhYmxlS2V5KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJ1bm5pbmcgVGVzdDogdGVzdFVuYWNjZXB0YWJsZUtleSgpXCIpO1xuXG4gICAgICAgIHRoaXMuc2lnbmFscy5zZW5kU2lnbmFsKDEpO1xuICAgICAgICB0aGlzLnNpZ25hbHMuc2VuZFNpZ25hbCh7fSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJQYXNzZWQgaWYgdGhlIHByZXZpb3VzIDIgY29uc29sZSBsb2dzIGJlZ2FuIHdpdGg6ICdTaWduYWxzOjogS2V5cyBtdXN0IGJlIG9mIHR5cGUgJ3N0cmluZycuLi5cIik7XG4gICAgfVxuXG4gICAgdGVzdERlc3Ryb3koKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUnVubmluZyBUZXN0OiB0ZXN0RGVzdHJveSgpXCIpO1xuXG4gICAgICAgIHRoaXMuc2lnbmFscy5kZXN0cm95KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2lnbmFscy5fc2lnbmFscykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBhc3NlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdpdmVXYXRlcigpIHtcbiAgICB9XG5cbiAgICBnaXZlU3VuKCkge1xuICAgIH1cblxuICAgIGdpdmVTaGFkZSgpIHtcbiAgICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEdhbWUsIHtcbiAgICBcIlJPU0VcIjoge1xuICAgICAgICB2YWx1ZTogXCJyb3NlXCJcbiAgICB9LFxuICAgIFwiREFGRk9ESUxcIjoge1xuICAgICAgICB2YWx1ZTogXCJkYWZmb2RpbFwiXG4gICAgfSxcbiAgICBcIlRVTElQXCI6IHtcbiAgICAgICAgdmFsdWU6IFwidHVsaXBcIlxuICAgIH0sXG4gICAgXCJQRVRVTklBXCI6IHtcbiAgICAgICAgdmFsdWU6IFwicGV0dW5pYVwiXG4gICAgfSxcbiAgICBcIkxJTFlcIjoge1xuICAgICAgICB2YWx1ZTogXCJsaWx5XCJcbiAgICB9LFxuICAgIFwiREFJU1lcIjoge1xuICAgICAgICB2YWx1ZTogXCJkYWlzeVwiXG4gICAgfSxcbiAgICBcIlBBTlNZXCI6IHtcbiAgICAgICAgdmFsdWU6IFwicGFuc3lcIlxuICAgIH0sXG4gICAgXCJDQVJOQVRJT05cIjoge1xuICAgICAgICB2YWx1ZTogXCJjYXJuYXRpb25cIlxuICAgIH0sXG4gICAgXCJWSU9MRVRcIjoge1xuICAgICAgICB2YWx1ZTogXCJ2aW9sZXRcIlxuICAgIH0sXG4gICAgXCJaSU5OSUFcIjoge1xuICAgICAgICB2YWx1ZTogXCJ6aW5uaWFcIlxuICAgIH1cbn0pO1xuXG5uZXcgR2FtZSgpO1xuIl19
