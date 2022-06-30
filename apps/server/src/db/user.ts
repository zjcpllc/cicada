import db from '.';

export enum Property {
  ID = 'id',
  EMAIL = 'email',
  AVATAR = 'avatar',
  NICKNAME = 'nickname',
  JOIN_TIMESTAMP = 'joinTimestamp',
  SUPER = 'super',
  REMARK = 'remark',
}

export type User = {
  [Property.ID]: string;
  [Property.EMAIL]: string;
  [Property.AVATAR]: string;
  [Property.NICKNAME]: string;
  [Property.JOIN_TIMESTAMP]: number;
  [Property.SUPER]: number;
  [Property.REMARK]: string;
};

export function getUserByEmail<P extends Property>(
  email: string,
  properties: P[],
) {
  return db.get<{
    [key in P]: User[key];
  }>(`select ${properties.join(',')} from user where email = ?`, [email]);
}

export function getUserById<P extends Property>(id: string, properties: P[]) {
  return db.get<{
    [key in P]: User[key];
  }>(`select ${properties.join(',')} from user where id = ?`, [id]);
}

export function getUserListByIds<P extends Property>(
  ids: string[],
  properties: P[],
) {
  return db.all<Pick<User, P>>(
    `
      select ${properties.map((p) => `\`${p}\``).join(',')} from user
        where id in ( ${ids.map(() => '?')} )
    `,
    [ids],
  );
}
