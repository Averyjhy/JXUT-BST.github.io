import { defineConfig } from 'vitepress'
import type { UserConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';

import VitePressI18n from 'vitepress-i18n';
import VitePressI18nOptions from 'vitepress-i18n';

import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'

import {
  ThumbnailHashImages,
} from '@nolebase/vitepress-plugin-thumbnail-hash/vite'

import { UnlazyImages } from '@nolebase/markdown-it-unlazy-img'

// https://vitepress-sidebar.cdget.com/zhHans/introduction
const vitePressSidebarOptions = [
  /* Options... */
  {
    documentRootPath: '/docs',
    scanStartPath: 'api-docs',
    basePath: '/api-docs/',
    resolvePath: '/api-docs/',
    collapsed: false,
    capitalizeFirst: true,
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    frontmatterOrderDefaultValue: 9,
    sortMenusByFrontmatterOrder: true,
  },
  {
    debugPrint: true,
    documentRootPath: '/docs',
    scanStartPath: 'about',
    basePath: '/about/',
    resolvePath: '/about/',
    collapsed: true,
    collapseDepth: 3,
    capitalizeFirst: true,
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
    sortMenusByFrontmatterOrder: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true, // 使用index文件作为侧边栏链接
  },
];

const vitePressI18nConfig: VitePressI18nOptions = {
  locales: ['zhHans'],
  searchProvider: 'local',
};

const vitePressConfig: UserConfig = {
  vite: {
    plugins: [
      GitChangelog({
        repoURL: () => 'https://github.com/JXUT-BST/JXUT-BST.github.io',
        mapAuthors: [
          {
            name: 'JXUT-BST',
            username: 'JXUT-BST',
            mapByNameAliases: ['JXUT-BST', 'JXUT BST', '蓝色技术工作室'],
          },
          {
            name: 'Alaye-Dong',
            username: 'Alaye-Dong',
          },
        ],
      }),
      GitChangelogMarkdownSection(),
      ThumbnailHashImages(),
    ],
    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        'vitepress',
        '@nolebase/ui',
      ],
    },
    ssr: {
      noExternal: [
        // 如果还有别的依赖需要添加的话，并排填写和配置到这里即可
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/ui',
      ],
    },
  },
  lang: 'zh-CN',
  title: "JXUT-BST-IO-VitePress",
  description: "A VitePress Site",
  head: [["link", { rel: "icon", href: "/bst-logo.svg" }]],
  lastUpdated: true,
  cleanUrls: true,  // 开启后网址后缀无'html'
  markdown: {
    image: {
      // 开启图片懒加载
      lazyLoading: true
    },

    // FIXME 使用后开发服务器正常，但构建后图片会一直显示模糊图请求原图失败，猜测是md文件中文命名的问题，待研究解决
    // // 懒加载模糊预览图
    // config: (md) => {
    //   md.use(UnlazyImages(), {
    //     imgElementTag: 'NolebaseUnlazyImg',
    //   })
    // },
  },

  sitemap: {
    hostname: 'https://lansejishu.com'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: '/bst-logo.svg', width: 24, height: 24 },
    search: {
      provider: 'local',
    },

    nav: [
      { text: '首页', link: '/' },
      { text: '活动推文', link: '/posts' },
      {
        text: '关于我们',
        items: [
          { text: '工作室', link: '/about/about-bst' },
          { text: '团队成员', link: '/team' },
        ]
      },
      { text: '加入我们', link: '/contact/join-us' },
      { text: '知识库', link: 'https://eab6f7z1wy1.feishu.cn/wiki/NOW6w8DUriguJskA5p0cKUjenmc?from=from_copylink' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JXUT-BST' }
    ],

    editLink: {
      pattern: 'https://github.com/JXUT-BST/JXUT-BST.github.io/edit/main/docs/:path',
    },
  }
};

// https://vitepress.dev/reference/site-config
export default defineConfig(
  withSidebar(VitePressI18n.withI18n(vitePressConfig, vitePressI18nConfig), vitePressSidebarOptions),
);