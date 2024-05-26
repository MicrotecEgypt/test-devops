import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  LayoutComponent,
  SearchEngineComponent,
  LoaderComponent,
  DataTableComponent,
  TablePaginatorComponent,
  ButtonMicroComponent,
  
  
  
} from './components';
import {
  FieldValidationsComponent,
  FormGroupComponent,
  LabelComponent,
  SelectComponent,
  TextInputComponent,
  MultiSelectComponent,
  ButtonComponent,
  SharedFormComponent,
  ToggelComponent,
} from './form-components';
import { DropdownModule } from 'primeng/dropdown';
import { GetLookupPipe } from './pipes/lookupList';
import { PageContentComponent } from './components/page-content/page-content.component';
import { PrimeSharedModule } from './prime-module/prime.module';
import { FileUploaderComponent } from './form-components/file-uploader/file-uploader.component';
import { TreeTableModule } from 'primeng/treetable';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InputSwitchComponent } from './form-components/input-switch/input-switch.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RatingComponent } from './form-components/rating/rating.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { AttachmentViewerComponent } from './components/attachment-viewer/attachment-viewer.component';
import { TreeModule } from 'primeng/tree';
import { NamedFileUploaderComponent } from './form-components/named-file-uploader/named-file-uploader.component';
import { FildestComponent } from './components/fildest/fildest.component';

@NgModule({
  declarations: [
    GetLookupPipe,
    LayoutComponent,
    SearchEngineComponent,
    LoaderComponent,
    FieldValidationsComponent,
    LabelComponent,
    TextInputComponent,
    SelectComponent,
    FormGroupComponent,
    PageContentComponent,
    FileUploaderComponent,
    NamedFileUploaderComponent,
    MultiSelectComponent,
    DataTableComponent,
    AttachmentViewerComponent,
    ButtonComponent,
    InputSwitchComponent,
    BreadCrumbComponent,
    TablePaginatorComponent,
    RatingComponent,
    PaginatorComponent,
    AccordionComponent,
    SharedFormComponent,
    FildestComponent,
    ButtonMicroComponent,
    ToggelComponent, 
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    DropdownModule,
    MatPaginatorModule,
    TranslateModule,
    FormsModule,
    PrimeSharedModule,
    TreeTableModule,
    TreeModule,
  ],
  exports: [
    GetLookupPipe,
    LayoutComponent,
    SearchEngineComponent,
    LoaderComponent,
    FieldValidationsComponent,
    LabelComponent,
    TextInputComponent,
    SelectComponent,
    FormGroupComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NamedFileUploaderComponent,
    PageContentComponent,
    PrimeSharedModule,
    FileUploaderComponent,
    MultiSelectComponent,
    DataTableComponent,
    AttachmentViewerComponent,
    ButtonComponent,
    InputSwitchComponent,
    BreadCrumbComponent,
    TablePaginatorComponent,
    RatingComponent,
    PaginatorComponent,
    AccordionComponent,
    TreeModule,
    SharedFormComponent,
    FildestComponent,
    ButtonMicroComponent,
    ToggelComponent,
    
  ],
})
export class SharedLibModule {}
