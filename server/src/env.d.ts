declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
    }
  }
}

export {};
