import {useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
// Info: (20250515 - Julian) 語言填色
import 'prismjs/components/prism-javascript'; // Javascript
import 'prismjs/components/prism-typescript'; // Typescript
import 'prismjs/components/prism-css'; // CSS
import 'prismjs/components/prism-bash'; // Bash
import 'prismjs/components/prism-jsx'; // JSX
import 'prismjs/components/prism-tsx'; // TSX
import 'prismjs/components/prism-python'; // Python
import 'prismjs/components/prism-json'; // JSON
import 'prismjs/components/prism-solidity'; // Solidity
import 'prismjs/components/prism-xml-doc'; // XML
// Info: (20250515 - Julian) 行數編號
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

const PrismLoader: React.FC = () => {
  useEffect(() => {
    Prism.highlightAll();

    // Info: (20250515 - Julian) 取得所有 pre 標籤
    const pres = document.querySelectorAll('pre');

    pres.forEach(pre => {
      // Info: (20250515 - Julian) 避免重複插入按鈕
      if (pre.querySelector('.copy-button')) return;

      const button = document.createElement('button');
      button.textContent = 'Copy';
      button.className =
        'copy-button absolute top-2 right-2 text-white text-xs px-2 bg-gray-500 py-1 rounded enabled:hover:bg-lightBlue1';

      // Info: (20250515 - Julian) 複製邏輯
      button.addEventListener('click', () => {
        const code = pre.querySelector('code');
        if (!code) return;

        // Info: (20250515 - Julian) 複製到剪貼簿 -> 將文字改變成 Copied! -> 按鈕停用 2 秒
        navigator.clipboard.writeText(code.textContent || '');
        button.textContent = 'Copied!';
        button.disabled = true;
        setTimeout(() => {
          button.textContent = 'Copy';
          button.disabled = false;
        }, 1000);
      });

      // Info: (20250515 - Julian) 包裹 pre 為 relative，並加入按鈕
      pre.classList.add('relative');
      pre.appendChild(button);
    });
  }, []);

  return <></>;
};

export default PrismLoader;
