import {IHTMLHeadTag} from '../constants/html_tag';

export interface ITableOfContentsItem {
  id: string;
  title: string;
  level: IHTMLHeadTag;
  index: number;
}
