import Typesense from "typesense";

export function createSearchClient(config?: {
  host?: string;
  port?: number;
  protocol?: string;
  apiKey?: string;
}) {
  return new Typesense.Client({
    nodes: [
      {
        host: config?.host ?? process.env.TYPESENSE_HOST ?? "localhost",
        port: config?.port ?? 8108,
        protocol: config?.protocol ?? "http",
      },
    ],
    apiKey: config?.apiKey ?? process.env.TYPESENSE_API_KEY ?? "xyz",
    connectionTimeoutSeconds: 5,
    retryIntervalSeconds: 0.1,
    numRetries: 3,
  });
}

export type SearchClient = ReturnType<typeof createSearchClient>;
