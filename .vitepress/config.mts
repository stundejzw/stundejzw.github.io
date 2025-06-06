import { defineConfig } from 'vitepress'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar'

const isDev = process.env.NODE_ENV === 'development';

const srcExclude: string[] = [];
if (!isDev) {
    srcExclude.push('**/draft/*.md');
}

const slidebarIgnoreList: string[] = [];
if (!isDev) {
    slidebarIgnoreList.push('draft');
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "stundejzw 的在线文档网站",
  description: "个人知识库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/stundejzw' }
    ],
    outline: 'deep',
  },
  cleanUrls: true,
  srcExclude,
  vite: {
    plugins: [
      AutoSidebar({
        path: '.',
        collapsed: false,
        sideBarResolved(value) {
          if (isDev) {
            const docItems = value['/docs/'][0]['items'] as any[] || [];
            const draftItemIndex = docItems.findIndex(v => v.text === 'draft');
            if (draftItemIndex !== -1) {
              const tmp = docItems[draftItemIndex];
              docItems[draftItemIndex] = docItems[0];
              docItems[0] = tmp;
            }
          }
          return value;
        },
        ignoreList: [
            'node_modules',
            '.git',
            '.github',
            '.obsidian',
            ...slidebarIgnoreList,
        ],
      })
    ]
  }
})
