import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountService } from '../../../../account/account.service';
import { costLookup } from '../../../models';
import { FormsService, LanguageService, ToasterService, customValidators } from 'shared-lib';
import { SelectComponent } from 'libs/shared-lib/src/lib/form-components';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';

@Component({
  selector: 'app-cost-center-allocation-popup',
  templateUrl: './cost-center-allocation-popup.component.html',
  styleUrl: './cost-center-allocation-popup.component.scss'
})
export class CostCenterAllocationPopupComponent implements OnInit  , AfterViewInit{
  @ViewChild('select')select : SelectComponent
  accountLookup : any  = [];
  calcPercentage : number
  calcAmount : number
  lookupValues : any = []

  constructor( private fb : FormBuilder , public config : DynamicDialogConfig , private accountService : AccountService , private formsService : FormsService , private ref : DynamicDialogRef , private cdr : ChangeDetectorRef ,     private toasterService: ToasterService, private languageService : LanguageService
    ,public generalService: GeneralService){}
  ngAfterViewInit(): void {

    console.log(this.select)

    if(this.config.data?.costCenters?.length) {
      this.allocationform.clear();
      this.config.data.costCenters.forEach((element : any) => {
         this.lookupValues.push(Number(element.costCenterId) ) 
        this.cdr.detectChanges()
         console.log(this.lookupValues)

        // this.select.selectedValue = element.costCenterId
        this.allocationform.push(this.fb.group({
          ...element
        }))
      });

    

     
    }
   
  }

  close(){
    this.ref.close();
  }
  ngOnInit(): void {
   
    this.amountForm = this.fb.group({
      amount : 0
    })
    const formatdebitAmount=this.generalService.formatNumber(this.config.data.debitAmount, this.generalService.fraction)
    const formatcreditAmount=this.generalService.formatNumber(this.config.data.creditAmount, this.generalService.fraction)
    console.log(formatdebitAmount)
    console.log(formatcreditAmount)

  
    if(this.config.data.creditAmount == '0.0' || !this.config.data.creditAmount) {
      this.amountForm.get('amount')?.setValue(this.config.data.debitAmount)
    }
     if(this.config.data.debitAmount == '0.0' || !this.config.data.debitAmount) {
      this.amountForm.get('amount')?.setValue(this.config.data.creditAmount)

    }
    this.allocationform.push(this.createItem())


  



    this.allocationform.valueChanges.subscribe(res=>{
      this.initValueChangeHandlers();

      this.calcPercentage = res.reduce((accumulator : any, currentValue : any) => {
    
        return accumulator + Number(currentValue.percentage);
      }, 0);
      this.calcAmount = res.reduce((accumulator : any, currentValue : any) => {
        return accumulator + Number(currentValue.amount);
      }, 0);
    })

    // if(this.config?.data?.text && this.config?.data?.text == 'view') {
       
      // this.allocationform.controls.forEach(control=>{
      
      //   // control.get('costCenterId')?.disable()
      //   // control.get('amount')?.disable()
      //   // control.get('percentage')?.disable()
      // })
    // }




    this.accountService.getCostCenterLookup().subscribe((res : costLookup[])=>{
      this.accountLookup = res.map(costCenter => ({
          ...costCenter,
          displayName: `${costCenter.name} (${costCenter.code})`
        }));


      
 
      
    })

  }

  onRemove(i:number) {
    this.allocationform.removeAt(i)
  }



  initValueChangeHandlers() {
    this.allocationform.controls.forEach(control => {
      const formGroup = control as FormGroup;
      this.subscribeToAmountChanges(formGroup);
      this.subscribeToPercentageChanges(formGroup);
    });
  }

  subscribeToAmountChanges(formGroup: FormGroup) {
    formGroup.get('amount')?.valueChanges.subscribe(amount => {
      const percentageControl = formGroup.get('percentage');
      if (percentageControl && amount !== null && amount !== undefined && !isNaN(amount)) {
        const percentage = (amount / this.amountForm.get('amount')?.value) * 100;
        console.log("heypercentage" , percentage)

        if (percentageControl.value !== percentage) {
          percentageControl.setValue(percentage, { emitEvent: false });
        }
      }
    });
  }

  subscribeToPercentageChanges(formGroup: FormGroup) {
    formGroup.get('percentage')?.valueChanges.subscribe(percentage => {
      const amountControl = formGroup.get('amount');
      if (amountControl && percentage !== null && percentage !== undefined && !isNaN(percentage)) {
        const amount = (percentage * this.amountForm.get('amount')?.value) / 100;
        console.log("heyAmount" , amount)
        if (amountControl.value !== amount) {
          amountControl.setValue(amount, { emitEvent: false });
        }
      }
    });
  }
  allocationform : FormArray = this.fb.array([])

  amountForm : FormGroup

  createItem(): FormGroup {
    return this.fb.group({
      costCenterId: new FormControl('',customValidators.required),
      name: [''],
      amount :  new FormControl('' , customValidators.required),
      percentage :  new FormControl('',customValidators.required)
    });
  }

  addItem() {
    this.allocationform.push(this.createItem())
  }

  validateInput(event: any): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Regular expression to match numbers and one decimal point
    const regex = /^\d*\.?\d*$/;

    // If the value does not match the regex, remove the invalid characters
    if (!regex.test(value)) {
      event.preventDefault();

      input.value = value.slice(0, -1);
    }

  
  }
  checkForDuplicateCostCenters(): boolean {
    const costCenterIds = this.allocationform.value.map((item: any) => item.costCenterId);
    const duplicateIds = costCenterIds.filter((id: string, index: number) => costCenterIds.indexOf(id) !== index);
    return duplicateIds.length > 0;
  }
  onSave() {
    if (!this.formsService.validForm(this.allocationform, false)) return;
    if (this.checkForDuplicateCostCenters()) {
      this.toasterService.showError(this.languageService.transalte('Journal.Error') , this.languageService.transalte('Journal.cannotDuplicate'))
   
      return;
    }
    
    this.ref.close(this.allocationform.value)

  }


}