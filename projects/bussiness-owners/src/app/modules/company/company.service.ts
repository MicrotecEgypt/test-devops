import { Injectable } from '@angular/core';
import { CompanyProxy } from './company.proxy';
import { ResponseCompanyDto } from './models';
import { BehaviorSubject } from 'rxjs';
import { LanguageService, ToasterService } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companiesDataSource = new BehaviorSubject<ResponseCompanyDto[]>([]);

  public companies = this.companiesDataSource.asObservable();

  constructor(
    private companyProxy: CompanyProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService
  ) {}

  loadCompanies(subscriptionId: string) {
    this.companyProxy.getAll(subscriptionId).subscribe((response) => {
      this.companiesDataSource.next(response.response.reverse());
    });
  }

  async activate(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangestatus'
    );
    if (confirmed) {
      this.companyProxy.activateCompany(id).subscribe({
        next: () => {
          const companyToChange = this.companiesDataSource.value.find(
            (item) => item.id === id
          );
          if (companyToChange) {
            companyToChange.isActive = true;
            this.companiesDataSource.next([...this.companiesDataSource.value]);
          }
          this.toasterService.showSuccess(
            this.languageService.transalte('Company.Success'),
            this.languageService.transalte(
              'Company.CompanyActivatedSuccessfully'
            )
          );
        },
      });
    } else {
    }
  }

  async deactivate(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangestatus'
    );
    if (confirmed) {
      this.companyProxy.deactivateCompany(id).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Company.Success'),
            this.languageService.transalte(
              'Company.CompanyDeactivatedSuccessfully'
            )
          );
          const companyToChange = this.companiesDataSource.value.find(
            (item) => item.id === id
          );
          if (companyToChange) {
            companyToChange.isActive = false;
            this.companiesDataSource.next([...this.companiesDataSource.value]);
          }
        },
      });
    } else {
    }
  }
}
