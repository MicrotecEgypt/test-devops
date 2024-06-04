import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import {
  accountTreeList,
  AddAccountDto,
  AccountDto,
  AccountSectionDropDownDto,
  TagDropDownDto,
  AccountTypeDropDownDto,
  parentAccountDto,
  GetLevelsDto,
  listAddLevelsDto,
  AccountByIdDto,
  TaxGroupDto,
  AddTaxGroupDto,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class AccountProxy {
  getAccountSections(): Observable<AccountSectionDropDownDto[]> {
    return this.httpService.get<AccountSectionDropDownDto[]>(`AccountSection`);
  }

  getAccountTypes(sectionId: number): Observable<AccountTypeDropDownDto[]> {
    return this.httpService.get<AccountTypeDropDownDto[]>(`AccountType?SectionId=` + sectionId);
  }
  getTags(): Observable<TagDropDownDto[]> {
    return this.httpService.get<TagDropDownDto[]>(`Tag/Tagdropdown`);
  }

  getAccount(id: number): Observable<parentAccountDto> {
    return this.httpService.get<parentAccountDto>(`ChartOfAccounts/Get?id=${id}`);
  }
  getAccountDetails(id: number): Observable<AccountByIdDto> {
    return this.httpService.get<AccountByIdDto>(`ChartOfAccounts/GetAccountDetails?id=${id}`);
  }

  addAccount(command: AddAccountDto): Observable<AccountDto> {
    return this.httpService.post('ChartOfAccounts/AddAccount', command);
  }
  getAllPaginated(quieries: string, pageInfo: PageInfo): Observable<PaginationVm<AccountDto>> {
    return this.httpService.get<PaginationVm<AccountDto>>(`ChartOfAccounts?${pageInfo.toQuery}&${quieries ?quieries : '' }`);
  }
  getAccountsHasNoChildren(quieries: string, pageInfo: PageInfo): Observable<PaginationVm<AccountDto>> {
    return this.httpService.get<PaginationVm<AccountDto>>(`ChartOfAccounts/GetHasNoChildrenList?${pageInfo.toQuery}&${quieries ?quieries : '' }`);
  }

  getAllParentAccounts(): Observable<parentAccountDto[]> {
    return this.httpService.get<parentAccountDto[]>(`ChartOfAccounts/GetParentAccounts`);
  } 

  getTreeList(): Observable<accountTreeList[]> {
    return this.httpService.get<accountTreeList[]>(`ChartOfAccounts/GetTree`);
  }

  getLevels(): Observable<GetLevelsDto[]> {
    return this.httpService.get<GetLevelsDto[]>(`Levels`);
  }

  addLevels(command: listAddLevelsDto): Observable<boolean> {
    return this.httpService.post('Levels', command);
  }

  getAllTaxGroup(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<TaxGroupDto>> {
    
    return this.httpService.get<PaginationVm<TaxGroupDto>>(`TaxGroup?SearchKey=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`);
  } 
  
  deleteTaxGroup(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`TaxGroup?Id=${id}`);
  }

  addTaxGroup(taxgroupdto: AddTaxGroupDto): Observable<boolean> {
    return this.httpService.post<boolean>(`TaxGroup`,taxgroupdto);
  }

  editTaxGroup(taxgroupdto: TaxGroupDto): Observable<boolean> {
    return this.httpService.put<boolean>(`TaxGroup`,taxgroupdto);
  }
  getTaxGroupById(id: number): Observable<boolean> {
    return this.httpService.get<boolean>(`TaxGroup/GetById?Id=${id}`);
  }

  constructor(private httpService: HttpService) {}
}
