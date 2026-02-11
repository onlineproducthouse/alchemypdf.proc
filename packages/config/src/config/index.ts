export type Environment = {
  apiKey: string

  apiProtocol: string
  apiHost: string
  apiPort: string
  apiBasePath: string
  overrideCallback: boolean
}

export interface IConfig {
  apiKey(): string
  apiHost(): string
  apiUrl(): string
  overrideCallback(): boolean
  callbackUrl(): string
}

export function config(env: Environment): IConfig {
  const apiKey = (): string => env.apiKey;
  const apiHost = (): string => `${env.apiProtocol}://${env.apiHost}:${env.apiPort}`;
  const apiUrl = (): string => `${apiHost()}${env.apiBasePath}`;

  return {
    apiKey,
    apiHost,
    apiUrl,
    overrideCallback: () => env.overrideCallback,
    callbackUrl: () => apiUrl() + '/Request/Callback',
  };
}
