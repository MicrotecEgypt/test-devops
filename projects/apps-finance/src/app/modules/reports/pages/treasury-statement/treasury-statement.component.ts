import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { customValidators, LanguageService,  PrintService } from 'shared-lib';
import { treasuryStatementDto, TreasuryStatementfilterDto } from '../../models';
import { TreasuryDropDown } from '../../../finance/models';
import { TranscationsService } from '../../../transcations/transcations.service';
import { ReportsService } from '../../reports.service';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';

@Component({
  selector: 'app-treasury-statement',
  templateUrl: './treasury-statement.component.html',
  styleUrls: ['./treasury-statement.component.scss']
})
export class TreasuryStatementComponent implements OnInit {

  reportForm: FormGroup;
  treasuryDropDown: TreasuryDropDown[] = []
  defoultSelectedAcounts: number[] = [];
  currency: string
  tableData: treasuryStatementDto;
  cols: any[] = [];
  total: number = 0;
  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private languageService: LanguageService,
    private financeService: TranscationsService,
    private PrintService: PrintService,
    private ReportService: ReportsService,
    public generalService: GeneralService

  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.languageService.transalte('reportAccount.AccountStatement'));

    this.initializeForm();
    this.getTreasuryDropDown();
    this.initializeDates();

    this.reportForm.valueChanges.subscribe(() => {
      this.tableData.transactions = [];
    });

    this.ReportService.treasuryStatementObservable.subscribe(data => {
      this.tableData = data;
      console.log("tableData",this.tableData)
    })

    this.reportForm.get('treasuryId')!.valueChanges.subscribe(Id => {
      const selected = this.treasuryDropDown.find(x => x.id === Id);
      if (selected) {
        this.reportForm.get('currency')!.setValue(selected.currencyName);
      }
    });
  }

  getTreasuryDropDown() {
    this.financeService.treasuryDropDown()
    this.financeService.getTreasuryDropDownDataObservable.subscribe((res: any) => {
      this.treasuryDropDown = res  
     })
  }

  initializeForm() {
    this.reportForm = this.fb.group({
      dateFrom: new FormControl('', [customValidators.required]),
      dateTo: new FormControl('', [customValidators.required]),
      treasuryId: new FormControl('', [customValidators.required]),
      currency:new FormControl('')
    });
  }

  initializeDates() {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    this.reportForm.patchValue({
      dateFrom: today.toISOString().split('T')[0],
      dateTo: endOfMonth.toISOString().split('T')[0],
    });
  }

  printTable(id: string) {
    this.PrintService.print(id);
  }
  getReportData(){
    const formValue = this.reportForm.value;
    const filterDto: TreasuryStatementfilterDto = {
    DateFrom: formValue.dateFrom,
    DateTo: formValue.dateTo,
    TreasuryId: formValue.treasuryId
  };
    console.log("sandra",filterDto)
    this.ReportService.getTreasuryStatement(filterDto)
    this.ReportService.treasuryStatementObservable.subscribe(data => {
      console.log("data",data)
      this.tableData = data;
      console.log("tableData ",this.tableData )
    })
  }
}
