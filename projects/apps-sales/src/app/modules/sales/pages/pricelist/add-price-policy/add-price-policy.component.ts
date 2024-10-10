import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { customValidators, FormsService } from 'shared-lib';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-price-policy',
  templateUrl: './add-price-policy.component.html',
  styleUrl: './add-price-policy.component.scss'
})
export class AddPricePolicyComponent implements OnInit {
  data:any;
  listOfExcel: any[]=[];

  addForm: FormGroup;
  ngOnInit() {
    this.initializeForm()
  }
  initializeForm() {
    this.addForm = this.formBuilder.group({

      code: new FormControl(''),
      name: new FormControl('' ,[customValidators.required, customValidators.length(1,100)]),
      uploadPolicy: new FormControl(''),
      fromPolicy: new FormControl(''),
      item: new FormControl(''),
      itemCategory: new FormControl(''),
      value: new FormControl(''),
      valueType: new FormControl(''),
      VAT: new FormControl(''),
      applyDate: new FormControl(''),
      date: new FormControl(''),
      valueSelect:new FormControl(''),
      pricePolicyDetails: this.formBuilder.array([]),
  
    });

  }
  get pricePolicyFormArray() {
    return this.addForm.get('pricePolicyDetails') as FormArray;
  }
  addNewRow() {
    
    if (!this.formsService.validForm(this.pricePolicyFormArray, false) ) return;

  
  let newLine = this.formBuilder.group(
    {
      code: new FormControl('',[customValidators.required]),
      name: new FormControl(''),
      uom: new FormControl(''),
      varient: new FormControl(''),
      price: new FormControl('',[customValidators.required]),
      VAT: new FormControl(''),
      priceVAT: new FormControl(''),
      id: new FormControl(0),
     
    }
  );
  newLine.updateValueAndValidity();
  this.pricePolicyFormArray.push(newLine);

}
  test(){

  }
  /////////////////////////////
  onclick() {
    console.log(this.data);

    const keys = ['code', 'name', 'uom', 'varient', 'price', 'VAT'];

    const result = this.data.slice(1).map((arr:any) => {
      return keys.reduce((obj: any, key, index) => {
        obj[key] = arr[index];
        return obj;
      }, {});
    });

    console.log(result);
    this.listOfExcel = result;
    // this.pricePolicyFormArray.clear();

    this.listOfExcel.forEach((ele: any) => {
      let dataForm = this.formBuilder.group({
        code: new FormControl(ele.code, [customValidators.required]),
        name: new FormControl(ele.name),
        uom: new FormControl(ele.uom),
        varient: new FormControl(ele.varient),
        price: new FormControl(ele.price, [customValidators.required]),
        VAT: new FormControl(ele.VAT),
        priceVAT: new FormControl(''), // Assuming this will be calculated or handled elsewhere
        id: new FormControl(0), // Default value, assuming id is 0 for new entries
      });
  
      // Add the group to the form array
      this.pricePolicyFormArray.push(dataForm);
    });
    // this.pricePolicyFormArray.patchValue(result)
    // console.log(this.pricePolicyFormArray);
    
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop().toLowerCase();
      if (fileType === 'xlsx') {
        this.readExcelFile(file);
      } else {
        console.log('not supported');
      }
    }
  }

  readExcelFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const keys = ['code', 'name', 'uom', 'varient', 'price', 'vat'];
      this.data = json
      // .slice(1).map((arr:any) => {
      //   return keys.reduce((obj: any, key, index) => {
      //     obj[key] = arr[index];
      //     return obj;
      //   }, {});
      // });
      
      console.log(json,'this.datathis.data');
    };
    
    reader.readAsBinaryString(file);
    console.log(reader.readAsBinaryString(file),'this.datathis.data');

  }
  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,


  ){}
}
