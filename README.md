<!-- Source: Best-README-Template BLANK_README (Unlicense) — https://github.com/othneildrew/Best-README-Template -->
<a id="readme-top"></a>

# auto-xml

An Electron desktop app built with Vue 3 and TypeScript that currently ships the default Vue CLI starter screen, alongside an unwired prototype for reading and editing named design-variable bounds in a batch-mode optimization XML file over Electron IPC.

**English** · [简体中文](README.zh-CN.md)

[![CI](https://github.com/anyingiit/auto-xml/actions/workflows/ci.yml/badge.svg)](https://github.com/anyingiit/auto-xml/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/anyingiit/auto-xml)](LICENSE)

[Report a bug](https://github.com/anyingiit/auto-xml/issues/new?template=bug_report.yml) · [Request a feature](https://github.com/anyingiit/auto-xml/issues/new?template=feature_request.yml)

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

auto-xml is a Vue 3 + TypeScript app packaged as an Electron desktop app: `src/background.ts` creates the Electron `BrowserWindow`, and `src/main.ts` mounts `App.vue` with Element Plus. The screen the app actually shows today is the unmodified Vue CLI starter — `App.vue` still just renders `HelloWorld.vue`. The intended feature lives in `src/App.vue.bk`, a UI that is not wired into `main.ts`: it asks the Electron main process, over IPC, for `data/m.xml`, a batch-mode design/optimization file whose `<VARIABLE>` elements (for example `TWC`, under `BATCH_MODE.DESIGNS_DB[0].VARIABLES[0].VARIABLE`, exactly as the file is structured) carry `lowerbound`/`value`/`upperbound` attributes, and reads or rewrites those bounds by variable name.

See the [open issues](https://github.com/anyingiit/auto-xml/issues) for planned features and known issues.

## Getting Started

### Prerequisites

- Node.js and Yarn — the repository is locked with `yarn.lock`, not `package-lock.json`, so `yarn install` is what actually resolves the pinned dependency versions
- TypeScript, installed automatically as a `devDependency`; see `tsconfig.json` for the compiler options the build expects

### Installation

```sh
git clone https://github.com/anyingiit/auto-xml.git
cd auto-xml
yarn install
```

## Usage

Run the desktop shell in development mode:

```sh
yarn electron:serve
```

To work on the Vue UI alone in a browser, without Electron, run `yarn serve` instead. Either way, what actually renders is the default Vue CLI starter screen (`App.vue`/`HelloWorld.vue`) — the XML-editing prototype in `src/App.vue.bk` is not wired into the running app yet.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for how to open an issue or a pull request, and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for the standards expected of everyone taking part.

Please do not report security issues in public issues or pull requests. [SECURITY.md](SECURITY.md) explains how to report them privately.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

## Contact

Project link: [https://github.com/anyingiit/auto-xml](https://github.com/anyingiit/auto-xml)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
