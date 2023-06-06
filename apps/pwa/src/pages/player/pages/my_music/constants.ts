import { MusicWithSingerAliases, Index } from '../../constants';

export const PAGE_SIZE = 50;

export const TOOLBAR_HEIGHT = 60;

export interface Music extends MusicWithSingerAliases, Index {
  heat: number;
  createTimestamp: number;
  index: number;
}
