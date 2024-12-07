export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BROWSER: 'chrome' | 'firefox' | 'webkit';
      ENV: 'local' | 'internal' | 'stg' | 'test' | 'prod';
      BASEURL: string;
      HEAD: 'true' | 'false';
    }
  }
}
