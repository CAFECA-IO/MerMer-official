import {IKnowledgeManagement} from '../interfaces/km_article';
import {readFile} from 'fs/promises';
import matter from 'gray-matter';
import {marked} from 'marked';
import {julianData, notFoundAuthor} from '../interfaces/author_data';

export async function getPost(src: string, slug: string): Promise<IKnowledgeManagement | null> {
  try {
    const source = await readFile(`${src}/${slug}.md`, 'utf-8');
    const {
      data: {date, title, description, cagetory},
      content,
    } = matter(source);

    marked.setOptions({headerIds: false, mangle: false});

    const body = marked(content);

    const picture = `/km/${slug}.png`;

    const author = slug.includes('julian') ? julianData : notFoundAuthor;

    return {id: slug, date, title, description, content: body, cagetory, picture, author: author};
  } catch (error) {
    return null;
  }
}
