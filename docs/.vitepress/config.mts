import {defineConfig} from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端学习乐园",
  description: "在这里发表一些自己学习前端的一些文档、资料。",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/stundejzw" }],
    footer: {
      copyright: '<a href="https://beian.miit.gov.cn/" target="_blank">备案号：京ICP备2023019458号-1</a>'
    }
  },
});
