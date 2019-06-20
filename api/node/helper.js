/**
 * Take only passed properties from object if exists 
 * @param keys Array
 * @param obj Object
 */
exports.takeIfExists = function (keys, obj) {
    const values = {};
     keys.forEach(key => {
        if (obj.hasOwnProperty(key)){
            values[key] = obj[key];
        }
    });
    return values;
}