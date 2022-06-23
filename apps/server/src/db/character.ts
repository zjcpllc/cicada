import * as db from '@/db';

export enum Property {
  ID = 'id',
  AVATAR = 'avatar',
  NAME = 'name',
  ALIASES = 'aliases',
  CREATE_USER_ID = 'createUserId',
  CREATE_TIMESTAMP = 'createTimestamp',
}

export type Character = {
  [Property.ID]: string;
  [Property.AVATAR]: string;
  [Property.NAME]: string;
  [Property.ALIASES]: string;
  [Property.CREATE_USER_ID]: string;
  [Property.CREATE_TIMESTAMP]: number;
};

export function getSingerListInMusicIds<P extends Property>(
  musicIds: string[],
  properties: P[],
) {
  return db.all<
    {
      musicId: string;
    } & Pick<Character, P>
  >(
    `
    SELECT
      ${properties.map((p) => `c.${p}`).join(',')},
      msr.musicId
    FROM
      music_singer_relation AS msr
      LEFT JOIN character AS c ON msr.singerId = c.id 
    WHERE
      msr.musicId IN ( ${musicIds.map(() => '?').join(',')} );
  `,
    musicIds,
  );
}

export function getCharacterListByIds<P extends Property>(
  ids: string[],
  properties: P[],
) {
  return db.all<Pick<Character, P>>(
    `
      select ${properties.join(',')} from character
        where id in ( ${ids.map(() => '?')} )
    `,
    [ids],
  );
}
