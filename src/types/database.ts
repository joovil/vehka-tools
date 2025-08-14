import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface CommitteeTable {
  id: Generated<number>;
  name: string;
}

export type Committee = Selectable<CommitteeTable>;
export type NewCommittee = Insertable<CommitteeTable>;
export type CommitteeUpdate = Updateable<CommitteeTable>;

export interface MinutesTable {
  id: Generated<number>;
  tenantCommitteeId: number;
  filename: string;
  blobUrl: string;
  number: string;
  created: Date;
}

export type Minutes = Selectable<MinutesTable>;
export type NewMinutes = Insertable<MinutesTable>;
export type MinutesUpdate = Updateable<MinutesTable>;

export interface Database {
  minutes: MinutesTable;
  committees: CommitteeTable;
}
