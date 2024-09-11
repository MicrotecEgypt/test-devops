import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  customValidators,
  FormsService,
  LanguageService,
  PrintService,
  ToasterService,
} from 'shared-lib';
import {
  treasuryStatementDto,
  TreasuryStatementfilterDto,
  TreasuryStatmentTransactionDto,
} from '../../models';
import { TreasuryDropDown } from '../../../finance/models';
import { TranscationsService } from '../../../transcations/transcations.service';
import { ReportsService } from '../../reports.service';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';
import { SourceDocument } from '../../models/source-document-dto';

@Component({
  selector: 'app-treasury-statement',
  templateUrl: './treasury-statement.component.html',
  styleUrls: ['./treasury-statement.component.scss'],
})
export class TreasuryStatementComponent implements OnInit {
  reportForm: FormGroup;
  treasuryDropDown: TreasuryDropDown[] = [];
  currency: string;
  tableData: treasuryStatementDto;
  total: number = 0;
  selectedTreasuryName: string = '';
  transactions: TreasuryStatmentTransactionDto[] = [];
  openingDebit: number;
  openingCredit: number;
  openingBalance: number;
  totalDebit: number;
  totalCredit: number;
  totalBalance: number;

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private languageService: LanguageService,
    private financeService: TranscationsService,
    private PrintService: PrintService,
    private ReportService: ReportsService,
    public generalService: GeneralService,
    private formsService: FormsService,
    private router: Router,
    private ToasterService: ToasterService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(
      this.languageService.transalte('TreasuryStatement.TreasuryStatement')
    );
    this.initializeForm();
    this.getTreasuryDropDown();
    this.initializeDates();
    this.reportForm.valueChanges.subscribe(() => {
      this.tableData = {} as treasuryStatementDto;
    });

    this.ReportService.treasuryStatementObservable.subscribe((res) => {
      if (res && res.transactions && res.transactions.length > 0) {
        this.tableData = res;
        this.transactions = res?.transactions;
        this.totalDebit = res?.totalDebit;
        this.totalCredit = res?.totalCredit;
        this.totalBalance = res?.totalBalance;
        this.openingDebit = res?.openingBalanceDebit;
        this.openingCredit = res?.openingBalanceCredit;
        this.openingBalance = res?.openingBalanceBalance;
      }
    });

    this.reportForm.get('treasuryId')!.valueChanges.subscribe((Id) => {
      const selected = this.treasuryDropDown.find((x) => x.id === Id);
      if (selected) {
        console.log(' this.tableData ', this.tableData);
        this.reportForm.get('currency')!.setValue(selected.currencyName);
        this.currency = selected.currencyName;
        this.selectedTreasuryName = selected.name;
      }
    });
  }

  getTreasuryDropDown() {
    this.financeService.treasuryDropDown();
    this.financeService.getTreasuryDropDownDataObservable.subscribe((res: any) => {
      this.treasuryDropDown = res;
    });
  }

  initializeForm() {
    this.reportForm = this.fb.group({
      dateFrom: new FormControl('', [customValidators.required]),
      dateTo: new FormControl('', [customValidators.required]),
      treasuryId: new FormControl('', [customValidators.required]),
      currency: new FormControl(''),
    });
  }

  initializeDates() {
    const today = new Date();
    let startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    startOfMonth.setDate(startOfMonth.getDate() + 1);

    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1);

    this.reportForm.patchValue({
      dateFrom: startOfMonth.toISOString().split('T')[0],
      dateTo: endOfMonth.toISOString().split('T')[0],
    });
  }

  printTable(id: string) {
    this.PrintService.print(id);
  }
  getReportData() {
    if (!this.formsService.validForm(this.reportForm, false)) return;
    if (this.reportForm.get('dateFrom')?.value > this.reportForm.get('dateTo')?.value) {
      this.ToasterService.showError(
        this.languageService.transalte('Error'),
        this.languageService.transalte('DateFromLessThanToValidation')
      );
    }

    const formValue = this.reportForm.value;
    const filterDto: TreasuryStatementfilterDto = {
      DateFrom: formValue.dateFrom,
      DateTo: formValue.dateTo,
      TreasuryId: formValue.treasuryId,
    };
    this.ReportService.getTreasuryStatement(filterDto);
    this.ReportService.treasuryStatementObservable.subscribe((data) => {
      this.tableData = data;
    });
  }

  routeToPaymentView(transaction: TreasuryStatmentTransactionDto) {
    const test = location.href.split('/');

    if (transaction.paymentName == SourceDocument.PaymentIn) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree([
          `${test[3]}/transcations/paymentin/view/${transaction.paymentInHeaderId}`,
        ])
      );
      window.open(url, '_blank');
    } else {
      const url = this.router.serializeUrl(
        this.router.createUrlTree([
          `${test[3]}/transcations/paymentout/view/${transaction.paymentOutHeaderId}`,
        ])
      );
      window.open(url, '_blank');
    }
  }

  routeToJournalView(id: number) {
    const test = location.href.split('/');
    console.log(test[3]);
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/accounting/transcations/journalentry/view/${id}`])
    );
    window.open(url, '_blank');
  }
}
