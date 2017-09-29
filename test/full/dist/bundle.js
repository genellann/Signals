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

        _this.signals = new Signals.Signals();

        _this.testRegisterSignal();
        _this.testTargetObj();
        _this.testAddOnce();
        _this.testRemoveSignal();
        _this.testRemoveAllOnOneSignal();
        _this.testRemoveAll();
        _this.testUndefinedKey();
        return _this;
    }

    _createClass(Game, [{
        key: "testRegisterSignal",
        value: function testRegisterSignal() {
            console.log("Running Test: testRegisterSignal()");

            this.signals.removeAllSignals(Game.VIOLET);

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

            this.signals.removeAllSignals(Game.DAFFODIL);

            this.signals.registerSignal(Game.DAFFODIL, this.giveSun, this, true);

            this.signals.sendSignal(Game.DAFFODIL);

            if (this.signals._signals[Game.DAFFODIL]._bindings.length > 0) {
                console.log("Failed");
            } else {
                console.log("Passed");
            }
        }
    }, {
        key: "testTargetObj",
        value: function testTargetObj() {
            console.log("Running Test: testTargetObj()");

            this.signals.registerSignal(Game.TULIP, function (obj) {
                if (!obj.target || !obj.target.hasOwnProperty("test") || obj.target.test !== Game.ROSE || !obj.key || obj.key !== Game.PANSY || !obj.data || !obj.data.hasOwnProperty("test") || obj.data.test !== Game.CARNATION) {
                    console.log("Failed");
                } else {
                    console.log("Passed");
                }
            }, this);

            this.signals.sendSignal(Game.TULIP, new Signals.TargetObj({ test: Game.ROSE }, Game.PANSY, { test: Game.CARNATION }));
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

            this.signals.sendSignal("undefined");
            this.signals.sendSignal();
            this.signals.sendSignal(null);

            console.log("Passed if there were 3 previous console logs that said: 'an undefined or null signal was sent out.'");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvR2FtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7QUFNQTs7Ozs7Ozs7OztJQUVNLEk7OztBQUVGLG9CQUFjO0FBQUE7O0FBQUE7O0FBR1YsY0FBSyxPQUFMLEdBQWUsSUFBSSxRQUFRLE9BQVosRUFBZjs7QUFFQSxjQUFLLGtCQUFMO0FBQ0EsY0FBSyxhQUFMO0FBQ0EsY0FBSyxXQUFMO0FBQ0EsY0FBSyxnQkFBTDtBQUNBLGNBQUssd0JBQUw7QUFDQSxjQUFLLGFBQUw7QUFDQSxjQUFLLGdCQUFMO0FBWFU7QUFZYjs7Ozs2Q0FFb0I7QUFDakIsb0JBQVEsR0FBUixDQUFZLG9DQUFaOztBQUVBLGlCQUFLLE9BQUwsQ0FBYSxnQkFBYixDQUE4QixLQUFLLE1BQW5DOztBQUVBLGlCQUFLLE9BQUwsQ0FBYSxjQUFiLENBQTRCLEtBQUssTUFBakMsRUFBeUMsS0FBSyxTQUE5QyxFQUF5RCxJQUF6RDs7QUFFQSxnQkFBSSxDQUFDLEtBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsY0FBdEIsQ0FBcUMsS0FBSyxNQUExQyxDQUFELElBQ0EsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixLQUFLLE1BQTNCLEVBQW1DLFNBQW5DLENBQTZDLENBQTdDLEVBQWdELFNBQWhELEtBQThELEtBQUssU0FEbkUsSUFFQSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLEtBQUssTUFBM0IsRUFBbUMsU0FBbkMsQ0FBNkMsQ0FBN0MsRUFBZ0QsT0FBaEQsS0FBNEQsSUFGaEUsRUFFc0U7QUFDbEUsd0JBQVEsR0FBUixDQUFZLFFBQVo7QUFDSCxhQUpELE1BSU87QUFDSCx3QkFBUSxHQUFSLENBQVksUUFBWjtBQUNIO0FBQ0o7OztzQ0FFYTtBQUNWLG9CQUFRLEdBQVIsQ0FBWSw2QkFBWjs7QUFFQSxpQkFBSyxPQUFMLENBQWEsZ0JBQWIsQ0FBOEIsS0FBSyxRQUFuQzs7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QUFDUixlQUFPO0FBREMsS0FKYztBQU8xQixhQUFTO0FBQ0wsZUFBTztBQURGLEtBUGlCO0FBVTFCLGVBQVc7QUFDUCxlQUFPO0FBREEsS0FWZTtBQWExQixZQUFRO0FBQ0osZUFBTztBQURILEtBYmtCO0FBZ0IxQixhQUFTO0FBQ0wsZUFBTztBQURGLEtBaEJpQjtBQW1CMUIsYUFBUztBQUNMLGVBQU87QUFERixLQW5CaUI7QUFzQjFCLGlCQUFhO0FBQ1QsZUFBTztBQURFLEtBdEJhO0FBeUIxQixjQUFVO0FBQ04sZUFBTztBQURELEtBekJnQjtBQTRCMUIsY0FBVTtBQUNOLGVBQU87QUFERDtBQTVCZ0IsQ0FBOUI7O0FBaUNBLElBQUksSUFBSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgR2VuZWxsIFJhZGxleSBpbiAyMDE3LlxuICpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmFkbGV5L1BoYXNlclNpZ25hbHNcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2xhc3MgR2FtZSBleHRlbmRzIFBoYXNlci5HYW1lIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc2lnbmFscyA9IG5ldyBTaWduYWxzLlNpZ25hbHMoKTtcblxuICAgICAgICB0aGlzLnRlc3RSZWdpc3RlclNpZ25hbCgpO1xuICAgICAgICB0aGlzLnRlc3RUYXJnZXRPYmooKTtcbiAgICAgICAgdGhpcy50ZXN0QWRkT25jZSgpO1xuICAgICAgICB0aGlzLnRlc3RSZW1vdmVTaWduYWwoKTtcbiAgICAgICAgdGhpcy50ZXN0UmVtb3ZlQWxsT25PbmVTaWduYWwoKTtcbiAgICAgICAgdGhpcy50ZXN0UmVtb3ZlQWxsKCk7XG4gICAgICAgIHRoaXMudGVzdFVuZGVmaW5lZEtleSgpO1xuICAgIH1cblxuICAgIHRlc3RSZWdpc3RlclNpZ25hbCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSdW5uaW5nIFRlc3Q6IHRlc3RSZWdpc3RlclNpZ25hbCgpXCIpO1xuXG4gICAgICAgIHRoaXMuc2lnbmFscy5yZW1vdmVBbGxTaWduYWxzKEdhbWUuVklPTEVUKTtcblxuICAgICAgICB0aGlzLnNpZ25hbHMucmVnaXN0ZXJTaWduYWwoR2FtZS5WSU9MRVQsIHRoaXMuZ2l2ZVdhdGVyLCB0aGlzKTtcblxuICAgICAgICBpZiAoIXRoaXMuc2lnbmFscy5fc2lnbmFscy5oYXNPd25Qcm9wZXJ0eShHYW1lLlZJT0xFVCkgfHxcbiAgICAgICAgICAgIHRoaXMuc2lnbmFscy5fc2lnbmFsc1tHYW1lLlZJT0xFVF0uX2JpbmRpbmdzWzBdLl9saXN0ZW5lciAhPT0gdGhpcy5naXZlV2F0ZXIgfHxcbiAgICAgICAgICAgIHRoaXMuc2lnbmFscy5fc2lnbmFsc1tHYW1lLlZJT0xFVF0uX2JpbmRpbmdzWzBdLmNvbnRleHQgIT09IHRoaXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXNzZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0ZXN0QWRkT25jZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSdW5uaW5nIFRlc3Q6IHRlc3RBZGRPbmNlKClcIik7XG5cbiAgICAgICAgdGhpcy5zaWduYWxzLnJlbW92ZUFsbFNpZ25hbHMoR2FtZS5EQUZGT0RJTCk7XG5cbiAgICAgICAgdGhpcy5zaWduYWxzLnJlZ2lzdGVyU2lnbmFsKEdhbWUuREFGRk9ESUwsIHRoaXMuZ2l2ZVN1biwgdGhpcywgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5zaWduYWxzLnNlbmRTaWduYWwoR2FtZS5EQUZGT0RJTCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2lnbmFscy5fc2lnbmFsc1tHYW1lLkRBRkZPRElMXS5fYmluZGluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBhc3NlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRlc3RUYXJnZXRPYmooKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUnVubmluZyBUZXN0OiB0ZXN0VGFyZ2V0T2JqKClcIik7XG5cbiAgICAgICAgdGhpcy5zaWduYWxzLnJlZ2lzdGVyU2lnbmFsKEdhbWUuVFVMSVAsIChvYmopID0+IHtcbiAgICAgICAgICAgIGlmICghb2JqLnRhcmdldCB8fCAhb2JqLnRhcmdldC5oYXNPd25Qcm9wZXJ0eShcInRlc3RcIikgfHwgb2JqLnRhcmdldC50ZXN0ICE9PSBHYW1lLlJPU0UgfHwgIW9iai5rZXkgfHxcbiAgICAgICAgICAgICAgICBvYmoua2V5ICE9PSBHYW1lLlBBTlNZIHx8ICFvYmouZGF0YSB8fCAhb2JqLmRhdGEuaGFzT3duUHJvcGVydHkoXCJ0ZXN0XCIpIHx8IG9iai5kYXRhLnRlc3QgIT09IEdhbWUuQ0FSTkFUSU9OKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGFzc2VkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB0aGlzLnNpZ25hbHMuc2VuZFNpZ25hbChHYW1lLlRVTElQLCBuZXcgU2lnbmFscy5UYXJnZXRPYmooe3Rlc3Q6IEdhbWUuUk9TRX0sIEdhbWUuUEFOU1ksIHt0ZXN0OiBHYW1lLkNBUk5BVElPTn0pKTtcbiAgICB9XG5cbiAgICB0ZXN0UmVtb3ZlU2lnbmFsKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJ1bm5pbmcgVGVzdDogdGVzdFJlbW92ZVNpZ25hbCgpXCIpO1xuXG4gICAgICAgIHRoaXMuc2lnbmFscy5yZWdpc3RlclNpZ25hbChHYW1lLkRBSVNZLCB0aGlzLmdpdmVXYXRlciwgdGhpcyk7XG4gICAgICAgIHRoaXMuc2lnbmFscy5yZWdpc3RlclNpZ25hbChHYW1lLkRBSVNZLCB0aGlzLmdpdmVTdW4sIHt9KTtcblxuICAgICAgICB0aGlzLnNpZ25hbHMucmVtb3ZlU2lnbmFsKEdhbWUuREFJU1ksIHRoaXMuZ2l2ZVdhdGVyLCB0aGlzKTtcblxuICAgICAgICBsZXQgcGFzcyA9IHRydWU7XG4gICAgICAgIGxldCBsZW4gPSB0aGlzLnNpZ25hbHMuX3NpZ25hbHNbR2FtZS5EQUlTWV0uX2JpbmRpbmdzLmxlbmd0aDtcbiAgICAgICAgbGV0IGJpbmRpbmc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGJpbmRpbmcgPSB0aGlzLnNpZ25hbHMuX3NpZ25hbHNbR2FtZS5EQUlTWV0uX2JpbmRpbmdzW2ldO1xuICAgICAgICAgICAgaWYgKGJpbmRpbmcuX2xpc3RlbmVyID09PSB0aGlzLmdpdmVXYXRlciAmJiBiaW5kaW5nLmNvbnRleHQgPT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICBwYXNzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXBhc3MpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXNzZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0ZXN0UmVtb3ZlQWxsT25PbmVTaWduYWwoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUnVubmluZyBUZXN0OiB0ZXN0UmVtb3ZlQWxsT25PbmVTaWduYWwoKVwiKTtcblxuICAgICAgICB0aGlzLnNpZ25hbHMucmVnaXN0ZXJTaWduYWwoR2FtZS5QRVRVTklBLCB0aGlzLmdpdmVXYXRlciwgdGhpcyk7XG4gICAgICAgIHRoaXMuc2lnbmFscy5yZWdpc3RlclNpZ25hbChHYW1lLlBFVFVOSUEsIHRoaXMuZ2l2ZVN1biwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5zaWduYWxzLnJlbW92ZUFsbFNpZ25hbHMoR2FtZS5QRVRVTklBKTtcblxuICAgICAgICBpZiAodGhpcy5zaWduYWxzLl9zaWduYWxzLmhhc093blByb3BlcnR5KEdhbWUuUEVUVU5JQSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXNzZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0ZXN0UmVtb3ZlQWxsKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJ1bm5pbmcgVGVzdDogdGVzdFJlbW92ZUFsbCgpXCIpO1xuXG4gICAgICAgIHRoaXMuc2lnbmFscy5yZWdpc3RlclNpZ25hbChHYW1lLkxJTFksIHRoaXMuZ2l2ZVdhdGVyLCB0aGlzKTtcbiAgICAgICAgdGhpcy5zaWduYWxzLnJlZ2lzdGVyU2lnbmFsKEdhbWUuWklOTklBLCB0aGlzLmdpdmVTaGFkZSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5zaWduYWxzLnJlbW92ZUFsbFNpZ25hbHMoKTtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5zaWduYWxzLl9zaWduYWxzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGFzc2VkXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGVzdFVuZGVmaW5lZEtleSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSdW5uaW5nIFRlc3Q6IHRlc3RVbmRlZmluZWRLZXkoKVwiKTtcblxuICAgICAgICB0aGlzLnNpZ25hbHMuc2VuZFNpZ25hbChcInVuZGVmaW5lZFwiKTtcbiAgICAgICAgdGhpcy5zaWduYWxzLnNlbmRTaWduYWwoKTtcbiAgICAgICAgdGhpcy5zaWduYWxzLnNlbmRTaWduYWwobnVsbCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJQYXNzZWQgaWYgdGhlcmUgd2VyZSAzIHByZXZpb3VzIGNvbnNvbGUgbG9ncyB0aGF0IHNhaWQ6ICdhbiB1bmRlZmluZWQgb3IgbnVsbCBzaWduYWwgd2FzIHNlbnQgb3V0LidcIik7XG4gICAgfVxuXG4gICAgZ2l2ZVdhdGVyKCkge1xuICAgIH1cblxuICAgIGdpdmVTdW4oKSB7XG4gICAgfVxuXG4gICAgZ2l2ZVNoYWRlKCkge1xuICAgIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoR2FtZSwge1xuICAgIFwiUk9TRVwiOiB7XG4gICAgICAgIHZhbHVlOiBcInJvc2VcIlxuICAgIH0sXG4gICAgXCJEQUZGT0RJTFwiOiB7XG4gICAgICAgIHZhbHVlOiBcImRhZmZvZGlsXCJcbiAgICB9LFxuICAgIFwiVFVMSVBcIjoge1xuICAgICAgICB2YWx1ZTogXCJ0dWxpcFwiXG4gICAgfSxcbiAgICBcIlBFVFVOSUFcIjoge1xuICAgICAgICB2YWx1ZTogXCJwZXR1bmlhXCJcbiAgICB9LFxuICAgIFwiTElMWVwiOiB7XG4gICAgICAgIHZhbHVlOiBcImxpbHlcIlxuICAgIH0sXG4gICAgXCJEQUlTWVwiOiB7XG4gICAgICAgIHZhbHVlOiBcImRhaXN5XCJcbiAgICB9LFxuICAgIFwiUEFOU1lcIjoge1xuICAgICAgICB2YWx1ZTogXCJwYW5zeVwiXG4gICAgfSxcbiAgICBcIkNBUk5BVElPTlwiOiB7XG4gICAgICAgIHZhbHVlOiBcImNhcm5hdGlvblwiXG4gICAgfSxcbiAgICBcIlZJT0xFVFwiOiB7XG4gICAgICAgIHZhbHVlOiBcInZpb2xldFwiXG4gICAgfSxcbiAgICBcIlpJTk5JQVwiOiB7XG4gICAgICAgIHZhbHVlOiBcInppbm5pYVwiXG4gICAgfVxufSk7XG5cbm5ldyBHYW1lKCk7XG4iXX0=
