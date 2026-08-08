import { createApp } from "./src/app.js";
import { connectDb } from "./src/config/db.js";
import { env } from "./src/config/env.js";
import { logger } from "./src/utils/logger.js";

async function main() {
  await connectDb();

  const app = createApp();
  app.listen(env.port, () => {
    logger.info(`HH Goa frame-tool server listening on :${env.port}`);
    logger.info(`Public base URL: ${env.publicBaseUrl}`);
  });
}

main().catch((err) => {
  logger.error("Fatal startup error:", err);
  process.exit(1);
});
