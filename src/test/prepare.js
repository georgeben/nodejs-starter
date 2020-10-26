import prepare from "mocha-prepare";
import mongoUnit from "mongo-unit";

const testDB = "test_db";
// Sets up a Fake MongoDB server in memory
prepare(
  (done) => {
    mongoUnit.start({
      dbName: testDB,
    })
      .then(() => {
        console.log(`In memory MongoDB server started: ${mongoUnit.getUrl()}`);
        process.env.TEST_DATABASE_URI = mongoUnit.getUrl();
        process.env.DATABASE_URI = process.env.TEST_DATABASE_URI;
        process.env.TEST_DATABASE_NAME = testDB;
        done();
      })
      .catch((error) => {
        console.log("An error occurred while setting up test db", error);
      });
  },
  (done) => {
    mongoUnit.stop();
    done();
  },
);
