import { Component } from '@angular/core';

import {RouterService, SharedLibraryEnums, ToasterService } from 'shared-lib';

import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-add-item-definition',
  templateUrl: './add-item-definition.component.html',
  styleUrl: './add-item-definition.component.scss'
})
export class AddItemDefinitionComponent  {
  id : number
  constructor(private _router : RouterService,private route : ActivatedRoute ){
    this.id = this.route.snapshot.params['id']
  }

  findRoute(routeFragment: string): boolean {
    if (!routeFragment) {
      return false; 
    }
    return this._router.getCurrentUrl().includes(`/${routeFragment}`);
  }
  onRoute() {
    this._router.navigateTo(`masterdata/add-item-definition/${this.id}/general`)
  }
}


