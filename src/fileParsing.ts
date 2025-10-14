import { readdirSync } from "node:fs";
import { open } from "node:fs/promises";
import * as path from "path";

import type { TopicCollection, TopicMetadata } from "./types.ts";
import { capitalize, sortTopicCollectiontByPriority } from "./utils.ts";

/**
 * Parse the metadata found in the first few lines of a file
 * The parsing stops at the first occurence of a non-comment line (ie, one that doesn't
 * start with "[//]: #").
 * 
 * -> This function will be replaced when super-parser is functional
 */
export async function getNoteFileMetadata(parentPath: string, filename: string): Promise<TopicMetadata> {
  const filepath = path.join(parentPath, filename);
  const file = await open(filepath);
  const defaultName = path.parse(filename).name;

  const metadata: TopicMetadata = {
    filename,
    filepath,
    title: capitalize(defaultName),
    endpoint: "/" + defaultName,
  };

  for await (const line of file.readLines()) {
    // Skip empty lines
    if (line == "") {
      continue;
    }

    // If we encounter a non-comment line, we're done parsing
    if (!line.startsWith("[//]: #")) {
      file.close();
      return metadata;
    }

    // Get the metadata value in each comment
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
export async function getTopicsFromFilepath(filepath: string): Promise<TopicCollection> {
  const topics: TopicCollection = {};
  const orphanTopics: TopicMetadata[] = [];
  const dirents = readdirSync(filepath, { withFileTypes: true, recursive: true });

  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      topics[dirent.name] = [];
      continue;
    }
    
    if (dirent.isFile() && dirent.name.match(".md$")) {
      const parentDirname = dirent.parentPath.match("([^/]*)/*$")?.[1] ?? '';
      const fileMetadata = await getNoteFileMetadata(dirent.parentPath, dirent.name);

      if (parentDirname in topics) {
        topics[parentDirname].push(fileMetadata);
      }
      else {
        orphanTopics.push(fileMetadata);
      }
    }
  }

  topics['Others'] = orphanTopics;
  sortTopicCollectiontByPriority(topics);

  return topics;
}
