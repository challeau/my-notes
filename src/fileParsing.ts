import { readdirSync } from "node:fs";
import { open } from "node:fs/promises";
import * as path from "path";

import type { TopicCollection, TopicMetadata } from "./types";
import { capitalize, sortTopicCollectiontByPriority } from "./utils";


/**
 * Extract the table of contents from the notes file
 */


/**
 * Parse the metadata found in the first few lines of a file
 * Parsing stops at the first occurence of a non-comment line
 * (ie, one that doesn't start with "[//]: #")
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
 * Parse the filepath to get a list of all markdown files (and their metadata) sorted by topic.
 */
export async function getTopicsFromFilepath(filepath: string): Promise<TopicCollection> {
  const topics: TopicCollection = {};
  const orphanTopics: TopicMetadata[] = [];
  const dirents = readdirSync(filepath, { withFileTypes: true, recursive: true });

  for (const dirent of dirents) {
    // Add topic to topic list
    if (dirent.isDirectory()) {
      topics[dirent.name] = [];
      continue;
    }

    // Add file metadata to topic
    if (dirent.isFile() && dirent.name.match(".md$")) {
      const parentDirname = dirent.parentPath.match("([^/]*)/*$")?.[1] ?? '';
      const fileMetadata = await getNoteFileMetadata(dirent.parentPath, dirent.name);
      const topic = parentDirname in topics ? topics[parentDirname] : orphanTopics;
      
      topic.push(fileMetadata);
    }
  }

  // Add oprhan topics to the end of the topic list
  topics['Others'] = orphanTopics;

  // Sort each file in a topic by priority
  sortTopicCollectiontByPriority(topics);

  return topics;
}
