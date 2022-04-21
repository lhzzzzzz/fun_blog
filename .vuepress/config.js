const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "sub esp,∞",
  base: "/",

  dest: "./dist",
  sidebar: false,
  head: [
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
    },
  },

  themeConfig: {
    logo: "/batman.jpg",
    hostname: "http://www.liuhanzhe.com/",

    author: "lhz",
    repo: "https://github.com/lhzzzzzz/fun_blog",
    docsBranch: "master",
	  darkmode: "auto",

    displayAllHeaders: true,

    sidebarDepth: 3,
  	blog: {
  		"avatar": "/batman.jpg",

  	},

	nav: [
          { text: "博客主页", link: "/", icon: "home" },
          { text: "安全", link: "/docs/security/索引.md", icon: "anonymous" },
          { text: "其他", link: "/docs/其他/0.readme.md", icon: "editor" },
		      { text: "时间轴", link: "/timeline/", icon: "time" },
        ],
    footer: {
      display: true,
      content: "<a href='https://beian.miit.gov.cn/' target='_blank'>陕ICP备2022004412号</a>",
    },

    comment: {
      type: "waline",
      serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    copyright: {
      status: "global",
    },

    git: {
      timezone: "Asia/Shanghai",
      contributor: false,
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard",
        ],
      },
    },

    pwa: {
      favicon: "/favicon.ico",
      cachePic: true,
      apple: {
        icon: "/assets/icon/logo.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/logo.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/logo.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/logo.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/logo.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/guide/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
  },
});
