function isObject(object) {
    return object != null && typeof object === 'object';
}

export function isEqual(object1, object2) {
    const areObjects = isObject(object1) && isObject(object2);

    if (!areObjects) return false;

    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        const value1 = object1[key];
        const value2 = object2[key];

        if (value1 !== value2) {
            return false;
        }
    }

    return true;
}