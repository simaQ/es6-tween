import { remove } from './core';

export const Store: Object = {};
export default function(node, object, tween) {
  if (!node || !node.nodeType) {
    return object;
  }
  const ID: string = node.queueID || 'q_' + Date.now();
  if (!node.queueID) {
    node.queueID = ID;
  }
  const storeID = Store[ID];
  if (storeID) {
    if (
      storeID.object === object &&
      node === storeID.tween.node &&
      tween._startTime === storeID.tween._startTime
    ) {
      remove(storeID.tween);
    } else if (typeof object === 'object' && !!object && !!storeID.object) {
      for (let prop in object) {
        if (prop in storeID.object) {
          if (tween._startTime === storeID.tween._startTime) {
            delete storeID.object[prop];
          } else {
            storeID.propNormaliseRequired = true;
          }
        }
      }
	  storeID.object = {...storeID.object, ...object}
    }
    return storeID.object;
  }

  if (typeof object === 'object' && !!object) {
	Store[ID] = { tween, object, propNormaliseRequired: false };
	return Store[ID].object;
  }

  return object;
}
