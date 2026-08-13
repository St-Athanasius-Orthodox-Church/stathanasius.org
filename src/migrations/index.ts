import * as migration_20260813_054127 from './20260813_054127';

export const migrations = [
  {
    up: migration_20260813_054127.up,
    down: migration_20260813_054127.down,
    name: '20260813_054127'
  },
];
