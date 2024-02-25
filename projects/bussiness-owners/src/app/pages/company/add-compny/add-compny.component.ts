import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LanguageService,
  LoaderService,
  LogService,
  ToasterService,
} from 'shared-lib';
import { CompanyService } from '../../../services/company.httpservice';
import { DropdownItemDto } from '../../../models/company/dropdown';
import { AddCompanyDto } from '../../../models/company/addcompany';
import { combineLatest } from 'rxjs';
import { CountryDropDown } from '../../../models/company/countrydropdown';
import { MobileCodeDropdownDto } from '../../../models/company/mobilecodedropdown';
@Component({
  selector: 'app-add-compny',
  templateUrl: './add-compny.component.html',
  styleUrls: ['./add-compny.component.css'],
})
export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup;
  currencyDropDown: DropdownItemDto[];
  industryDropDown: DropdownItemDto[];
  subdoaminDropDown: DropdownItemDto[];
  CountryDropDown: CountryDropDown[];
  mobileCodeDropDown: MobileCodeDropdownDto[];


  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private logService: LogService,
    private toasterService: ToasterService,
    private loaderService: LoaderService,
    private languageService: LanguageService
  ) {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      countryCode: ['', Validators.required],
      subdomainName: ['', Validators.required],
      industryId: ['', Validators.required],
      currencyId: ['', Validators.required],
      website: [
        '',
        Validators.required,
        // Validators.pattern("^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$"),
      ],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      mobileNumber: ['', Validators.required],
      mobileNumberCode: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.getDropDowns();

     // Add change event listener to the country dropdown
     this.companyForm.get('countryCode')?.valueChanges.subscribe((selectedCountryCode) => {
      // Find the corresponding country from the fetched data
      const selectedCountry = this.mobileCodeDropDown.find(mobile => mobile.code === selectedCountryCode);
      this.logService.log(selectedCountryCode, 'cadfdsf:');

      if (selectedCountry) {
        // Set the corresponding phone code in the form
        this.logService.log(selectedCountry.phoneCode, 'cadfdsf:');

        this.companyForm.patchValue({ 'mobileNumberCode': selectedCountry.code });

      } 
    });

    this.companyForm.get('countryCode')?.valueChanges
  }


  onSubmit() {
    if (!this.companyForm.valid) {
      this.toasterService.showError('Error', 'Please fill in all the required fields');
      return;
    }
    this.addCompany();
  }

  getDropDowns() {
    combineLatest([
      this.companyService.getDropDown(),
      this.companyService.getMobileCodeDropDown(),
      this.companyService.getCountryDropDown(),
    ]).subscribe({
      next: ([resDropdown, resMobileCode,  resCountry]) => {
        this.currencyDropDown = resDropdown.response.currencyDropdown;
        this.logService.log(this.currencyDropDown, 'currency Information:');
        this.industryDropDown = resDropdown.response.industryDropdown;
        this.logService.log(this.industryDropDown, 'industry Information:');
        this.mobileCodeDropDown = resMobileCode.response;
        this.logService.log(
          this.mobileCodeDropDown,
          'mobileCodeDropdownDto Information:'
        );
        this.CountryDropDown = resCountry.response;
        this.logService.log(
          this.CountryDropDown,
          'CountryDropDown Information:'
        );
      },
    });
  }

  addCompany() {
    this.loaderService.show();
    const request: AddCompanyDto = this.companyForm.value;
    this.logService.log(request, 'Checking the sending request:');

    this.companyService.addCompany(request).subscribe({
      next: (response) => {
        this.logService.log(response, 'Company added successfully:');
        this.toasterService.showSuccess(
          'Success',
          this.languageService.transalte('Company.CompanyAddedSuccessfully')
        );
        this.loaderService.hide();
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }

  hasError(field: string, errorType: string): boolean {
    const control = this.companyForm.get(field);
    return (control?.hasError(errorType) && control?.touched) ?? false;
  }
}
