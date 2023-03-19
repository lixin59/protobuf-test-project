#  WebSocket 传输 Protobuf 格式的数据的示例项目

## 建议使用nvm安装node环境
[下载windows安装包](https://github.com/coreybutler/nvm-windows/releases)

## 安装node并使用 (windows需要使用管理员权限打开终端)
```shell
nvm install 16.15.0
nvm use 16.15.0
```
## 安装 pnpm
```shell
npm i -g pnpm
```

### npm的版本应该大于7.x, 如果npm版本小于7.x或者husky没有生效应该手动执行
```shell
npx husky install
```


## 依赖安装
详情参考pnpm文档 https://pnpm.io/zh/installation
### 为整个项目安装依赖
```shell
pnpm i
```
### 全局依赖
如果依赖包在所有仓库中共享只需要安装一份（如vue、axios），那么我们应该安装到项目的根目录
```shell
pnpm add <package_name> -w
```

### 局部依赖
对于某些依赖，可能仅存在于某几个 package 中。为其中一个子仓库添加依赖 如`pnpm i @types/qs --filter web`
```shell
pnpm add <package_name> --filter <package_selector>
```
### link 机制
在 monorepo 中，我们往往需要 package 间的引用，比如本仓库中的`@/business`就会被`web`依赖。
我们可以使用类似于局部依赖中的方法安装：
```shell
pnpm add @business --filter web --workspace
```

## 仓库说明
子仓库如果是工具类型的仓库,在`package.json`中`name`的命名应该为`@/<子仓文件夹名>`
如`business`仓库命名为 `@/business`
```text
├── package.json
├── packages
│   ├── sever   //  服务端
│   └── web     //  客户端
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## 运行
```shell
pnpm dev
```
