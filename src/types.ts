import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface MinutesTable {
  id: Generated<number>;
  minutes_file: string;
  minutes_number: number;
  created_date: Date;
}

export type Minutes = Selectable<MinutesTable>;
export type NewMinutes = Insertable<MinutesTable>;
export type MinutesUpdate = Updateable<MinutesTable>;

export interface ExpensesTable {
  id: Generated<number>;
  expenses_file: string;
  amount: number;
}

export type Expenses = Selectable<ExpensesTable>;
export type NewExpenses = Insertable<ExpensesTable>;
export type ExpensesUpdate = Updateable<ExpensesTable>;

export interface ReceiptsTable {
  id: Generated<number>;
  receipt_file: string;
  expense_id: number;
}

export type Receipts = Selectable<ReceiptsTable>;
export type NewReceipts = Insertable<ReceiptsTable>;
export type ReceiptsUpdate = Updateable<ReceiptsTable>;

export interface MinutesExpensesTable {
  id: Generated<number>;
  minutes_id: number;
  expensed_id: number;
}

export type MinutesExpenses = Selectable<MinutesExpensesTable>;
export type NewMinutesExpenses = Insertable<MinutesExpensesTable>;
export type MinutesExpensesUpdate = Updateable<MinutesExpensesTable>;

export interface Database {
  minutes: MinutesTable;
  expenses: ExpensesTable;
  receipts: ReceiptsTable;
  minutesExpenses: MinutesExpensesTable;
}
