export const debug = (...args: any[]) => {
    if (process.env.DEBUG_LOG === "true") {
        // eslint-disable-next-line no-console
        console.log("[Caelum]", ...args);
    }
};