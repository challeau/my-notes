/**
 * Compares two object's priority fields
 * @returns {Number} 1 if a > b, -1 if a < b, 0 if they're equal
 */
export function comparePriority(a, b) {
    var _a, _b, _c, _d;
    if (((_a = a.priority) !== null && _a !== void 0 ? _a : 999) > ((_b = b.priority) !== null && _b !== void 0 ? _b : 999)) {
        return 1;
    }
    else if (((_c = a.priority) !== null && _c !== void 0 ? _c : 999) < ((_d = b.priority) !== null && _d !== void 0 ? _d : 999)) {
        return -1;
    }
    return 0;
}
/**
 * Sort every topic's contents by priority to display the navbar links in order.
 */
export function sortTopicCollectiontByPriority(topics) {
    for (var key in topics) {
        topics[key].sort(comparePriority);
    }
}
