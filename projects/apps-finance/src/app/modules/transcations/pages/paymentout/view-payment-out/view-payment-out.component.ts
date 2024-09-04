import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CurrentUserService, FormsService, LanguageService, LookupsService, RouterService, ToasterService } from 'shared-lib';
import { BankPaymentMethods, SharedFinanceTranscationEnums, ViewPaymentInDto, ViewPaymentOutDto } from '../../../models';
import { TranscationsService } from '../../../transcations.service';
import { DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AddCostCenterComponent } from '../../../components/paymentin/add-cost-center/add-cost-center.component';
import { PaymentMethodComponent } from '../../../components/paymentin/payment-method/payment-method.component';
import { PaymentOutPaymentMethodComponent } from '../../../components/paymentout/payment-out-payment-method/payment-out-payment-method.component';
import { AddPaymentOutCostCenterComponent } from '../../../components/paymentout/add-payment-out-cost-center/add-payment-out-cost-center.component';

@Component({
  selector: 'app-view-payment-out',
  templateUrl: './view-payment-out.component.html',
  styleUrls: ['./view-payment-out.component.scss'],
  providers: [RouterService]
})
export class ViewPaymentOutComponent implements OnInit {

  ViewForm: ViewPaymentOutDto;
  totalAmount: number = 0;
  paymentMethod: BankPaymentMethods[] = []
  CostCenter: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private dialog: DialogService,
    private lookupsService: LookupsService,
    private financeService: TranscationsService,
    private formsService: FormsService,
    public  sharedFinanceEnums: SharedFinanceTranscationEnums,
    private toasterService: ToasterService,
    private langService: LanguageService,
    private currentUserService: CurrentUserService,
    private titleService: Title,
    private routerService: RouterService,


  ) {
  }
  ngOnInit() {
    this.titleService.setTitle(
      this.langService.transalte('PaymentIn.addpaymentin')
    );
    this.loadView();


    this.financeService.AllPayMethodsDropdownObservable.subscribe((res: any) => {
      this.paymentMethod = res
    })
  }

  calculateTotalAmount() {
    this.totalAmount = this.ViewForm.paymentOutDetails.reduce((acc, control) => {
      const debitValue = parseFloat(control.amount.toString()) || 0;
      return acc + debitValue;
    }, 0);
    this.calculateTotalLocalAmount()
  }
  calculateTotalLocalAmount() {
    let total = 0;
    this.ViewForm.paymentOutDetails.forEach((details: any) => {
      const amount = details.amount || 0;
      const rate = this.ViewForm.rate;
      if (rate) {
        total += amount * rate;
      }
    });
    return total;
  }

  loadView() {
    this.financeService.viewPaymentOut(this.routerService.currentId);
    this.financeService.ViewpaymentOutDataObservable.subscribe((res: any) => {
      this.ViewForm = res
      console.log("ViewForm",this.ViewForm);
    })
  }
  getAllPayMethodsDropdown(BankId: number, BankAccountId: number) {
    this.financeService.getAllPayMethodsDropdown(BankId, BankAccountId)
  }

  handleButtonClick(Line: any): void {

    this.getAllPayMethodsDropdown(this.ViewForm.bankId!,this.ViewForm.bankAccountId!)
    const paymentMethodId = Line.paymentMethodId;
    console.log("Line.paymentmethodId",Line.paymentMethodId)
    const selectedPayment = this.paymentMethod.find(method => method.id === paymentMethodId);
console.log("selectedPayment",selectedPayment)
    if (selectedPayment) {
      const paymentMethodType = selectedPayment.paymentMethodType;
      console.log("Line.value",Line)

      this.openDialog(Line, selectedPayment, Line, Line.amount);
    }
  }
  
  openDialog(value: any, selectedPayment: any, journal: any, amount: number) {
    if (selectedPayment.paymentMethodType == this.sharedFinanceEnums.paymentMethodTypeString.Cash || selectedPayment.paymentMethodType == null) {
      return true
    } else {
      const data = value
      const viewdata = true;
      const ref = this.dialog.open(PaymentOutPaymentMethodComponent, {
        width: '900px',
        height: '600px',
        data: { ...data, selectedPayment,viewdata },
      });
      
    }
  }
  openCostPopup(data: any, journal: FormGroup, account: number, index: number) {
    console.log("data 11", data)
    const viewdata = true;

    const dialogRef = this.dialog.open(AddPaymentOutCostCenterComponent, {
      width: '900px',
      height: '600px',
      header: 'Edit Cost Center Allocation',
      data: { ...data,viewdata },
    });
    
  }

  isCostCenterallowed(journalLine: any, costCenterConfig: string): boolean {
    console.log(costCenterConfig,"costCenterConfig")
    if (costCenterConfig === this.sharedFinanceEnums.costCenterConfig.Mandatory || costCenterConfig === this.sharedFinanceEnums.costCenterConfig.Optional) {
      return true;
    } else {
      this.CostCenter = this.formBuilder.group({
        costCenterId: new FormControl(null),
        percentage: new FormControl(null),

      });

      return false;

    }
  }

}
