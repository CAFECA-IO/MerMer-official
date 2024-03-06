import type { Km, Category, Topic } from "@prisma/client";
export interface IKmMeta extends Omit<Km, 'mdFile'|'topicId'> {
  categories: Category[];
  topic: Topic;
}

export type IAllKmMeta = {
  drafts: {
    publishStatus: 'Drafts',
    kmMetas?:IKmMeta[]
  },
  published: {
    publishStatus: 'Published',
    kmMetas?:IKmMeta[]
  },
};

export interface IKm extends Km{
  categories?: Category[];
  topic: Topic;
}

export interface IKmTag extends Category {
  __isNew__?: boolean;
}

export interface IKmForSave {
  title: string;
  selectedKmTopicName: string;
  description: string;
  tags: IKmTag[];
  isNewImage: boolean;
  mdFile: string;
  isPublished: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIKmTag(arg: any): arg is IKmTag {
  return (
      typeof arg?.id === 'number' &&
      typeof arg?.label === 'string' &&
      typeof arg?.value === 'string'
    );
}

// Info (20240316 - Murky) 這個function是用來檢查IKmForSave的型別,輸入可以是any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIKmForSave(arg: any): arg is IKmForSave {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allTagValid = arg?.tags?.every((tag: any) => isIKmTag(tag));
  return (
      typeof arg?.title === 'string' &&
      typeof  arg?.selectedKmTopicName === 'string' &&
      allTagValid &&
      typeof arg?.description === 'string' &&
      typeof arg?.isNewImage === 'boolean' &&
      typeof arg?.mdFile === 'string' &&
      typeof arg?.isPublished === 'boolean'
    );
}