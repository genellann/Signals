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
        _this.testTargetObj();

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
            this.signals = new Signals.Signals();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvR2FtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7QUFNQTs7Ozs7Ozs7OztJQUVNLEk7OztBQUVGLG9CQUFjO0FBQUE7O0FBQUE7O0FBR1YsY0FBSyxNQUFMO0FBQ0EsY0FBSyxrQkFBTDs7QUFFQSxjQUFLLE1BQUw7QUFDQSxjQUFLLGFBQUw7O0FBRUEsY0FBSyxNQUFMO0FBQ0EsY0FBSyxXQUFMOztBQUVBLGNBQUssTUFBTDtBQUNBLGNBQUssZ0JBQUw7O0FBRUEsY0FBSyxNQUFMO0FBQ0EsY0FBSyx3QkFBTDs7QUFFQSxjQUFLLE1BQUw7QUFDQSxjQUFLLGFBQUw7O0FBRUEsY0FBSyxNQUFMO0FBQ0EsY0FBSyxnQkFBTDs7QUFFQSxjQUFLLE1BQUw7QUFDQSxjQUFLLG1CQUFMOztBQUVBLGNBQUssTUFBTDtBQUNBLGNBQUssV0FBTDtBQTVCVTtBQTZCYjs7OztpQ0FFUTtBQUNMLGlCQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsaUJBQUssT0FBTCxHQUFlLElBQUksUUFBUSxPQUFaLEVBQWY7QUFDSDs7OzZDQUVvQjtBQUNqQixvQkFBUSxHQUFSLENBQVksb0NBQVo7O0FBRUEsaUJBQUssT0FBTCxDQUFhLGNBQWIsQ0FBNEIsS0FBSyxNQUFqQyxFQUF5QyxLQUFLLFNBQTlDLEVBQXlELElBQXpEOztBQUVBLGdCQUFJLENBQUMsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixjQUF0QixDQUFxQyxLQUFLLE1BQTFDLENBQUQsSUFDQSxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLEtBQUssTUFBM0IsRUFBbUMsU0FBbkMsQ0FBNkMsQ0FBN0MsRUFBZ0QsU0FBaEQsS0FBOEQsS0FBSyxTQURuRSxJQUVBLEtBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsS0FBSyxNQUEzQixFQUFtQyxTQUFuQyxDQUE2QyxDQUE3QyxFQUFnRCxPQUFoRCxLQUE0RCxJ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T0FBTCxDQUFhLFVBQWIsQ0FBd0IsQ0FBeEI7QUFDQSxpQkFBSyxPQUFMLENBQWEsVUFBYixDQUF3QixFQUF4Qjs7QUFFQSxvQkFBUSxHQUFSLENBQVksK0ZBQVo7QUFDSDs7O3NDQUVhO0FBQ1Ysb0JBQVEsR0FBUixDQUFZLDZCQUFaOztBQUVBLGlCQUFLLE9BQUwsQ0FBYSxPQUFiOztBQUVBLGdCQUFJLEtBQUssT0FBTCxDQUFhLFFBQWpCLEVBQTJCO0FBQ3ZCLHdCQUFRLEdBQVIsQ0FBWSxRQUFaO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsd0JBQVEsR0FBUixDQUFZLFFBQVo7QUFDSDtBQUNKOzs7b0NBRVcsQ0FDWDs7O2tDQUVTLENBQ1Q7OztvQ0FFVyxDQUNYOzs7O0VBN0tjLE9BQU8sSTs7QUFnTDFCLE9BQU8sZ0JBQVAsQ0FBd0IsSUFBeEIsRUFBOEI7QUFDMUIsWUFBUTtBQUNKLGVBQU87QUFESCxLQURrQjtBQUkxQixnQkFBWTtBQUNSLGVBQU87QUFEQyxLQUpjO0FBTzFCLGFBQVM7QUFDTCxlQUFPO0FBREYsS0FQaUI7QUFVMUIsZUFBVztBQUNQLGVBQU87QUFEQSxLQVZlO0FBYTFCLFlBQVE7QUFDSixlQUFPO0FBREgsS0Fia0I7QUFnQjFCLGFBQVM7QUFDTCxlQUFPO0FBREYsS0FoQmlCO0FBbUIxQixhQUFTO0FBQ0wsZUFBTztBQURGLEtBbkJpQjtBQXNCMUIsaUJBQWE7QUFDVCxlQUFPO0FBREUsS0F0QmE7QUF5QjFCLGNBQVU7QUFDTixlQUFPO0FBREQsS0F6QmdCO0FBNEIxQixjQUFVO0FBQ04sZUFBTztBQUREO0FBNUJnQixDQUE5Qjs7QUFpQ0EsSUFBSSxJQUFKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBHZW5lbGwgUmFkbGV5IGluIDIwMTcuXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL2dyYWRsZXkvUGhhc2VyU2lnbmFsc1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5jbGFzcyBHYW1lIGV4dGVuZHMgUGhhc2VyLkdhbWUge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5iZWZvcmUoKTtcbiAgICAgICAgdGhpcy50ZXN0UmVnaXN0ZXJTaWduYWwoKTtcblxuICAgICAgICB0aGlzLmJlZm9yZSgpO1xuICAgICAgICB0aGlzLnRlc3RUYXJnZXRPYmooKTtcblxuICAgICAgICB0aGlzLmJlZm9yZSgpO1xuICAgICAgICB0aGlzLnRlc3RBZGRPbmNlKCk7XG5cbiAgICAgICAgdGhpcy5iZWZvcmUoKTtcbiAgICAgICAgdGhpcy50ZXN0UmVtb3ZlU2lnbmFsKCk7XG5cbiAgICAgICAgdGhpcy5iZWZvcmUoKTtcbiAgICAgICAgdGhpcy50ZXN0UmVtb3ZlQWxsT25PbmVTaWduYWwoKTtcblxuICAgICAgICB0aGlzLmJlZm9yZSgpO1xuICAgICAgICB0aGlzLnRlc3RSZW1vdmVBbGwoKTtcblxuICAgICAgICB0aGlzLmJlZm9yZSgpO1xuICAgICAgICB0aGlzLnRlc3RVbmRlZmluZWRLZXkoKTtcblxuICAgICAgICB0aGlzLmJlZm9yZSgpO1xuICAgICAgICB0aGlzLnRlc3RVbmFjY2VwdGFibGVLZXkoKTtcblxuICAgICAgICB0aGlzLmJlZm9yZSgpO1xuICAgICAgICB0aGlzLnRlc3REZXN0cm95KCk7XG4gICAgfVxuXG4gICAgYmVmb3JlKCkge1xuICAgICAgICB0aGlzLnNpZ25hbHMgPSBudWxsO1xuICAgICAgICB0aGlzLnNpZ25hbHMgPSBuZXcgU2lnbmFscy5TaWduYWxzKCk7XG4gICAgfVxuXG4gICAgdGVzdFJlZ2lzdGVyU2lnbmFsKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJ1bm5pbmcgVGVzdDogdGVzdFJlZ2lzdGVyU2lnbmFsKClcIik7XG5cbiAgICAgICAgdGhpcy5zaWduYWxzLnJlZ2lzdGVyU2lnbmFsKEdhbWUuVklPTEVULCB0aGlzLmdpdmVXYXRlciwgdGhpcyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNpZ25hbHMuX3NpZ25hbHMuaGFzT3duUHJvcGVydHkoR2FtZS5WSU9MRVQpIHx8XG4gICAgICAgICAgICB0aGlzLnNpZ25hbHMuX3NpZ25hbHNbR2FtZS5WSU9MRVRdLl9iaW5kaW5nc1swXS5fbGlzdGVuZXIgIT09IHRoaXMuZ2l2ZVdhdGVyIHx8XG4gICAgICAgICAgICB0aGlzLnNpZ25hbHMuX3NpZ25hbHNbR2FtZS5WSU9MRVRdLl9iaW5kaW5nc1swXS5jb250ZXh0ICE9PSB0aGlzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGFzc2VkXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGVzdEFkZE9uY2UoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUnVubmluZyBUZXN0OiB0ZXN0QWRkT25jZSgpXCIpO1xuXG4gICAgICAgIHRoaXMuc2lnbmFscy5yZWdpc3RlclNpZ25hbChHYW1lLkRBRkZPRElMLCB0aGlzLmdpdmVTdW4sIHRoaXMsIHRydWUpO1xuXG4gICAgICAgIHRoaXMuc2lnbmFscy5zZW5kU2lnbmFsKEdhbWUuREFGRk9ESUwpO1xuXG4gICAgICAgIGlmICh0aGlzLnNpZ25hbHMuX3NpZ25hbHNbR2FtZS5EQUZGT0RJTF0uX2JpbmRpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXNzZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0ZXN0VGFyZ2V0T2JqKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJ1bm5pbmcgVGVzdDogdGVzdFRhcmdldE9iaigpXCIpO1xuXG4gICAgICAgIHRoaXMuc2lnbmFscy5yZWdpc3RlclNpZ25hbChHYW1lLlRVTElQLCAob2JqKSA9PiB7XG4gICAgICAgICAgICBpZiAoIW9iai50YXJnZXQgfHwgIW9iai50YXJnZXQuaGFzT3duUHJvcGVydHkoXCJ0ZXN0XCIpIHx8IG9iai50YXJnZXQudGVzdCAhPT0gR2FtZS5ST1NFIHx8ICFvYmoua2V5IHx8XG4gICAgICAgICAgICAgICAgb2JqLmtleSAhPT0gR2FtZS5QQU5TWSB8fCAhb2JqLmRhdGEgfHwgIW9iai5kYXRhLmhhc093blByb3BlcnR5KFwidGVzdFwiKSB8fCBvYmouZGF0YS50ZXN0ICE9PSBHYW1lLkNBUk5BVElPTikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBhc3NlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5zaWduYWxzLnNlbmRTaWduYWwoR2FtZS5UVUxJUCwgbmV3IFNpZ25hbHMuVGFyZ2V0T2JqKHt0ZXN0OiBHYW1lLlJPU0V9LCBHYW1lLlBBTlNZLCB7dGVzdDogR2FtZS5DQVJOQVRJT059KSk7XG4gICAgfVxuXG4gICAgdGVzdFJlbW92ZVNpZ25hbCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSdW5uaW5nIFRlc3Q6IHRlc3RSZW1vdmVTaWduYWwoKVwiKTtcblxuICAgICAgICB0aGlzLnNpZ25hbHMucmVnaXN0ZXJTaWduYWwoR2FtZS5EQUlTWSwgdGhpcy5naXZlV2F0ZXIsIHRoaXMpO1xuICAgICAgICB0aGlzLnNpZ25hbHMucmVnaXN0ZXJTaWduYWwoR2FtZS5EQUlTWSwgdGhpcy5naXZlU3VuLCB7fSk7XG5cbiAgICAgICAgdGhpcy5zaWduYWxzLnJlbW92ZVNpZ25hbChHYW1lLkRBSVNZLCB0aGlzLmdpdmVXYXRlciwgdGhpcyk7XG5cbiAgICAgICAgbGV0IHBhc3MgPSB0cnVlO1xuICAgICAgICBsZXQgbGVuID0gdGhpcy5zaWduYWxzLl9zaWduYWxzW0dhbWUuREFJU1ldLl9iaW5kaW5ncy5sZW5ndGg7XG4gICAgICAgIGxldCBiaW5kaW5nO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBiaW5kaW5nID0gdGhpcy5zaWduYWxzLl9zaWduYWxzW0dhbWUuREFJU1ldLl9iaW5kaW5nc1tpXTtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nLl9saXN0ZW5lciA9PT0gdGhpcy5naXZlV2F0ZXIgJiYgYmluZGluZy5jb250ZXh0ID09PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgcGFzcyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwYXNzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGFzc2VkXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGVzdFJlbW92ZUFsbE9uT25lU2lnbmFsKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJ1bm5pbmcgVGVzdDogdGVzdFJlbW92ZUFsbE9uT25lU2lnbmFsKClcIik7XG5cbiAgICAgICAgdGhpcy5zaWduYWxzLnJlZ2lzdGVyU2lnbmFsKEdhbWUuUEVUVU5JQSwgdGhpcy5naXZlV2F0ZXIsIHRoaXMpO1xuICAgICAgICB0aGlzLnNpZ25hbHMucmVnaXN0ZXJTaWduYWwoR2FtZS5QRVRVTklBLCB0aGlzLmdpdmVTdW4sIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc2lnbmFscy5yZW1vdmVBbGxTaWduYWxzKEdhbWUuUEVUVU5JQSk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2lnbmFscy5fc2lnbmFscy5oYXNPd25Qcm9wZXJ0eShHYW1lLlBFVFVOSUEpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGFzc2VkXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGVzdFJlbW92ZUFsbCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSdW5uaW5nIFRlc3Q6IHRlc3RSZW1vdmVBbGwoKVwiKTtcblxuICAgICAgICB0aGlzLnNpZ25hbHMucmVnaXN0ZXJTaWduYWwoR2FtZS5MSUxZLCB0aGlzLmdpdmVXYXRlciwgdGhpcyk7XG4gICAgICAgIHRoaXMuc2lnbmFscy5yZWdpc3RlclNpZ25hbChHYW1lLlpJTk5JQSwgdGhpcy5naXZlU2hhZGUsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc2lnbmFscy5yZW1vdmVBbGxTaWduYWxzKCk7XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuc2lnbmFscy5fc2lnbmFscykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBhc3NlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRlc3RVbmRlZmluZWRLZXkoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUnVubmluZyBUZXN0OiB0ZXN0VW5kZWZpbmVkS2V5KClcIik7XG5cbiAgICAgICAgdGhpcy5zaWduYWxzLnNlbmRTaWduYWwoKTtcbiAgICAgICAgdGhpcy5zaWduYWxzLnNlbmRTaWduYWwobnVsbCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJQYXNzZWQgaWYgdGhlIHByZXZpb3VzIDIgY29uc29sZSBsb2dzIHNhaWQ6ICdTaWduYWxzOjogQXR0ZW1wdGVkIHRvIGRpc3BhdGNoIGEgc2lnbmFsIHdpdGggYW4gdW5kZWZpbmVkIG9yIG51bGwga2V5LidcIik7XG4gICAgfVxuXG4gICAgdGVzdFVuYWNjZXB0YWJsZUtleSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSdW5uaW5nIFRlc3Q6IHRlc3RVbmFjY2VwdGFibGVLZXkoKVwiKTtcblxuICAgICAgICB0aGlzLnNpZ25hbHMuc2VuZFNpZ25hbCgxKTtcbiAgICAgICAgdGhpcy5zaWduYWxzLnNlbmRTaWduYWwoe30pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGFzc2VkIGlmIHRoZSBwcmV2aW91cyAyIGNvbnNvbGUgbG9ncyBiZWdhbiB3aXRoOiAnU2lnbmFsczo6IEtleXMgbXVzdCBiZSBvZiB0eXBlICdzdHJpbmcnLi4uXCIpO1xuICAgIH1cblxuICAgIHRlc3REZXN0cm95KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJ1bm5pbmcgVGVzdDogdGVzdERlc3Ryb3koKVwiKTtcblxuICAgICAgICB0aGlzLnNpZ25hbHMuZGVzdHJveSgpO1xuXG4gICAgICAgIGlmICh0aGlzLnNpZ25hbHMuX3NpZ25hbHMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQYXNzZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnaXZlV2F0ZXIoKSB7XG4gICAgfVxuXG4gICAgZ2l2ZVN1bigpIHtcbiAgICB9XG5cbiAgICBnaXZlU2hhZGUoKSB7XG4gICAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhHYW1lLCB7XG4gICAgXCJST1NFXCI6IHtcbiAgICAgICAgdmFsdWU6IFwicm9zZVwiXG4gICAgfSxcbiAgICBcIkRBRkZPRElMXCI6IHtcbiAgICAgICAgdmFsdWU6IFwiZGFmZm9kaWxcIlxuICAgIH0sXG4gICAgXCJUVUxJUFwiOiB7XG4gICAgICAgIHZhbHVlOiBcInR1bGlwXCJcbiAgICB9LFxuICAgIFwiUEVUVU5JQVwiOiB7XG4gICAgICAgIHZhbHVlOiBcInBldHVuaWFcIlxuICAgIH0sXG4gICAgXCJMSUxZXCI6IHtcbiAgICAgICAgdmFsdWU6IFwibGlseVwiXG4gICAgfSxcbiAgICBcIkRBSVNZXCI6IHtcbiAgICAgICAgdmFsdWU6IFwiZGFpc3lcIlxuICAgIH0sXG4gICAgXCJQQU5TWVwiOiB7XG4gICAgICAgIHZhbHVlOiBcInBhbnN5XCJcbiAgICB9LFxuICAgIFwiQ0FSTkFUSU9OXCI6IHtcbiAgICAgICAgdmFsdWU6IFwiY2FybmF0aW9uXCJcbiAgICB9LFxuICAgIFwiVklPTEVUXCI6IHtcbiAgICAgICAgdmFsdWU6IFwidmlvbGV0XCJcbiAgICB9LFxuICAgIFwiWklOTklBXCI6IHtcbiAgICAgICAgdmFsdWU6IFwiemlubmlhXCJcbiAgICB9XG59KTtcblxubmV3IEdhbWUoKTtcbiJdfQ==
