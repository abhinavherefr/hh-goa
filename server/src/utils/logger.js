const ts = () => new Date().toISOString();

export const logger = {
  info: (...args) => console.log(`[${ts()}]`, ...args),
  warn: (...args) => console.warn(`[${ts()}]`, ...args),
  error: (...args) => console.error(`[${ts()}]`, ...args),
};
