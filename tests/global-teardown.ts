import { truncateDb } from "../prisma/truncate-db";

truncateDb()
  .then(() => {
    console.log("Database truncated");
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Global teardown done ✨");
  });
