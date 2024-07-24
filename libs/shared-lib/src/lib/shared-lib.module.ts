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
  ToastComponent,
  TablePrintComponent,
  TabviewComponent
  
  
  
  
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
import { GetElementByIDPipe } from './pipes/get-element-by-id.pipe';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectIconComponent } from './form-components/selectIcon/selectIcon.component';
import { UploadMultipeFilesComponent } from './form-components/upload-multipe-files/upload-multipe-files.component';
import { CalendarComponent } from './form-components/calendar/calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { ExportComponent } from './components/export/export.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ChangeColumnComponent } from './components/change-column/change-column.component';

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
    SelectIconComponent,
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
    GetElementByIDPipe,
    ToastComponent,
    UploadMultipeFilesComponent,
    CalendarComponent,
    TablePrintComponent,
    TabviewComponent,
    ExportComponent,
    ChangeColumnComponent
  ],
  imports: [
    HttpClientModule,
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
    ProgressSpinnerModule,
    PdfViewerModule
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
    SelectIconComponent,
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
    ProgressSpinnerModule,
    SharedFormComponent,
    FildestComponent,
    ButtonMicroComponent,
    ToggelComponent,
    CalendarComponent,
    GetElementByIDPipe, 
    ToastComponent,
    UploadMultipeFilesComponent,
    TablePrintComponent,
    TabviewComponent,
    ExportComponent,
    PdfViewerModule,
    ChangeColumnComponent
  ],
})
export class SharedLibModule {}
