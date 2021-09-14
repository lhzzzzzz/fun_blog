const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "昔我起舞剑，三尺星斗光",
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

    displayAllHeaders: true,

    sidebarDepth: 3,
  	blog: {
  		"avatar": "/batman.jpg",

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
          collapsable: false,
          children: [
            "",
			{
              title: "信息收集",
              icon: "info",
              collapsable: false,
              children: ["cvs"],
            },
            {
              title: "解密工具",
              icon: "underscore",
              collapsable: false,
              children: ["jwt-cracker", "hashcat"],
            },
			{
              title: "账号破解工具",
              icon: "question",
              collapsable: false,
              children: ["hydra"],
            },
            {
              title: "渗透工具",
              icon: "launch",
              collapsable: false,
              children: ["gopherus"],
            },
          ],
        },
      ],

      "/docs/security/collection/": [
            {
              title: "信息收集",
              icon: "anonymous",
              prefix: "./",
              collapsable: false,
              children: ["web_file", "passwd"],
            },
          ],
    "/docs/security/target/": [
          {
            title: "靶机",
            icon: "anonymous",
            prefix: "./",
            collapsable: false,
            children: [
              {
                title: "vulnhub",
                icon: "page",
                prefix: "./vulnhub/",
                collapsable: false,
                children: ["dc1", "dc2"],
              },

            ],
          },
        ],
      "/docs/security/web/": [
          {
            title: "Web",
            icon: "hot",
            prefix: "./",
            collapsable: false,
            children: ["sql_injection", "xss", "file_include", "cms"],
          },
        ],



      "/docs/security/ctf/": [
        {
          title: "writeup",
          icon: "flag",
          prefix: "/docs/security/ctf/",
          collapsable: false,
          children: ["ctfhub_ssrf"],
        },
      ],
      "/docs/develop/": [
        {
          title: "开发",
          icon: "symbol",
          prefix: "/docs/develop/",
          collapsable: false,
          children: ["git"],
        },
      ],
    },



    footer: {
      display: true,
      content: "lhz",
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
