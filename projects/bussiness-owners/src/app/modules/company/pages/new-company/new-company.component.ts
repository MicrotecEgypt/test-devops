import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FormsService,
  LookupEnum,
  LookupsService,
  RouterService,
  customValidators,
  lookupDto,
  SharedLibraryEnums,
} from 'shared-lib';
import {
  AddCompanyDto,
  CompanyTypes,
  MobileCodeDropdownDto,
} from '../../models';
import { CompanyService } from '../../company.service';
import { CompanyProxy } from '../../company.proxy';
import { SelectComponent } from 'projects/shared-lib/src/lib/form-components';
@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  providers: [RouterService],
  styleUrls: ['./new-company.component.css'],
})
export class NewCompanyComponent implements OnInit {
  companyForm: FormGroup;
  lookups: { [key: string]: lookupDto[] };
  LookupEnum = LookupEnum;
  selectedPhoneCode: any | undefined;
  mobileCodes: MobileCodeDropdownDto[];
  get subscriptionId(): string {
    return this.routerService.currentId;
  }

  ngOnInit() {
    this.loadLookups();
    this.initializeCompanyForm();

    this.Subscribe();
  }

  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }

  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.Currency,
      LookupEnum.Industry,
      LookupEnum.Country,
      LookupEnum.MobileCode,
    ]);
  }

  onSubmit() {
    
    
    if (this.formsService.validForm(this.companyForm, true)) return;

    const request: AddCompanyDto = this.companyForm.value;

    request.subscriptionId = this.subscriptionId;

    request.companyType = CompanyTypes.Holding;

    this.companyService.addCompany(request);
  }

  private initializeCompanyForm() {
    this.companyForm = this.formBuilder.group({
      name: new FormControl('', [
        customValidators.required,
        customValidators.length(5, 100),
      ]),
      countryCode: new FormControl('', [customValidators.required]),
      industryId: new FormControl('', [customValidators.required]),
      currencyId: new FormControl('', [customValidators.required]),
      website: new FormControl('', [customValidators.required]),
      address: new FormControl('', [
        customValidators.length(10, 100),
        customValidators.required,
        customValidators.number,
      ]),
      mobileNumber: new FormControl('', [customValidators.required]),
      mobileNumberCode: new FormControl('', [customValidators.required]),
      companyEmail: new FormControl('', [
        customValidators.required,
        customValidators.email,
      ]),
      file: new FormControl('', [customValidators.required]),
    });

    this.companyForm
    .get('countryCode')
    ?.valueChanges.subscribe((selectedCountryCode) => {
      this.selectedPhoneCode = this.lookups[LookupEnum.MobileCode].find(
        mobile => mobile.id === selectedCountryCode
      )?.id.toString();
      this.companyForm.patchValue({'mobileNumberCode': this.selectedPhoneCode})
      
    });
  }

  @ViewChild(SelectComponent) childComponent!: SelectComponent;
  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    public lookupsService: LookupsService,
    private routerService: RouterService,
    private companyService: CompanyService,
    private companyProxy: CompanyProxy,
    public sharedLibEnums: SharedLibraryEnums
  ) {}
}
