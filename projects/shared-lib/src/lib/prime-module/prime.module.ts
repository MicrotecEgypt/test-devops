import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AccordionModule } from 'primeng/accordion';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  providers: [DialogService],
  declarations: [],
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    BreadcrumbModule,
    InputSwitchModule,
    DropdownModule,
    SidebarModule,
    DialogModule,
    MultiSelectModule,
    ToggleButtonModule,
    AccordionModule,
    DynamicDialogModule,
    PasswordModule,
    CheckboxModule,
    PaginatorModule,
  ],
  exports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    BreadcrumbModule,
    InputSwitchModule,
    DropdownModule,
    SidebarModule,
    DialogModule,
    MultiSelectModule,
    ToggleButtonModule,
    AccordionModule,
    DynamicDialogModule,
    PasswordModule,
    CheckboxModule,
    PaginatorModule,
  ],
})
export class PrimeSharedModule {}
