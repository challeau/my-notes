import { PrioritizedObject, TopicCollection } from "./types.ts";

/**
 * Compares two object's priority fields
 * @returns {Number} 1 if a > b, -1 if a < b, 0 if they're equal
 */
export function comparePriority<T extends PrioritizedObject>(a: T, b: T) {
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
 */
export function sortTopicCollectiontByPriority(topics: TopicCollection) {
  for (const key in topics) {
    topics[key].sort(comparePriority);
  }
}
