'use strict';

const _ = require('lodash');

/**
 * Iteratively assign properties of source objects to a
 * destination object for all destination properties that resolve to `undefined`.
 * Source objects are applied from left to right. Once a property is set,
 * additional values of the same property are ignored.
 * 
 * A function can be given instead of a source object, it will be invoked with the destination object at the
 * current iteration. A source object is expected to be returned.
 * 
 * A function can also be given for any of the property values on the source object and it will only be invoked if 
 * the destination property resolves to `undefined`.
 *
 * @param {...Object|Function} [sources] Source objects.
 * @returns {Object} Returns `object`.
 */
const defa = function () {

    const obj = {};

    // Iterate each "layer" of defaults
    _.forEach(arguments, defaults => {

        // If the current "layer" is a function, invoke it with the current state of the object
        if (_.isFunction(defaults)) defaults = defaults(obj);

        // If the current layer is not an object at this point, abort this iteration
        if (!_.isObject(defaults)) return;

        // Iterate over the properties in the current layer
        _.forEach(defaults, (val, key) => {
            if (_.isUndefined(obj[key])) {

                // If the given replacement value is a function, invoke the function
                if (_.isFunction(val)) val = val();
                obj[key] = val;
            }
        });
    });

    return obj;
};

module.exports = defa;