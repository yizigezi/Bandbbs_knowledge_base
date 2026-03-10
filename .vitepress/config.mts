import { defineConfig } from "vitepress";
import siteIndex from "../src/index.json";
import productWikiIndex from "../src/ProductWiki/index";


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
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.png"
      }
    ],
    [
      'script',
      {},
      `(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "vtp36svnhr");`
    ]
  ],
  sitemap: {
    hostname: "https://wiki.bandbbs.cn",
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: "知识库",
    logo: "/bandbbs_logo.png",
    nav: siteIndex.nav,
    outline: {
      level: [2, 3],
    },

    // 自动生成多侧边栏 - 自动扫描 src 下的所有目录并为每个目录生成独立的侧边栏
    sidebar: {
      "/ProductWiki/": [
        {
          text: "产品百科",
          items: productWikiIndex
        }
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/yizigezi/Bandbbs_knowledge_base",
      },
    ],
    search: {
      provider: "algolia",
      options: {
        appId: "R0W6PSVX9W",
        apiKey: "df9b5ed790ee783af298d8afa4b9177a",
        indexName: 'bandbbswiki'
      },
    },
    editLink: {
      pattern: "https://github.com/Bandbbs/Bandbbs_knowledge_base/edit/main/src/:path"
    },
    footer: {
      copyright: "Copyright ©2019-2026 米坛社区. all right reserved."
    },
    lastUpdated: {
      text: "上次更新",
    },
  },
});
