const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Fun Blog",
  base: "/",

  dest: "./dist",

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

    sidebar: "auto",
	  darkmode: "auto",


	blog: {
		"avatar": "/batman.jpg"
	},

	nav: [
          { text: "博客主页", link: "/", icon: "home" },
          { text: "安全", link: "/docs/security/", icon: "safe" },
		      { text: "开发", link: "/docs/develop/git", icon: "shell" },
		      { text: "时间轴", link: "/timeline/", icon: "time" },
        ],

	sidebar: {
      "/docs/security/tools/": [
        {
          title: "安全工具",
          icon: "creative",
          prefix: "/docs/security/tools/",
          children: ["dvcs"],
        },
      ],

      "/docs/security/attack/": [
        {
          title: "渗透",
          icon: "anonymous",
          prefix: "/docs/security/attack/",
          children: [
            {
              title: "信息收集",
              icon: "anonymous",
              prefix: "collection/",
              children: ["info", "passwd"],
            },
            {
              title: "攻击",
              icon: "hot",
              prefix: "attack/",
              children: ["sql_injection", "xss"],
            },
          ],
        },
      ],
      "/docs/security/ctf/": [
        {
          title: "CTF",
          icon: "flag",
          prefix: "/docs/security/ctf/",
          children: ["info"],
        },
      ],
      "/docs/develop/": [
        {
          title: "开发",
          icon: "symbol",
          prefix: "/docs/develop/",
          children: ["git"],
        },
      ],
    },



    footer: {
      display: true,
      content: "Fun Blog",
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
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
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
