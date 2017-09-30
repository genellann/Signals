/**
 * Created by Genell Radley in 2017.
 *
 * https://github.com/gradley/Signals
 */

import ITargetObj from "./ITargetObj";

/**
 * @implements ITargetObj
 */
class TargetObj /* implements ITargetObj*/ {

  constructor(target, key, data) {
    this._target = target;
    this._key = key;
    this._data = data;
  }

  get target() {
    return this._target;
  }

  get key() {
    return this._key;
  }

  get data() {
    return this._data;
  }

  destroy() {
    this._target = null;
    this._key = null;
    this._data = null;
  }
}

export default TargetObj;