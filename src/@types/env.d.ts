declare namespace NodeJS {
    // 環境変数名の定義
    import * as envNames from '@env';
    type Env = typeof envNames;
    interface ProcessEnv extends Env {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly API_BASE_URL: string;
    }
}
