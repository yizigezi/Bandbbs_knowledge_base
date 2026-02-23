import { defineConfig } from 'vitepress'
import siteIndex from '../src/index.json'
import {calculateSidebar} from "@nolebase/vitepress-plugin-sidebar";
import {transformVNodeArgs} from "vue";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "米坛知识库",
  description: "",
  srcDir: './src',
  head: [
    [
        'link',
        { 'rel': 'stylesheet', 'href': 'https://i02.appmifile.com/i18n/fonts/MiSansChinese/index.css' }
    ],
      [
          'link',
        { 'rel': 'stylesheet', 'href': 'https://cdn-font.hyperos.mi.com/font/css?family=MiSans:100,200,300,400,500,600:Chinese_Simplify,Latin&display=swap' }
      ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: '知识库',
    logo: '/bandbbs_logo.png',
    nav: siteIndex.nav,

    sidebar: calculateSidebar([
      { folderName: '产品百科', separate: true},
      { folderName: '教程', separate: true }
    ]),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yizigezi/Bandbbs_knowledge_base' }
    ]
  }
})
