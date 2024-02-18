import fs from 'fs/promises';

import { NativeConnection, NativeConnectionOptions, Worker } from '@temporalio/worker';
import { createActivities } from './activities';

export const TASK_QUEUE_NAME = 'simple-task-queue';

async function run({ address, namespace, tlsCertPath, tlsKeyPath }: Env) {
  const connectionOptions = { address } as NativeConnectionOptions;
  if (tlsCertPath && tlsKeyPath) {
    connectionOptions.tls = {
      clientCertPair: {
        crt: await fs.readFile(tlsCertPath),
        key: await fs.readFile(tlsKeyPath),
      },
    };
  }

  const connection = await NativeConnection.connect(connectionOptions);

  const worker = await Worker.create({
    connection,
    namespace,
    taskQueue: TASK_QUEUE_NAME,
    workflowsPath: require.resolve('./workflows'),
    activities: createActivities(4),
  });

  await worker.run();
  await connection.close();
}

run(getEnv()).catch((err) => {
  console.error(err);
  process.exit(1);
});

export interface Env {
  address: string;
  namespace: string;
  tlsCertPath?: string;
  tlsKeyPath?: string;
}

export function getEnv(): Env {
  return {
    address: process.env.TEMPORAL_ADDRESS || '127.0.0.1:7233',
    namespace: process.env.TEMPORAL_NAMESPACE || 'default',
    tlsCertPath: process.env.TEMPORAL_TLS_CERT,
    tlsKeyPath: process.env.TEMPORAL_TLS_KEY,
  };
}
