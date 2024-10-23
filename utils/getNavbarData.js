/**
 * Comparison function to sort by object priority
 * @param {Object} a
 * @param {Object} b
 * @returns {Number} 1 if a > b, -1 if a < b, 0 if they're equal
 */
export function comparePriority(a, b) {
  if ((a.priority ?? 999) > (b.priority ?? 999)) return 1;
  else if ((a.priority ?? 999) < (b.priority ?? 999)) return -1;
  return 0;
}

/**
 * Sort the resources according to the directory they're in.
 * @param {[Object]} resources - A list of all the resources to sort.
 * @returns {[Object]} A list of objects with the files sorted by directory.
 */
export function getNavData(resources) {
  let allDirs = new Set(resources.map((r) => r.metadata.folder));
  let dirData = {};
  let rest = [];

  for (let dir of Array.from(allDirs)) {
    // select resources per subject/directory
    let dirResources = resources.filter((r) => r.metadata.folder == dir);

    // only keep metadata and sort resources by priority
    let orderedResources = dirResources
      .map((r) => r.metadata)
      .sort(comparePriority);

    dirData[dir ?? "root"] = orderedResources;
  }

  return dirData;
}
