# fndash 仓库约定

通用规范见 `moonbit/scripts/NEW-PROJECT.md`(工作区公共仓库,不在本仓库内),本文件只写本仓库特有的值。

## 工具链

- 以 WSL(Debian)为准,路径走 `/mnt/c/...`
- 构建目录:`_build-wsl`

## 常用命令

```bash
# 工作区 devkit.sh
wsl -d Debian --cd /mnt/c/codes/moonbit bash scripts/devkit.sh check fndash
```

## 提交格式

```text
[fndash](类型) 中文一句话
```

类型:`feat` / `fix` / `docs` / `refactor` / `test` / `chore`。由 `commit-msg` 钩子强制校验。

## 文档站

- VitePress 站点在 `docs/`，中文单语；构建命令 `bun install --frozen-lockfile && bun run build`，输出 `dist`
- 托管于 Cloudflare Pages 项目 `moonbit-fndash`，自定义域 `fndash.moonbitlang.dev`（CNAME 指向 `moonbit-fndash.pages.dev`），监听路径 `docs/*` 与 `moon.mod`——发版时改了 version 站点才会跟着更新
- 构建环境变量 `BUN_VERSION=1.4.3` 与 `SKIP_DEPENDENCY_INSTALL=1`，production 与 preview 都设，原因见工作区规范 `NEW-PROJECT.md`
- 依赖与构建可本地跑（`bun install && bun run build`），`node_modules` 与 `dist` 不跟踪
- 部署只靠 GitHub App「Cloudflare Workers and Pages」的 push 自动化，仓库里不存凭据，不加 workflow
- 本仓库暂无 `src/`，verify 只有快门禁与审计，没有编译门

## 硬性约定

方向未定,约定随后补。当前唯一的实质约定:不提供业务 API,仓库只有骨架与基础设施。
