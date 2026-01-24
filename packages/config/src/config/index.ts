export type Environment = {
  apiKey: string

  apiProtocol: string
  apiHost: string
  apiPort: string
  apiBasePath: string
}

type InitConfig = {
  host: string
  local: Environment
}

export interface IConfig {
  apiKey(): string
  apiHost(): string
  apiUrl(): string
}

export function config(_config: InitConfig): IConfig {
  const env = _config["local"]

  const apiKey = (): string => env.apiKey;
  const apiHost = (): string => `${env.apiProtocol}://${env.apiHost}:${env.apiPort}`;
  const apiUrl = (): string => `${apiHost()}${env.apiBasePath}`;

  return {
    apiKey,
    apiHost,
    apiUrl,
  };
}
