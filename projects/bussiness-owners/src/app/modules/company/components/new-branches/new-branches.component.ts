import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { LookupEnum, LookupsService, RouterService, customValidators, lookupDto } from 'shared-lib';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-new-branches',
  templateUrl: './new-branches.component.html',
  styleUrl: './new-branches.component.scss'
})
export class NewBranchesComponent implements OnInit {
  newBrancheForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };

  ngOnInit() {
    this.initializeForm();
    this.loadLookups();
    this.Subscribe();
  }
  initializeForm(){
    this.newBrancheForm= this.fb.group({
      Country:["",customValidators.required],
      mobileNumberCode:["",customValidators.required],
      mobileNumber:["",customValidators.required],
    })
  }
  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.Currency,
      LookupEnum.Industry,
      LookupEnum.Country,
      LookupEnum.MobileCode,
    ]);
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  submitForm(){
    console.log(this.newBrancheForm);
    
  }
  onCancel() {
    this.ref.close();
  }


  constructor(
    private fb: FormBuilder,
    public lookupsService: LookupsService,
    private ref: DynamicDialogRef,
    private routerService: RouterService,


  ){}
}
