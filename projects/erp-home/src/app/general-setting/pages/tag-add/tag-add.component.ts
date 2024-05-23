import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'microtec-auth-lib';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, LoaderService, MenuModule, customValidators } from 'shared-lib';
import { GeneralSettingService } from '../../general-setting.service';
import { AddTagDto } from '../../models';
@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.scss']
})
export class TagAddComponent implements OnInit {
  TagForm: FormGroup;
  modulelist: MenuModule[];
  

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public authService: AuthService,
    private ref: DynamicDialogRef,
    private generalSettingService : GeneralSettingService
  ) { }

  ngOnInit() {
    this.moudlelist();
    this.initializeTagForm();
  }

  moudlelist() {
    this.modulelist = [
      { moduleId: 1, module: 'Module 1' },
      { moduleId: 2, module: 'Module 2' },
      { moduleId: 3, module: 'Module 3' }
    ];
    // this.authService.getModules();
  }

  initializeTagForm() {
    this.TagForm = this.fb.group({
      Code: new FormControl({  value: '', disabled: true  }, customValidators.required),
      Name: new FormControl('', customValidators.required),
      ModuleIds: new FormControl([], customValidators.required)
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if(!this.TagForm.valid) return;
    const tagDto :AddTagDto=this.TagForm.value;
    this.generalSettingService.addTag(tagDto,this.ref);
    
  }
}
