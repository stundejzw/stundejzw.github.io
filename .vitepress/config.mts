import { defineConfig } from 'vitepress'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "stundejzw 的在线文档网站",
  description: "个人知识库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    outline: 'deep',
  },
  cleanUrls: true,
  srcExclude: [
    '**/draft/*.md',
  ],
  vite: {
    plugins: [
      AutoSidebar({
        path: '.',
        collapsed: false,
        ignoreList: [
            '.obsidian',
            '.git',
            'draft',
        ],
      })
    ]
  }
})
