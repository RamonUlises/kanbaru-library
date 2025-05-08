interface ImportMetaEnv {
  readonly AUTH_KEY: string;
  readonly USER_DB: string;
  readonly PASSWORD_DB: string;
  readonly SERVER_DB: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}