import cluster from 'cluster';
import os from 'os';
import 'dotenv/config.js';

const PORT = process.env.PORT || 4000;

void (async () => {
  if (cluster.isPrimary) {
    const cpusCount = os.cpus().length;
    console.log(`CPUs: ${cpusCount}`);
    console.log(`Master started. Pid: ${process.pid}. PORT: ${PORT}`);

    for (let i = 0; i < cpusCount; i++) {
      const newPort = +PORT + 1 + i;
      console.log(newPort);
      await cluster.fork({ PORT: newPort });
    }
  }
  if (cluster.isWorker) {
    console.log(`Worker ${process.pid} started. PORT ${process.env.PORT}`);
    import('../index');
  }
})();
