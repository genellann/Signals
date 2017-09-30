/**
 * Created by Genell Radley in 2017.
 *
 * https://github.com/gradley/Signals
 */

import IDestructable from "./IDestructable";

/**
 * @interface ITargetObj
 */
class ITargetObj /* implements IDestructabl */ {

  get target() {
  }

  get key() {
  }

  get data() {
  }

  destroy() {
  }
}

export default ITargetObj;