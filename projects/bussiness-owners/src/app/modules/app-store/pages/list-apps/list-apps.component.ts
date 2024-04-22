import { Component, OnInit } from '@angular/core';
import { AppStoreService } from '../../app-store.service';
import { AppDto } from '../../models/appDto';
import { BaseDto, RouterService, SubdomainService } from 'shared-lib';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-list-apps',
  templateUrl: './list-apps.component.html',
  styleUrl: './list-apps.component.scss'
})
export class ListAppsComponent implements OnInit {
  apps: AppDto[];
  appInStore:number
  subdomains: BaseDto[];
  cardList:boolean=false;
  AllModules:any[]

  constructor(private appStoreService: AppStoreService,
    private router: RouterService,
    private dialog: DialogService,
    private subdomainService: SubdomainService) {
  }

  ngOnInit(): void {
    this.AllModules=[
      {
        id:"1",
        name:"All"
      },
      {
        id:"1",
        name:"HR"
      },
      {
        id:"1",
        name:"Stores"
      },
      {
        id:"1",
        name:"Accounts"
      },
    ]
    this.appStoreService.loadApps();
    this.appStoreService.apps.subscribe(apps => {
      this.apps = apps;
      this.appInStore=apps.length
    });
    this.subdomainService.getAllSubdomains().subscribe(s => this.subdomains = s);
  }

  addToCart(appId: number) {
    this.appStoreService.addToCart(appId, this.dialog, this.subdomains);
  }

  getAppDeps(app: AppDto) {
    return app.dependencies.map(d => d.name).join(" - ");
  }
  card(){
    this.cardList=true
  }
  row(){
    this.cardList=false

  }
  routeToDetails(id:any){
    console.log(id);
    this.router.navigateTo('/app-store/app-detail/'+id);
  }
}
