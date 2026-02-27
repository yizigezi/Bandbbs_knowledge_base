import { defineConfig } from "vitepress";
import siteIndex from "../src/index.json";
// @ts-ignore
import { generateMultiSidebar } from "./sidebar.mjs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "米坛知识库",
  description: "",
  srcDir: "./src",
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://i02.appmifile.com/i18n/fonts/MiSansChinese/index.css",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn-font.hyperos.mi.com/font/css?family=MiSans:100,200,300,400,500,600:Chinese_Simplify,Latin&display=swap",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: "知识库",
    logo: "/bandbbs_logo.png",
    nav: siteIndex.nav,

    // 自动生成多侧边栏 - 自动扫描 src 下的所有目录并为每个目录生成独立的侧边栏
    sidebar: generateMultiSidebar("src", {
      // 使用h1的标题作为侧边栏的标题
      useTitleFromFileHeading: true,
      // 使用文件夹的index.md
      useFolderTitleFromIndexFile: true,
      // 指向文件夹的链接
      useFolderLinkFromIndexFile: true,
      // 根据md文件的order进行排序
      sortMenusByFrontmatterOrder: true,
      // 排序之后将不是文件夹的放后面
      sortFolderTo: "top",
      // 菜单展开功能
      collapsed: false,
    }),

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/yizigezi/Bandbbs_knowledge_base",
      },
    ],
  },
});
