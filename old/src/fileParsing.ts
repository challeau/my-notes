import { readdirSync } from "node:fs";
import { open } from "node:fs/promises";
import * as path from "path";

import {
  type TopicCollection,
  type TopicMetadata,
  sortTopicCollectiontByPriority,
} from "./index.ts";


/**
 * Parse the metadata found in the first few lines of a file
 * The parsing stops at the first occurence of a non-comment line (ie, one that doesn't
 * start with "[//]: #"). This includes empty lines.
 * 
 * -> This function will be replaced when super-parser is functional
 */
export async function getNoteFileMetadata(parentPath: string, filename: string) {
  const filepath = path.join(parentPath, filename);
  const file = await open(filepath);
  const defaultName = path.parse(filename).name;

  const metadata: TopicMetadata = {
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

    if (data && data[0] !== null && data[1] !== null) {
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
 */
export async function getTopicsFromFilepath(filepath: string) {
  const topics: TopicCollection = {};
  const dirents = readdirSync(filepath, { withFileTypes: true, recursive: true });

  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      topics[dirent.name] = [];
      continue;
    }

    if (dirent.isFile() && dirent.name.match(".md$")) {
      const parentDirnameMatch = dirent.parentPath.match("([^/]*)/*$");
      const parentDirname = parentDirnameMatch ? parentDirnameMatch[1] : 'Other';

      const fileMetadata = await getNoteFileMetadata(dirent.parentPath, dirent.name);

      if (parentDirname in topics) {
        topics[parentDirname].push(fileMetadata);
        continue;
      }
    }
  }

  sortTopicCollectiontByPriority(topics);

  return topics;
}
