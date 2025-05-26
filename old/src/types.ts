export type TopicCollection = Record<string, TopicMetadata[]>;

export type TopicMetadata = {
  filename: string;
  filepath: string;
  title: string;
  endpoint: string;
  [x: string | number | symbol]: string | number;
} & PrioritizedObject;

export type PrioritizedObject = {
  priority?: number;
};
