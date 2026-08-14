import * as migration_20260813_054127 from './20260813_054127';
import * as migration_20260814_015041 from './20260814_015041';
import * as migration_20260814_020943 from './20260814_020943';
import * as migration_20260814_165942 from './20260814_165942';

export const migrations = [
  {
    up: migration_20260813_054127.up,
    down: migration_20260813_054127.down,
    name: '20260813_054127',
  },
  {
    up: migration_20260814_015041.up,
    down: migration_20260814_015041.down,
    name: '20260814_015041',
  },
  {
    up: migration_20260814_020943.up,
    down: migration_20260814_020943.down,
    name: '20260814_020943'
  },
  {
    up: migration_20260814_165942.up,
    down: migration_20260814_165942.down,
    name: '20260814_165942',
  },
];
