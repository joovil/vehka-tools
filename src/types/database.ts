import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface MinutesTable {
  id: Generated<number>;
  filename: string;
  blobUrl: string;
  minutesNumber: number;
  created: Date;
}

export type Minutes = Selectable<MinutesTable>;
export type NewMinutes = Insertable<MinutesTable>;
export type MinutesUpdate = Updateable<MinutesTable>;

export interface Database {
  minutes: MinutesTable;
}
