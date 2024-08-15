import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
// import { TagDto ,AddTagDto, financialCalendar, AddFinancialCalendar, editFinancialCalndar, VendorCategoryDto, AddVendorCategory, EditVendorCategoryDto, CustomerCategoryDto, EditCustomerCategoryDto, vendorDefinitionDto } from './models';
import {
  TagDto,
  AddTagDto,
  financialCalendar,
  AddFinancialCalendar,
  editFinancialCalndar,
  VendorCategoryDto,
  AddVendorCategory,
  EditVendorCategoryDto,
  CustomerCategoryDto,
  EditCustomerCategoryDto,
  vendorDefinitionDto,
  AddCustomerDefinitionDto,
  EditCustomerDefintionsDto,
  CurrencyDefinitionDto,
  CurrencyConversionDto,
  ExportCurrencyConversionDto,
  ExportTagDto,
  GetLastYearInfoDto,
  AccountDto,
} from './models';

import { AddCustomerCategoryDto } from './models/addCustomerCategoryDto';
import { AddVendorCommand } from './models/AddVendorCommand';
import { CategoryDropdownDto } from './models/CategoryDropdownDto';
import { CityDto } from './models/CityDto';
import { CountryDto } from './models/CountryDto';
import { CurrencyDto } from './models/CurrencyDto';
import { TagDropDownDto } from './models/TagDropDownDto';
import { EditVendorCommand } from './models/editVendorCommand';
import { GetVendorById } from './models/getVendorById';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
@Injectable({
  providedIn: 'root',
})
export class GeneralSettingProxy {
  getAllTagsPaginated(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<TagDto>> {
    const url = `Tag?SearchKey=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

    return this.httpService.get<PaginationVm<TagDto>>(url);
  }
  getAllfinancialCalendarPaginated(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<financialCalendar>> {
    const url = `FinancialYear?SearchTerm=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

    return this.httpService.get<PaginationVm<financialCalendar>>(url);
  }
  getVendorCategory(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<VendorCategoryDto>> {
    const url = `VendorCategory?SearchTerm=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

    return this.httpService.get<PaginationVm<VendorCategoryDto>>(url);
  }

  addvendorCategory(addVendorCategoryDto: AddVendorCategory): Observable<AddVendorCategory> {
    return this.httpService.post<AddVendorCategory>(`VendorCategory`, addVendorCategoryDto);
  }

  EditVendorCategory(
    EditVendorCategoryDto: EditVendorCategoryDto
  ): Observable<EditVendorCategoryDto> {
    return this.httpService.put<EditVendorCategoryDto>(`VendorCategory`, EditVendorCategoryDto);
  }

  deleteVendorCategory(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`VendorCategory/${id}`);
  }

  getVendorCategoryByID(id: number): Observable<EditVendorCategoryDto> {
    const url = `VendorCategory/${id}`;
    return this.httpService.get(url);
  }

  getVendorDefinition(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<vendorDefinitionDto>> {
    const url = `vendor?SearchTerm=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

    return this.httpService.get<PaginationVm<vendorDefinitionDto>>(url);
  }

  deleteVendorDefinition(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`vendor/${id}`);
  }

  getChildrenAccountsDropDown() {
    return this.httpService.get('ChartOfAccounts/ChildrenAccountsDropDown');
  }
  getpriceListDropDown(): Observable<{ id: number; name: string }[]> {
    return this.httpService.get('PriceList/PriceListDropDown');
  }
  getpaymentTermsListDropDown(): Observable<{ id: number; name: string }[]> {
    return this.httpService.get('PaymentTerms/PaymentTermsDropdown');
  }
  addTag(addTagDto: AddTagDto): Observable<TagDto> {
    return this.httpService.post<TagDto>(`Tag`, addTagDto);
  }
  addFinancialCalendar(
    addFinancialCalendarDto: AddFinancialCalendar
  ): Observable<AddFinancialCalendar> {
    return this.httpService.post<AddFinancialCalendar>(`FinancialYear`, addFinancialCalendarDto);
  }
  openFinancialCalendar(openList: {}): Observable<number[]> {
    return this.httpService.post(`FinancialYear/openFinancialPeriod`, openList);
  }

  GetFinancialPeriodLastYearDate(): Observable<GetLastYearInfoDto> {
    return this.httpService.get('FinancialYear/GetLastYearDate');
  }
  editFinancialPeriodLastYearDate({ id, name }: { id: number; name: string }) {
    return this.httpService.put('FinancialYear', { id, name });
  }
  GetFinancialPeriodByID(id: number): Observable<editFinancialCalndar> {
    return this.httpService.get(`FinancialYear/${id}`);
  }

  editTag(tagDto: TagDto): Observable<boolean> {
    return this.httpService.put<boolean>(`Tag`, tagDto);
  }

  getTagById(id: number): Observable<TagDto> {
    return this.httpService.get<TagDto>(`Tag/GetById?Id=${id}`);
  }

  deleteTag(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`Tag?Id=${id}`);
  }

  activateTag(id: number): Observable<boolean> {
    return this.httpService.put<boolean>(`Tag/Activate?Id=${id}`, {});
  }

  deactivateTag(id: number): Observable<boolean> {
    return this.httpService.put<boolean>(`Tag/deactivate?Id=${id}`, {});
  }
  getTags(): Observable<TagDropDownDto[]> {
    return this.httpService.get<TagDropDownDto[]>(`Tag/Tagdropdown`);
  }
  getAllCountries(): Observable<CountryDto[]> {
    return this.httpService.get<CountryDto[]>(`Country`);
  }
  getCities(countryCode: string): Observable<CityDto[]> {
    return this.httpService.get<CityDto[]>(`Country/GetCities?CountryCode=${countryCode}`);
  }
  getCurrencies(searchKey: string): Observable<CurrencyDto[]> {
    return this.httpService.get<CurrencyDto[]>('Currency/CurrencyDropDown?searchKey=' + searchKey);
  }
  getVendorCategoryDropdown(): Observable<CategoryDropdownDto[]> {
    return this.httpService.get<CategoryDropdownDto[]>('VendorCategory/VendorCategoryDropdown');
  }

  addNewVendorDefinition(vendor: AddVendorCommand): Observable<AddVendorCommand> {
    return this.httpService.post(`Vendor`, vendor);
  }

  getVendorById(id: number): Observable<any> {
    return this.httpService.get<any>(`Vendor/${id}`);
  }

  getVendorDefinitionByID(id: number): Observable<GetVendorById> {
    const url = `Vendor/${id}`;
    return this.httpService.get(url);
  }

  editVendorDefinition(vendor: EditVendorCommand): Observable<any> {
    return this.httpService.put(`Vendor`, vendor);
  }
  getAllCurrencyPaginated(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<CurrencyDefinitionDto>> {
    const queryParams = new URLSearchParams({
      SearchKey: searchTerm,
      PageNumber: pageInfo.pageNumber.toString(),
      PageSize: pageInfo.pageSize.toString(),
    });
    const url = `Currency?SearchKey=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

    return this.httpService.get<PaginationVm<CurrencyDefinitionDto>>(url);
  }
  addCurrency(currency: CurrencyDefinitionDto): Observable<CurrencyDefinitionDto> {
    return this.httpService.post<CurrencyDefinitionDto>(`Currency`, currency);
  }
  deleteCurrency(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`Currency/${id}`);
  }
  EditCurrency(Currency: CurrencyDefinitionDto): Observable<CurrencyDefinitionDto> {
    return this.httpService.put<CurrencyDefinitionDto>(`Currency`, Currency);
  }
  getCurrencyById(id: number): Observable<CurrencyDefinitionDto> {
    return this.httpService.get<CurrencyDefinitionDto>(`Currency/${id}`);
  }
  getAllCurrencyConversionPaginated(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<CurrencyConversionDto>> {
    const queryParams = new URLSearchParams({
      SearchKey: searchTerm,
      PageNumber: pageInfo.pageNumber.toString(),
      PageSize: pageInfo.pageSize.toString(),
    });
    const url = `CurrencyConversion?SearchTerm=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

    return this.httpService.get<PaginationVm<CurrencyConversionDto>>(url);
  }
  addCurrencyConversion(currency: CurrencyConversionDto): Observable<CurrencyConversionDto> {
    return this.httpService.post<CurrencyConversionDto>(`CurrencyConversion`, currency);
  }
  deleteCurrencyConversion(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`CurrencyConversion/${id}`);
  }
  EditCurrencyConversion(Currency: CurrencyConversionDto): Observable<CurrencyConversionDto> {
    return this.httpService.put<CurrencyConversionDto>(`CurrencyConversion`, Currency);
  }
  getCurrencyByIdConversion(id: number): Observable<CurrencyConversionDto> {
    return this.httpService.get<CurrencyConversionDto>(`CurrencyConversion/${id}`);
  }
  exportcurrencyData(searchTerm: string | undefined): Observable<ExportCurrencyConversionDto[]> {
    let query = `CurrencyConversion/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<ExportCurrencyConversionDto[]>(query);
  }
  exportcurrencyDefinitionData(
    searchTerm: string | undefined
  ): Observable<CurrencyDefinitionDto[]> {
    let query = `Currency/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<CurrencyDefinitionDto[]>(query);
  }

  exportFinancialCalendarData(searchTerm: string | undefined): Observable<financialCalendar[]> {
    let query = `FinancialYear/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<financialCalendar[]>(query);
  }

  exportTagData(searchTerm: string | undefined): Observable<ExportTagDto[]> {
    let query = `Tag/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<ExportTagDto[]>(query);
  }

  getAccountsHasNoChildren(
    quieries: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<AccountDto>> { 
    return this.httpService.get<PaginationVm<AccountDto>>(
      `ChartOfAccounts/GetHasNoChildrenList?${pageInfo.toQuery}&${quieries ? quieries : ''}`
    );
  }
  

  constructor(private httpService: HttpService) {}
}