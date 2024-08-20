import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import { customValidators, FormsService, LanguageService, ToasterService } from 'shared-lib';
import { CustomerOpeningBalanceDistributeComponent } from '../../../components/customer-opening-balance-distribute/customer-opening-balance-distribute.component';
import { TranslationService } from 'projects/adminportal/src/app/modules/i18n';
import { SalesService } from '../../../sales.service';
import { CategoryDropdownDto, CustomerDropDown, GetLineDropDownById } from '../../../models';

@Component({
  selector: 'app-add-customer-opeening-balance',
  templateUrl: './add-customer-opeening-balance.component.html',
  styleUrl: './add-customer-opeening-balance.component.scss'
})
export class AddCustomerOpeeningBalanceComponent implements OnInit {
  formGroup: FormGroup
  customerForm: FormArray
  openingJournalList: CategoryDropdownDto[];
  LinesDropDown: GetLineDropDownById[];
  CustomerDropDownByAccountId: CustomerDropDown[]
  amount: string;
  balanceTypeSelect: string;
  debitOrCredit: string;
  openingJournalId: number
  filteredAccounts: AccountDto[] = [];
  balanceType: any = [{ label: "Debit", value: "Debit" }, { label: "Credit", value: "Credit" }]
  openingBalanceJournalEntryLineId: number
  amountNature: string
  editMode: boolean
  formChanged: boolean
  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private translationService: TranslationService,
    private SalesService: SalesService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private formService: FormsService,

  ) { }
  ngOnInit(): void {
    this.customerForm = this.fb.array([]);
    this.subscribe()
  
    this.getCustomerOpeningBalance()
    this.customerForm = this.fb.array([this.createBankFormGroup()]);
    this.openingBalanceJournalEntryDropdown()
    this.formGroup = this.fb.group({
      open: new FormControl('', customValidators.required),
      open2: new FormControl('', customValidators.required),
      name1: '',
      name2: '',
    })
    this.customerForm = this.fb.array([this.createBankFormGroup()]);
    this.createBankFormGroup()
  }
  public get items(): FormArray {
    return this.customerForm as FormArray;
  }
  addLine() {
    if (!this.formService.validForm(this.customerForm, false)) return;

      this.items.push(this.createBankFormGroup())
      this.customerForm.updateValueAndValidity();
    
 
  }
  async removeByFront(index: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');

    if (confirmed) {
      this.toasterService.showSuccess(
        this.languageService.transalte('deleteCustomerDefinition.success'),
        this.languageService.transalte('deleteCustomerDefinition.deleted')
      );
      this.customerForm.removeAt(index);
    }
  }
  onDelete(id: number, index: number): void {
    if (id == 0) {
      this.removeByFront(index)
    }
    else {
      this.SalesService.deleteCustomerOpeningBalance(id)
    }
  }
  createBankFormGroup(): FormGroup {
    return this.fb.group({
      id: 0,
      customerId: new FormControl('', customValidators.required),
      accountName:  new FormControl(),
      balance:  new FormControl( ),
      balanceType: new FormControl('', customValidators.required),
      displayName:  new FormControl( ),
      dueDates: []
    });
  }
  accountSelected(event: any, index: number) {
    const bankLine = this.items.at(index);
    if (bankLine) {
      var accountData: any = this.CustomerDropDownByAccountId.find((c: any) => c.id == event);
      if (accountData) {
        bankLine.get('accountName')?.setValue(accountData?.name);
        bankLine.get('accountCode')?.setValue(accountData?.accountCode);
        bankLine.get('displayName')?.setValue(`${accountData.code}`);
      }
    } else {
      console.error(`No FormGroup found at index ${index}`);
    }
  }
  openDistribute(data: any, account: number, index: number, customerGroup: FormGroup) {
    let accountData = this.filteredAccounts.find((elem) => elem.id === account);

    if (data.balanceType != "Debit") {
      return null;
    } else {
      const ref = this.dialog.open(CustomerOpeningBalanceDistributeComponent, {
        width: '750px',
        height: '600px',
        data: data,
      });
      ref.onClose.subscribe((res) => {
        if (res) {
          data.dueDates = res;
        }
      });

    }

  }
  openingBalanceJournalEntryDropdown() {
    this.SalesService.openingBalanceJournalEntryDropdown();

  }
  onOpeningJournalChange(event: any) {
    this.getLinesDropDown(event)
  }
  getLinesDropDown(id: number) {
    this.openingJournalId = id
    this.SalesService.getLinesDropDown(id);
  }
  onLinesChange(event: any) {
    setTimeout(() => {
      this.LinesDropDown?.forEach((element: any) => {
        if (element.id == event) {
          this.formGroup.patchValue({
            name1: element.amount,
            name2: element.amountNature
          })
          this.getCustomerDropDownByAccountId(element.accountId)
          this.openingBalanceJournalEntryLineId = element.id
          this.amountNature = element.amountNature
        }
      });


    }, 500);


  }
  getCustomerDropDownByAccountId(id: number) {
    this.SalesService.getCustomerDropDownByAccountId(id);
  }
  balanceTypeSelected(event: any) {
    this.balanceTypeSelect = event
  }
  onSubmit() {
    if (!this.formService.validForm(this.customerForm, false)) return;

    this.customerForm.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
    const body = {
      openingBalanceJournalEntryLineId: this.openingBalanceJournalEntryLineId,
      amountNature: this.amountNature,
      customerOpeningBalanceDetails: this.items.value
    }
    this.SalesService.AddCustomerOpeningBalance(body)


  }
  getCustomerOpeningBalance() {
    this.SalesService.getCustomerOpeningBalance();
  }
  subscribe() {
    this.SalesService.CustomerOpeningBalancelistObservable.subscribe((res: any) => {
      this.customerForm.clear();
      if (res.length != 0) {
        this.formGroup?.patchValue({
          open: res.openingBalanceJournalEntryId,
          open2: res.openingBalanceJournalEntryLineId,
          // name1: res.amount,
          // name2: res.amountNature
        }, { emitEvent: true });
        this.onOpeningJournalChange(res.openingBalanceJournalEntryId);
        this.onLinesChange(res.openingBalanceJournalEntryLineId);
        this.editMode = true
        this.formChanged = false
        
      }
      if (res && res.customerOpeningDetails && Array.isArray(res.customerOpeningDetails)) {
        res.customerOpeningDetails.forEach((detail: any, index: number) => {
          const formGroup = this.createBankFormGroup();
          formGroup.patchValue({
            id: detail.id,
            customerId: detail.customerId || '',
            accountName: detail.customerName || '',
            balance: detail.balance || null,
            balanceType: detail.balanceType || '',
            displayName: detail.displayName || '',
            dueDates: detail.balanceDueDates || []
          });
          this.customerForm.push(formGroup);
          this.accountSelected(detail.customerId, index);
        });
      }
    });
    this.SalesService.openingBalanceJournalEntryDropdownDataObservable.subscribe((res) => {
      this.openingJournalList = res;
    });
    this.SalesService.customerDeletedObser.subscribe()
    this.SalesService.CustomerDropDownByAccountIdObservable.subscribe((res) => {
      this.CustomerDropDownByAccountId = res;
    });
    this.SalesService.LinesDropDownDataObservable.subscribe((res: any) => {
      this.LinesDropDown = res;
    });
    if (this.formGroup) {
      this.formGroup.get('open')?.valueChanges.subscribe(value => {
        this.onOpeningJournalChange(value);
      });
      this.formGroup.get('open2')?.valueChanges.subscribe(value => {
        this.onLinesChange(value);
      });
    }
  
 
  }

  
}

