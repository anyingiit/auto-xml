[English](README.md) · **简体中文**

> 英文版是规范版本。本页与 [README.md](README.md) 不一致时，以英文版为准。

<!-- translation-of: README.md sha256:cc9621d274fe6f84 -->

<!-- Source: Best-README-Template BLANK_README (Unlicense) — https://github.com/othneildrew/Best-README-Template -->
<a id="readme-top"></a>

# auto-xml

一个基于 Vue 3 和 TypeScript 构建的 Electron 桌面应用，目前展示的仍是 Vue CLI 默认的初始界面，此外还带有一个尚未接入运行的原型，用于通过 Electron IPC 读取和编辑批处理优化 XML 文件中按名称索引的设计变量取值范围。

[![CI](https://github.com/anyingiit/auto-xml/actions/workflows/ci.yml/badge.svg)](https://github.com/anyingiit/auto-xml/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/anyingiit/auto-xml)](LICENSE)

[报告问题](https://github.com/anyingiit/auto-xml/issues/new?template=bug_report.yml) · [提出需求](https://github.com/anyingiit/auto-xml/issues/new?template=feature_request.yml)

<details>
  <summary>目录</summary>
  <ol>
    <li><a href="#about-the-project">关于本项目</a></li>
    <li><a href="#getting-started">开始使用</a></li>
    <li><a href="#usage">用法</a></li>
    <li><a href="#contributing">参与贡献</a></li>
    <li><a href="#license">许可证</a></li>
    <li><a href="#contact">联系方式</a></li>
  </ol>
</details>

## 关于本项目

auto-xml 是一个 Vue 3 + TypeScript 应用，打包为 Electron 桌面应用：`src/background.ts` 创建 Electron 的 `BrowserWindow`，`src/main.ts` 用 Element Plus 挂载 `App.vue`。这个应用现在实际展示的画面，仍是未经修改的 Vue CLI 初始界面——`App.vue` 目前只是渲染了 `HelloWorld.vue`。真正打算实现的功能则放在 `src/App.vue.bk` 中，这个界面并没有接入 `main.ts`：它通过 IPC 向 Electron 主进程请求 `data/m.xml`，这是一个批处理设计/优化文件，其中的 `<VARIABLE>` 元素（例如 `TWC`，位于 `BATCH_MODE.DESIGNS_DB[0].VARIABLES[0].VARIABLE`，与文件的实际结构完全一致）带有 `lowerbound`/`value`/`upperbound` 属性，该原型按变量名读取或改写这些取值范围。

计划中的功能与已知问题，见 [open issues](https://github.com/anyingiit/auto-xml/issues)。

## 开始使用

### 环境要求

- Node.js 和 Yarn——本仓库使用 `yarn.lock` 锁定依赖，而不是 `package-lock.json`，因此真正能解析出锁定版本的是 `yarn install`
- TypeScript，会作为 `devDependency` 自动安装；构建所需的编译器选项见 `tsconfig.json`

### 安装

```sh
git clone https://github.com/anyingiit/auto-xml.git
cd auto-xml
yarn install
```

## 用法

以开发模式运行桌面端外壳：

```sh
yarn electron:serve
```

如果只想在浏览器中开发 Vue 界面本身、不启动 Electron，改为运行 `yarn serve`。不论哪种方式，实际渲染出来的都是 Vue CLI 默认的初始界面（`App.vue`/`HelloWorld.vue`）——`src/App.vue.bk` 中的 XML 编辑原型目前还没有接入正在运行的应用。

## 参与贡献

欢迎参与。[CONTRIBUTING.md](CONTRIBUTING.md) 说明如何提交 issue 或 pull request，[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) 说明对所有参与者的行为要求。

请不要在公开的 issue 或 pull request 中报告安全问题。[SECURITY.md](SECURITY.md) 说明了私下报告的方式。

## 许可证

以 MIT 许可证分发。详见 [LICENSE](LICENSE)。

## 联系方式

项目地址：[https://github.com/anyingiit/auto-xml](https://github.com/anyingiit/auto-xml)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
