import {IKnowledgeManagement} from '../interfaces/km_article';
import {readFile, readdir, stat} from 'fs/promises';
import matter from 'gray-matter';
import {marked} from 'marked';
import {join} from 'path';
import {KM_FOLDER} from '../constants/config';
import {IAuthor, notFoundAuthor, mermerAuthors} from '../interfaces/author_data';

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
    const author = await getAuthor(slug.split('-')[1]);

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

export async function getPosts(src?: string): Promise<IKnowledgeManagement[]> {
  const posts: IKnowledgeManagement[] = [];

  if (!src) {
    const directories = await getDirectories(`./${KM_FOLDER}`);
    for (const directory of directories) {
      const slugs = await getSlugs(directory);
      if (!slugs) return [];
      for (const slug of slugs) {
        const post = await getPost(directory, slug);
        if (post) {
          posts.push(post);
        }
      }
    }
  } else {
    const slugs = await getSlugs(src);
    if (!slugs) return [];
    for (const slug of slugs) {
      const post = await getPost(src, slug);
      if (post) {
        posts.push(post);
      }
    }
  }

  return posts;
}

export async function getAuthor(id: string): Promise<IAuthor> {
  const idLower = id.toLowerCase();
  const author = mermerAuthors.find(author => author.id === idLower) || notFoundAuthor;

  return author;
}

export async function getDirectories(src: string): Promise<string[]> {
  const subdirs = await readdir(src);
  const directories = [];
  for (const subdir of subdirs) {
    const absolutePath = join(src, subdir);
    if ((await stat(absolutePath)).isDirectory()) {
      directories.push(absolutePath);
    }
  }
  return directories;
}
