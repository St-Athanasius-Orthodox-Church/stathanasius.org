import * as migration_20260813_054127 from './20260813_054127';
import * as migration_20260814_015041 from './20260814_015041';
import * as migration_20260814_020943 from './20260814_020943';
import * as migration_20260814_165942 from './20260814_165942';
import * as migration_20260816_214451_add_user_role from './20260816_214451_add_user_role';
import * as migration_20260817_065202_posts from './20260817_065202_posts';
import * as migration_20260817_071626 from './20260817_071626';

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
    name: '20260814_020943',
  },
  {
    up: migration_20260814_165942.up,
    down: migration_20260814_165942.down,
    name: '20260814_165942',
  },
  {
    up: migration_20260816_214451_add_user_role.up,
    down: migration_20260816_214451_add_user_role.down,
    name: '20260816_214451_add_user_role',
  },
  {
    up: migration_20260817_065202_posts.up,
    down: migration_20260817_065202_posts.down,
    name: '20260817_065202_posts',
  },
  {
    up: migration_20260817_071626.up,
    down: migration_20260817_071626.down,
    name: '20260817_071626'
  },
];
