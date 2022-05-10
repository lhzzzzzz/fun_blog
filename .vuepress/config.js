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
    logo: "/bat.png",
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
          { text: "安全", link: "/docs/security/索引/", icon: "anonymous" },
          { text: "其他", link: "/docs/其他/0.readme/", icon: "editor" },
          { text: "收集", link: "/docs/收集/0.readme/", icon: "box" },
		      { text: "时间轴", link: "/timeline/", icon: "time" },
        ],
    footer: {
      display: true,
      content: "<div style='width:480px;margin:0 auto; padding:20px 0;'><a target='_blank' href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=61010302000904' style='display:inline-block;text-decoration:none;height:20px;line-height:20px;'><img src='beian.png' style='float:left;'/><p style='float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;'>陕公网安备 61010302000904号</p></a><a href='https://beian.miit.gov.cn/' target='_blank' style='display:inline-block;text-decoration:none;height:20px;line-height:20px;'><p style='float:right;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;'>陕ICP备2022004412号</p></a></div>",
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
