"use strict";
// export const config = {
//   allowedClientOrigins: [
//     "http://localhost:5173",
//     "https://skillswap-1-r1h9.onrender.com",
//     // "https://console.cron-job.org",
//     "116.203.129.16",
//     "116.203.134.67",
//     "23.88.105.37",
//     "128.140.8.200",
//     "91.99.23.109",
//   ],
//   rateLimits: {
//     DEMO_LIMIT: 10,
//     USER_ACCOUNT_LIMIT: 100,
//   },
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfig = void 0;
// export const getConfig = () => {
//   return config;
// };
// =============================================================================
// type DeepPartial<T> = {
//   [P in keyof T]?: T[P] extends object
//     ? T[P] extends Function
//       ? T[P]
//       : DeepPartial<T[P]>
//     : T[P];
// };
// type Config = ReturnType<typeof getDefaultConfig>;
/** default values for the entire config */
// function getDefaultConfig() {
//   return {
//     allowedClientOrigins: [
//       "http://localhost:5173",
//       "https://skillswap-1-r1h9.onrender.com",
//       // "https://console.cron-job.org",
//       "116.203.129.16",
//       "116.203.134.67",
//       "23.88.105.37",
//       "128.140.8.200",
//       "91.99.23.109",
//     ],
//     rateLimits: {
//       DEMO_LIMIT: 10,
//       USER_ACCOUNT_LIMIT: 100,
//     },
//   };
// }
/** cached config */
// let config: Config = getDefaultConfig();
/** gets default config & caches it */
// export function getConfig(): Config {
//   // if (!config) {
//   //   config = getDefaultConfig();
//   // }
//   return config;
// }
/** overrides cached config with given values */
// export function overrideConfig(partial: DeepPartial<Config>) {
//   config = {
//     ...getDefaultConfig(),
//     ...partial,
//     allowedClientOrigins: [
//       ...getDefaultConfig().allowedClientOrigins,
//       ...partial.allowedClientOrigins,
//     ],
//     rateLimits: {
//       ...getDefaultConfig().rateLimits,
//       ...partial.rateLimits,
//     },
//   };
// }
// /** resets config  */
// export function resetConfig() {
//   config = null;
// }
// =============================================================================
class ServerConfig {
    /** returns config */
    static getConfig() {
        return ServerConfig.config;
    }
    /** overrides property in config (for testing only) */
    static override(key, value) {
        if (process.env.NODE_ENV !== "test") {
            throw new Error("Unsupported operation. This method is available for testing only");
        }
        ServerConfig.config[key] = value;
    }
}
exports.ServerConfig = ServerConfig;
ServerConfig.config = {
    allowedClientOrigins: [
        "http://localhost:5173",
        "https://skillswap-1-r1h9.onrender.com",
        "https://skillswap-admin-client.onrender.com",
        // "https://console.cron-job.org",
        "116.203.129.16",
        "116.203.134.67",
        "23.88.105.37",
        "128.140.8.200",
        "91.99.23.109",
    ],
    DEMO_LIMIT: 10,
    USER_ACCOUNT_LIMIT: 100,
};
