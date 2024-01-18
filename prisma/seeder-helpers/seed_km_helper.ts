import { readFile, readdir } from 'fs/promises';
import categoryData from '../jsons/category_data.json'
import { CategoryData } from '../jsons/interface/category_data_interface';
import matter from 'gray-matter';

export async function getPost(src: string, slug: string) {
  const SECOND_TO_MILLISECOND_ = 1000
  try {
    const source = await readFile(`${src}/${slug}.md`, 'utf-8');
    const {
      data: {date, title, description, picture, category, authorId},
      content,
    } = matter(source);

    return {
      id: slug.split('-')[1],
      date: new Date ( date * SECOND_TO_MILLISECOND_), // Info: (20240116 - Murky) km use unit timestamp which is by second, need to convert into mine
      title,
      description,
      mdFile:content,
      categories: getCategories(category),
      picture,
      authorId,
    };
  } catch (e) {
    throw new Error(`Error occur when processing getPost function in seed_km_helper: \n {e}`)
  }
}

export async function getSlugs(src: string): Promise<string[]> {
  const suffix = '.md';
  try {
    const files = await readdir(src);
    return files.filter(file => file.endsWith(suffix)).map(file => file.slice(0, -suffix.length));
  } catch (e) {
    // Info: (20230720 - Julian) do nothing if error
    throw new Error(`Error occur when processing getSlugs function in seed_km_helper: \n {e}`)
  }
}

export  function getCategories(categories: string[]): string[] {
  const categoryConvert: CategoryData = categoryData;
  categories = categories.map((category: string) => {
    const categoryKey = category.split('.')[1];
    return categoryConvert[categoryKey];
  });

  return categories;
}

