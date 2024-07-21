import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, lookupDto, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { TaxDto } from '../../../../general/models';

import { FinanceService } from '../../../finance.service';
import { BankDefinitionDto } from '../../../models/BankDefinitionDto';

@Component({
  selector: 'app-bank-definition-list',
  templateUrl: './bank-definition-list.component.html',
  styleUrl: './bank-definition-list.component.scss'
})
export class BankDefinitionListComponent implements OnInit {
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private financeService: FinanceService
  ) {}

  tableData: BankDefinitionDto[];
  exportData: BankDefinitionDto[];
  cols = [
    {
      field: 'Id',
      header: 'id',
    },
    {
      field: 'Code',
      header: 'code',
    },

    {
      field: 'Name',
      header: 'name',
    },
    {
      field: 'Currency Name',
      header: 'currencyName',
    },
    {
      field: 'Account Name',
      header: 'accountName',
    },
    {
      field: 'Opening Balance',
      header: 'openingBalance',
    },
  ];
  exportColumns: lookupDto[];
  exportSelectedCols: string[] = [];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;

  ngOnInit() {
    this.initTreasurData();
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
  }

  initTreasurData() {
    this.financeService.getBankDefinitions('', new PageInfo());

    this.financeService.sendBankDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.financeService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.financeService.getBankDefinitions('', pageInfo);

    this.financeService.sendBankDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  exportClick(e?: Event) {
    this.exportBankData(this.searchTerm);
  }

  exportBankData(searchTerm: string) {
    this.financeService.exportsBankList(searchTerm);
    this.financeService.exportedBankListDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }

  onAdd() {
  this.routerService.navigateTo('/add-bank-definition')
  }

  onEdit(data: TaxDto) {
    this.routerService.navigateTo('/edit-bank-definition')

  }

  onSearchChange() {
    this.financeService.getBankDefinitions(this.searchTerm, new PageInfo());
    this.financeService.sendBankDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
        console.log(res);
      },
    });
  }

  onDelete(id: number) {
    this.financeService.deleteBank(id);
  }
}
