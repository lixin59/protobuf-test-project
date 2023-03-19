/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    /**
     * 项目主要基础请求前缀
     */
    readonly BASE_ENV_BASE_URL: string;
    // 更多环境变量...
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
