const Benchmark = require('benchmark');
const { Database } = require('sqlite3');
const neonLib = require('.');

const suite = new Benchmark.Suite();

const defaultOpts = {
  maxTime: 0,
  minSamples: 10
};

suite
  .add('Sqlite', {
    fn: () => {
      const db = new Database(':memory:');

      db.serialize(() => {
        db.run('CREATE TABLE lorem (info TEXT)');

        const stmt = db.prepare('INSERT INTO lorem VALUES (?)');
        for (let i = 0; i < 10; i++) {
          stmt.run(`Ipsum ${i}`);
        }
        stmt.finalize();

        db.close();
      });
    },
    ...defaultOpts
  })
  .add('Neon', {
    fn: () => {
      neonLib.hello();
    },
    ...defaultOpts
  })
  .on('complete', function complete() {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
    suite
      .map(benchmark => ({ name: benchmark.name, score: benchmark.hz }))
      .forEach(benchmark => {
        console.log(benchmark.name, benchmark.hz);
      });
  })
  .run();
