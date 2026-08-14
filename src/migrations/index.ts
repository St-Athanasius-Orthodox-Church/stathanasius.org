import * as migration_20260813_054127 from './20260813_054127';
import * as migration_20260814_015041 from './20260814_015041';

export const migrations = [
  {
    up: migration_20260813_054127.up,
    down: migration_20260813_054127.down,
    name: '20260813_054127',
  },
  {
    up: migration_20260814_015041.up,
    down: migration_20260814_015041.down,
    name: '20260814_015041'
  },
];
