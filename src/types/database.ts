import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface MinutesTable {
  id: Generated<number>;
  minutesFile: string;
  minutesNumber: number;
  createdDate: Date;
}

export type Minutes = Selectable<MinutesTable>;
export type NewMinutes = Insertable<MinutesTable>;
export type MinutesUpdate = Updateable<MinutesTable>;

export interface Database {
  minutes: MinutesTable;
}
