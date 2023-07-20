import {IKnowledgeManagement} from '../interfaces/km_article';
import {readFile, readdir} from 'fs/promises';
import matter from 'gray-matter';
import {marked} from 'marked';
import {julianData, notFoundAuthor} from '../interfaces/author_data';

export async function getPost(src: string, slug: string): Promise<IKnowledgeManagement | null> {
  try {
    const source = await readFile(`${src}/${slug}.md`, 'utf-8');
    const {
      data: {date, title, description, category},
      content,
    } = matter(source);

    marked.setOptions({headerIds: false, mangle: false});

    const body = marked(content);
    const picture = `/km/${slug}.png`;
    const author = slug.includes('julian') ? julianData : notFoundAuthor;

    return {
      id: slug,
      date,
      title,
      description,
      content: body,
      category,
      picture,
      author: author,
    };
  } catch (error) {
    return null;
  }
}

export async function getSlugs(src: string): Promise<string[] | undefined> {
  const suffix = '.md';
  try {
    const files = await readdir(src);
    return files.filter(file => file.endsWith(suffix)).map(file => file.slice(0, -suffix.length));
  } catch (e) {
    // Info: (20230720 - Julian) do nothing if error
  }
}

export async function getPosts(src: string): Promise<IKnowledgeManagement[]> {
  const posts: IKnowledgeManagement[] = [];

  const slugs = await getSlugs(src);
  if (!slugs) return [];
  for (const slug of slugs) {
    const post = await getPost(src, slug);
    if (post) {
      posts.push(post);
    }
  }

  return posts;
}
