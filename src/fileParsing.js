import { readdirSync } from "node:fs";
import { open } from "node:fs/promises";
import path from "path";

import { sortTopicListByPriority } from "./utils.js";

/**
 * Parse the metadata found in the first few lines of a file
 * The parsing stops at the first occurence of a non-comment line (ie, one that doesn't
 * start with "[//]: #"). This includes empty lines.
 * @param {string} parentPath 
 * @param {string} filename 
 */
export async function getNoteFileMetadata(parentPath, filename) {
  const filepath = path.join(parentPath, filename);
  const file = await open(filepath);
  const defaultName = path.parse(filename).name;

  const metadata = {
    filename,
    filepath,
    title: defaultName,
    endpoint: "/" + defaultName,
  };

  for await (const line of file.readLines()) {
    if (!line.startsWith("[//]: #")) {
      file.close();
      return metadata;
    }

    const data = line.match(/(?<=((?<=\()[A-Z]* )).*(?=\))/);

    if (data[0] !== null && data[1] !== null) {
      const key = data[1].toLowerCase().trim();
      const value = data[0];

      metadata[key] = value;
    }
  }

  file.close();
  return metadata;
}

/**
 * Recursively parse the filepath to get a list of all markdown files (and their metadata)
 * sorted by subject.
 * @param {string} filepath 
 */
export async function getTopicsFromFilepath(filepath) {
  const topics = {};
  const orphanFiles = [];
  const dirents = readdirSync(filepath, { withFileTypes: true, recursive: true });

  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      topics[dirent.name] = [];
      continue;
    }

    if (dirent.isFile() && dirent.name.match(".md$")) {
      const parentDirname = dirent.parentPath.match("([^/]*)/*$")[1];
      const fileMetadata = await getNoteFileMetadata(dirent.parentPath, dirent.name);

      if (parentDirname in topics) {
        topics[parentDirname].push(fileMetadata);
        continue;
      }

      orphanFiles.push(fileMetadata);
    }
  }

  topics.Other = orphanFiles;
  sortTopicListByPriority(topics);

  return topics;
}
