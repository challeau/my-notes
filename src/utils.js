/**
 * Comparison function to sort by object priority
 * @param {Object} a
 * @param {Object} b
 * @returns {Number} 1 if a > b, -1 if a < b, 0 if they're equal
 */
export function comparePriority(a, b) {
  if ((a.priority ?? 999) > (b.priority ?? 999)) {
    return 1;
  }
  else if ((a.priority ?? 999) < (b.priority ?? 999)) {
    return -1;
  }

  return 0;
}

/**
 * Sort every topic's contents by priority to display the navbar links in order.
 * @param {Object} topics
 */
export function sortTopicListByPriority(topics) {
  for (const key in topics) {
    topics[key].sort(comparePriority);
  }
}
