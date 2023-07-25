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
      data: {date, title, description, picture, category, authorId},
      content,
    } = matter(source);

    marked.setOptions({headerIds: false, mangle: false});

    const body = marked(content);
    const author = await getAuthor(authorId);

    return {
      id: slug,
      date,
      title,
      description,
      content: body,
      category,
      picture,
      author,
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

export async function getPosts(): Promise<IKnowledgeManagement[]> {
  const posts: IKnowledgeManagement[] = [];
  const slugs = await getSlugs(KM_FOLDER);
  if (!slugs) return [];
  for (const slug of slugs) {
    const post = await getPost(KM_FOLDER, slug);
    if (post) {
      posts.push(post);
    }
  }

  return posts;
}

export async function getCategories(): Promise<string[]> {
  const categories: string[] = [];
  const allPosts = await getPosts();
  for (const post of allPosts) {
    for (const category of post.category) {
      // Info: (20230721 - Julian) 確認分類不存在才加入
      if (!categories.includes(category)) {
        categories.push(category);
      }
    }
  }

  return categories;
}

// Info: (20230721 - Julian) 抓取特定作者的文章
export async function getPostsByAuthor(authorId: string): Promise<IKnowledgeManagement[]> {
  const posts: IKnowledgeManagement[] = [];
  const allPosts = await getPosts();
  for (const post of allPosts) {
    if (post.author.id === authorId) {
      posts.push(post);
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
