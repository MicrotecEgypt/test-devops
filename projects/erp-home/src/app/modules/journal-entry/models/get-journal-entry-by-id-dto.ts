import { JournalEntryLineDto } from "./jouranl-entry-line-dto";
import { JournalEntryStatus } from "./journalentrystatus";
import { JournalEntryType } from "./journalentrytype";

export interface GetJournalEntryByIdDto {
    id: number;
    journalCode: string;
    referenceNumber?: string;
    journalPeriod?: string;
    description?: string;
    journalDate: Date;
    type: JournalEntryType;
    sourceName: string;
    sourceCode: string;
   // reversedJournalCode?: string;
    status: JournalEntryStatus;
    totalDebitAmount: number;
    totalCreditAmount: number;
    currencyRate:number

    journalEntryLines?: JournalEntryLineDto[];
  }
  

