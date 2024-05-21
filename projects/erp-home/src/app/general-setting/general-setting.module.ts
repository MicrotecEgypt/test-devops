import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { AuthGuard } from 'microtec-auth-lib';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TagListComponent } from './pages/tag-list/tag-list.component';
import { TagAddComponent } from './pages/tag-add/tag-add.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: '',
        component: TagListComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.tag_list,
        },
      }
    ],
  },
];

@NgModule({
  declarations: [
    TagListComponent,
    TagAddComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    SharedLibModule,
    AutoCompleteModule,
    RouterModule.forChild(routes),
  ],
})
export class GeneralSettingModule {}
