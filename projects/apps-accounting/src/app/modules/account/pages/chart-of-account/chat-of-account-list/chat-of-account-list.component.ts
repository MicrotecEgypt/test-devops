import { Component, OnInit } from '@angular/core';
import { lookupDto, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { AccountService } from '../../../account.service';
import { AccountNature, AccountDto, ExportAccountsDto } from '../../../models';

@Component({
  selector: 'app-chat-of-account-list',
  templateUrl: './chat-of-account-list.component.html',
  styleUrls: ['./chat-of-account-list.component.scss'],
})
export class ChatOfAccountListComponent implements OnInit {
  tableData: AccountDto[];
  currentPageInfo: PageInfoResult;
  accountNature = AccountNature;
  searchTerm: string;
  mappedExportData: AccountDto[];

  exportData: ExportAccountsDto[];

  constructor(private routerService: RouterService, private accountService: AccountService) {}

  exportColumns: lookupDto[] = [
    {
      id: 'id',
      name: 'Id',
    },

    {
      id: 'accountCode',
      name: 'Account Code',
    },
    {
      id: 'natureId',
      name: 'Nature',
    },
    {
      id: 'Account Type',
      name: 'accountTypeName',
    },
    {
      id: 'Account Section',
      name: 'accountSectionName',
    },
  ];

  ngOnInit() {
    this.initChartOfAccountData(this.searchTerm, new PageInfo());

   
  }

  searchTermChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    console.log(this.searchTerm);
    this.initChartOfAccountData(this.searchTerm, new PageInfo());
  }

  initChartOfAccountData(searchTerm: string, page: PageInfo) {
    this.accountService.initAccountList(searchTerm, page);

    this.accountService.accountsList.subscribe({
      next: (ChartOfAccountList) => {
        this.tableData = ChartOfAccountList;
        this.mappedExportData = this.tableData.map((elem) => {
          let { currencyId, ...args } = elem;
          return args;
        });
      },
    });

    this.accountService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }
  onPageChange(pageInfo: PageInfo) {
    this.initChartOfAccountData('', pageInfo);
  }
  routeToAdd() {
    this.routerService.navigateTo(`/journalentry/add`);
  }
  routeToEdit(id: number) {
    this.routerService.navigateTo(`/journalentry/edit/${id}`);
  }

  exportAccountsData(searchTerm: string) {
    this.accountService.exportAccountsData(searchTerm);
    this.accountService.exportsAccountsDataSourceObservable.subscribe((res) => {
      console.log('exported data', res);
      this.exportData = res;
    });
  }
}
