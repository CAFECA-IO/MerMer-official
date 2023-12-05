import {GetServerSideProps} from 'next';
import {MERURL} from '../constants/url';
import {DOMAIN, KM_FOLDER} from '../constants/config';
import {jobList} from '../constants/jobs';
import {getSlugs} from '../lib/posts';
import fs from 'fs';

// (20231205 - Julian) 預設匯出
export default function Sitemap() {
  return null;
}

// (20231205 - Julian) 生成 sitemap.xml
export const getServerSideProps: GetServerSideProps = async ctx => {
  // (20231205 - Julian) 設置響應標頭為 XML
  ctx.res.setHeader('Content-Type', 'text/xml');

  // (20231205 - Julian) 生成 sitemap 的內容
  const xml = await generateSitemap();

  // (20231205 - Julian) 寫入 sitemap 內容到響應中
  ctx.res.write(xml);

  // (20231205 - Julian) 結束響應
  ctx.res.end();

  // (20231205 - Julian) 返回一個空的 props 對象，因為在 SSR 中必須返回一個包含數據的對象
  return {
    props: {},
  };
};

// (20231205 - Julian) 生成 XML 字串
async function generateSitemap(): Promise<string> {
  // (20231205 - Julian) 取得所有頁面
  const pages = await getPages();

  // (20231205 - Julian) 生成 XML 字串
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  // (20231205 - Julian) 將每個 URL 項目轉換成 XML 字串
  .map(page => {
    return `<url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${page.updated}</lastmod>
  </url>`;
  })
  // (20231205 - Julian) 將所有 URL 項目拼接成一個完整的 sitemap 文檔
  .join('')}
    </urlset>`;
}

// Info: (20231205 - Julian) 取得檔案的最後修改日期
function getLastModifiedDate(filepath: string) {
  const stats = fs.statSync(filepath);

  // Info: (20231205 - Julian) 格式化日期
  const formattedMonth =
    stats.mtime.getMonth() + 1 < 10 ? `0${stats.mtime.getMonth() + 1}` : stats.mtime.getMonth() + 1;
  const formattedDay =
    stats.mtime.getDate() < 10 ? `0${stats.mtime.getDate()}` : stats.mtime.getDate();

  const formattedDate = `${stats.mtime.getFullYear()}-${formattedMonth}-${formattedDay}`;
  return formattedDate;
}

async function getPages() {
  // Info: (20231205 - Julian) 取得首頁、Hiring、KM 的最後更新日期
  const indexUpdated = getLastModifiedDate('./src/pages/index.tsx');
  const hiringUpdated = getLastModifiedDate(`./src/pages${MERURL.HIRING}.tsx`);
  const kmUpdated = getLastModifiedDate(`./src/pages${MERURL.KM}/[kmId].tsx`);

  // Info: (20231205 - Julian) 取得全部 KM 的 URL
  const slugs = (await getSlugs(KM_FOLDER)) ?? [];

  const kmPosts = slugs.map(slug => {
    // Info: (20231205 - Julian) 取得 KM 最後更新日期
    const kmDate = getLastModifiedDate(`./src/km/${slug}.md`);
    return {
      url: `${MERURL.KM}/${slug}`,
      updated: kmDate,
    };
  });

  // Info: (20231205 - Julian) 取得 Jobs 的 URL
  const jobs = jobList.map(job => {
    // Info: (20231205 - Julian) 取得 Job 的最後更新日期
    const jobDate = getLastModifiedDate(`./src/constants/jobs.ts`);
    return {
      url: `${MERURL.HIRING}/#${job.anchor}`,
      updated: jobDate,
    };
  });

  // Info: (20231205 - Julian) 所有的 URL 項目
  const posts = [
    {
      url: MERURL.INDEX,
      updated: indexUpdated,
    },
    {
      url: MERURL.HIRING,
      updated: hiringUpdated,
    },
    {
      url: MERURL.KM,
      updated: kmUpdated,
    },
    ...kmPosts,
    ...jobs,
  ];

  return posts;
}
