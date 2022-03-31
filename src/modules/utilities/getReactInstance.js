/**
 * @name getReactInstance
 * @description Gets a react instance from an HTML element
 * @param {HTMLElement} element - HTML element to get the react instance from
 * @return {any} Returns null if no prop is found or the prop if it's found.
 */

module.exports = (element) => {
   return element?.[Object.keys(element ?? {}).find(p =>
      p.indexOf('__reactFiber') ||
      p.indexOf('__reactInternalInstance')
   )];
};