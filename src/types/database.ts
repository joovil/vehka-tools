import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface TenantCommitteeTable {
  id: Generated<number>;
  name: string;
}

export type TenantCommittee = Selectable<TenantCommitteeTable>;
export type NewTenantCommittee = Insertable<TenantCommitteeTable>;
export type TenantCommitteeUpdate = Updateable<TenantCommitteeTable>;

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
  tenantCommittees: TenantCommitteeTable;
}
