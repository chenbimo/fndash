import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

// `moon.mod` 是下面两个事实的唯一出处:版本号与仓库地址都在构建时读取,
// 页面里不写死版本号——页面是会过期的拷贝,而读的是发布本身。
const moonMod = readFileSync(
  fileURLToPath(new URL('../../moon.mod', import.meta.url)),
  'utf8',
)

function moonModField(name) {
  const found = new RegExp(`^\\s*${name}\\s*=\\s*"([^"]+)"`, 'm').exec(moonMod)
  if (found === null) {
    throw new Error(`docs: cannot read ${name} from moon.mod`)
  }
  return found[1]
}

const version = moonModField('version')
const repository = moonModField('repository')

const sidebar = [{ text: '参考', items: [{ text: '现状', link: '/guide/status' }] }]

export default defineConfig({
  // 站点挂在 https://fndash.moonbitlang.dev 这个子域名下,是根路径,所以 base
  // 为 '/'。这是部署形态唯一的切换点:换回子路径部署时,这里要和路径前缀一致,
  // 否则资源与内部链接会指向站点根,打开就是白屏。
  base: '/',
  lang: 'zh-CN',
  title: 'fndash',
  description: '方向未定的 MoonBit 模块。',
  cleanUrls: true,
  outDir: 'dist',
  // 站点图标统一用 site 仓库的素材,与工作区其它站保持同一个印记。
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-touch-icon-180.png' }],
  ],
  themeConfig: {
    socialLinks: [{ icon: 'github', link: repository }],
    nav: [
      // 官网门户入口:每个页面顶栏都能一键回到 moonbitlang.dev。
      { text: 'Moonkit 官网', link: 'https://moonbitlang.dev' },
      { text: '指南', link: '/guide/status' },
      { text: `v${version}`, link: `${repository}/releases` },
    ],
    sidebar: { '/guide/': sidebar },
    outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdated: { text: '最后更新' },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
  },
})
