import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { AuthGuard } from 'microtec-auth-lib';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TagAddComponent } from './components/tag-add/tag-add.component';
import { TagEditComponent } from './components/tag-edit/tag-edit.component';
import { TagListComponent } from './pages/tags/tag-list/tag-list.component';
import { FinancialCalendarListComponent } from './pages/financial-calendar/financial-calendar-list/financial-calendar-list.component';
import { CreateFinancialCalendarComponent } from './components/create-financial-calendar/create-financial-calendar.component';
import { EditFinancialCalendarComponent } from './components/edit-financial-calendar/edit-financial-calendar.component';
import { CurrencyDefinitionComponent } from './pages/currencyDefinition/currency-definition/currency-definition.component';
import { AddCurrencyDefinitionComponent } from './components/currencyDefinition/add-currency-definition/add-currency-definition.component';
import { EditCurrencyDefinitionComponent } from './components/currencyDefinition/edit-currency-definition/edit-currency-definition.component';
import { CurrencyConversionComponent } from './pages/currency-conversion/currency-conversion.component';
import { AddCurrencyConversionComponent } from './components/currencyConversion/add-currency-conversion/add-currency-conversion.component';
import { EditCurrencyConversionComponent } from './components/currencyConversion/edit-currency-conversion/edit-currency-conversion.component';
import { MainFinancialCalendarComponent } from './pages/financial-calendar/main-financial-calendar/main-financial-calendar.component';
import { NoChildrenAccountsComponent } from './components/noChildrenAccounts/nochildaccounts.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.GeneralSettings,
    },
    children: [
      {
        path: '',
        component: TagListComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.tag_list,
        },
      },
      {
        path: 'tags',
        component: TagListComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.tag_list,
        },
      },
      {
        path: 'financial-calendar',
        component: MainFinancialCalendarComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.calendar_list,
        },
        children:[
          {
            path: '',
            component: FinancialCalendarListComponent,
            // canActivate: [AuthGuard],
            data: {
              breadcrumb: '',
            },
          },
          {
            path: 'add-financial-calendar',
            component: CreateFinancialCalendarComponent,
            // canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.calendar_Add,
            },
          },
          {
            path: 'edit-financial-calendar/:id',
            component: EditFinancialCalendarComponent,
            // canActivate: [AuthGuard],
            data: {
              breadcrumb: BreadcrumbLabel.calendar_Edit,
            },
          },
        ]
      },
      {
        path: 'currency-definition',
        component: CurrencyDefinitionComponent,
        // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.CURRENCY_DEFINITION_LIST,
        },
      },
      {
        path: 'currency-conversion',
        component: CurrencyConversionComponent,
        //  canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.CURRENCY_CONVERSION,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [
    TagListComponent,
    TagAddComponent,
    TagEditComponent,
    FinancialCalendarListComponent,
    CreateFinancialCalendarComponent,
    EditFinancialCalendarComponent,
    CurrencyDefinitionComponent,
    AddCurrencyDefinitionComponent,
    EditCurrencyDefinitionComponent,
    CurrencyConversionComponent,
    AddCurrencyConversionComponent,
    EditCurrencyConversionComponent,
    MainFinancialCalendarComponent,
    NoChildrenAccountsComponent
  ],
  imports: [CommonModule, SharedLibModule, AutoCompleteModule, RouterModule.forChild(routes)],
})
export class GeneralSettingModule {}
