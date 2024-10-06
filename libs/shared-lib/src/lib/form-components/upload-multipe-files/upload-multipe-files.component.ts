  import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { AttachmentsService } from '../../services/attachment.service';
  import { AttachmentDto, AttachmentFileTypeEnum, Pages } from '../../models';
  import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
  import { DynamicDialogRef } from 'primeng/dynamicdialog';
  import { JournalEntryService } from 'projects/apps-accounting/src/app/modules/journal-entry/journal-entry.service';
  import { EnvironmentService, HttpService } from 'shared-lib';
  import { Router } from '@angular/router';
  import { FormBuilder } from '@angular/forms';
  import { Subscription, window } from 'rxjs';

  @Component({
    selector: 'lib-upload-multipe-files',

    templateUrl: './upload-multipe-files.component.html',
    styleUrl: './upload-multipe-files.component.css',
  })
  export class UploadMultipeFilesComponent implements OnInit {
    constructor(public attachmentService: AttachmentsService,
      private cdRef: ChangeDetectorRef,
      private journalEntryService: JournalEntryService,
      private httpService: HttpService,
      private enviormentService: EnvironmentService,
      private router: Router,
      private ref: DynamicDialogRef,
      private fb: FormBuilder
    ) {

    }
    attachmentUrl: SafeResourceUrl = '';

    urls: any = [];
    files: any = [];
    filesName: string[] = [];
    fileExtension: string[] = [];
    arr: any[] = [];
    @Input() filesData: any;
    @Input() viewData: any;
    @Input() screen: any;

    @Input() imgExtentions = ['image/png', 'image/png', 'application/pdf'];
    @Output() sendFiles = new EventEmitter();
    editStates: boolean[] = [];
    fileUrl: any; // URL for the iframe
    showIframe: boolean = false; // Flag to show/hide the iframe

    showText: boolean = true;
    ngOnInit(): void {

      this.subscrip()
       this.fileExtension = this.attachmentService.fileExtension;
       this.filesName = this.attachmentService.filesName;
       this.files = this.attachmentService.files;
      this.attachmentService.filesInfo.push(this.attachmentService.filesUrls);
    }

    onSelectFile(event: any) {
      let file = event.target.files;
      if (event.target.files && event.target.files[0]) {
        const filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          const reader = new FileReader();

          reader.onload = ((fileItem) => {
            return (event: any) => {
              console.log(fileItem.name ,"fileItem.name");
              
              this.files.push(fileItem);
              this.filesName.push(fileItem.name);
              this.fileExtension.push(fileItem.name.split('.').pop());
              console.log(this.filesName ,"this.filesNamethis.filesName");
              console.log(this.fileExtension ,"fileExtensionfileExtension");

              let fileInfo: AttachmentDto = {
                fileContent: event.target.result as string,
                fileName: fileItem.name,
              };
              this.attachmentService.filesInfo.push(fileInfo);
              this.attachmentService.uploadValidatedFile(fileInfo);
          
        //   return attachment 

        // });
        
        // this.test()
      

              this.editStates.push(false); // Initialize edit state for new file

              this.cdRef.detectChanges();
            };
          })(file[i]);

          reader.readAsDataURL(file[i]);
        }
      }
    }

    subscrip(){
      
      console.log(this.filesName ,"this.filesName");
      
      this.attachmentService.attachmentIdsObservable.subscribe((res:any)=>{
       this.setUrls()
      })
      

    }
    setUrls(){
      this.urls=[]
      this.attachmentService.attachemntIdsList.forEach((url: any, index: number) => {
        // تحقق مما إذا كان العنصر موجودًا مسبقًا في المصفوفة
        const existingItem = this.urls.find((item: any) => item.attachmentId === url);
      
        if (!existingItem) {
          // أضف العنصر الجديد إذا لم يكن موجودًا بالفعل
          console.log(url ,"44444444444");
          
          this.urls.push({
            id: 0,
            attachmentId: url,
            name: this.filesName[index] || (url.name ? url.name : `Unknown-${index}`)
          });
        }
      });
      this.processAttachments();     

      console.log(this.urls , "urlsurlsurlsurlsurls");
    }
    processAttachments(){
      this.arr =[]; // Resetting the array    
      
      
      // this.attachmentService.attachemntIdsList = this.urls
      this.arr = [...this.urls]; // Create a shallow copy of `urls`

      this.sendFiles.emit(this.arr);

    }
    onTableDataChange() {
      this.processAttachments();
  }



    onDragDrop(event: DragEvent) {
      event.preventDefault();
      event.stopPropagation();
      const files = event.dataTransfer?.files;
      if (files) {
        const filesAmount = files.length;
        for (let i = 0; i < filesAmount; i++) {
          const reader = new FileReader();

          reader.onload = (event: any) => {
            // this.urls.push(event.target.result);
            this.files.push(files[i]);
            this.filesName.push(files[i].name); 
            this.fileExtension.push(files[i].name.includes('.') ? files[i].name.split('.').pop() || '' : '');
            // this.sendFiles.emit({
            //   name:this.filesName,
            //   attachmentId: this.urls
            // })

            this.editStates.push(false); // Initialize edit state for new file
          };

          reader.readAsDataURL(files[i]);
        }
      }
    }

    preventDefault(event: Event) {
      event.preventDefault();
      event.stopPropagation();
    }

    removeFile(test: any, url: any, index: number) {

      if (this.filesData && this.filesData.length > 0) {
        // تحقق إذا كان الملف موجودًا في الملفات المحملة مسبقًا
        const existingFile = this.filesData.find((file: any) => file.attachmentId === url || file.name === test);

        if (existingFile) {
          if (this.screen == Pages.JournalEntry) {
            this.journalEntryService.deleteAttachment(existingFile.id).then(() => {
              this.journalEntryService.attachmentDeletedObser.subscribe((res: boolean) => {
                if (res) {
                  this.urls.splice(index, 1);
                  this.files.splice(index, 1);
                  this.filesName.splice(index, 1);
                  this.fileExtension.splice(index, 1);
                  this.editStates.splice(index, 1);

                  // Optionally, log the updated arrays to check if they're correctly updated

                  // Detect changes to update the view
                  this.cdRef.detectChanges();
                }
              });
            });

          }

        } else {
          this.urls.splice(index, 1);
          this.files.splice(index, 1);
          this.filesName.splice(index, 1);
          this.fileExtension.splice(index, 1);
          this.editStates.splice(index, 1);

          // Optionally, log the updated arrays to check if they're correctly updated

          // Detect changes to update the view
          this.cdRef.detectChanges();
        }
      } else {
        this.urls.splice(index, 1);
        this.files.splice(index, 1);
        this.filesName.splice(index, 1);
        this.fileExtension.splice(index, 1);
        this.editStates.splice(index, 1);

        this.cdRef.detectChanges();
      }


    }


    toggleEditState(index: number) {
      this.editStates[index] = !this.editStates[index];
    }
    downloadFile(url: string, fileName: string) {
      this.attachmentService.downloadAttachment(url, fileName, AttachmentFileTypeEnum.image);
    }



    reviewAttachment(fileName: any, url: string): void {
    // const x = url?.attachmentId
      console.log(url , "000000000000000");
      
      this.httpService.getFullUrl(
        `${this.enviormentService.AttachmentServiceConfig.AttachmentServiceUrl}/api/Attachment/DownloadBase64Attachment/` + url )
      .subscribe((apiResponse: any) => {
        if (apiResponse) {
          let base64Content = apiResponse.fileContent;
          const mimeType = apiResponse.base64Padding.split(';')[0].split(':')[1];

          base64Content = base64Content.replace(/[^A-Za-z0-9+/=]/g, '');
          while (base64Content.length % 4 !== 0) {
            base64Content += '=';
          }

          try {
            const byteCharacters = atob(base64Content);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: mimeType });
            const unsafeUrl = URL.createObjectURL(blob);
            this.router.navigate(['/attachment-view'], { queryParams: { url: unsafeUrl } });
            this.ref.close(this.arr)

          } catch (error) {
            console.error('Error decoding Base64 string:', error);
          }
        }
      });
      // if (this.filesData && this.filesData.length > 0) {
      //   const existingFile = this.filesData.find(
      //     (file: any) => file.attachmentId === url || file.name === fileName
      //   );

      //   if (!existingFile) {
      //     this.router.navigate(['/attachment-view'], { queryParams: { url: url } });
      //     this.ref.close(this.arr);
      //     return
      //   }

      //   this.httpService
      //     .getFullUrl(
      //       `${this.enviormentService.AttachmentServiceConfig.AttachmentServiceUrl}/api/Attachment/DownloadBase64Attachment/` +
      //       existingFile.attachmentId
      //     )
      //     .subscribe((apiResponse: any) => {
      //       if (apiResponse) {
      //         let base64Content = apiResponse.fileContent;
      //         const mimeType = apiResponse.base64Padding.split(';')[0].split(':')[1];

      //         base64Content = base64Content.replace(/[^A-Za-z0-9+/=]/g, '');
      //         while (base64Content.length % 4 !== 0) {
      //           base64Content += '=';
      //         }

      //         try {
      //           const byteCharacters = atob(base64Content);
      //           const byteNumbers = new Array(byteCharacters.length);
      //           for (let i = 0; i < byteCharacters.length; i++) {
      //             byteNumbers[i] = byteCharacters.charCodeAt(i);
      //           }

      //           const byteArray = new Uint8Array(byteNumbers);
      //           const blob = new Blob([byteArray], { type: mimeType });
      //           const unsafeUrl = URL.createObjectURL(blob);
      //           this.router.navigate(['/attachment-view'], { queryParams: { url: unsafeUrl } });
      //           this.ref.close(this.arr)

      //         } catch (error) {
      //           console.error('Error decoding Base64 string:', error);
      //         }
      //       }
      //     });
      // }else{
        
      // }
    }


    // وظيفة لعرض الملف مباشرة من Base64
    private showFile(base64Content: string, base64Padding: string) {
      const mimeType = base64Padding.split(';')[0].split(':')[1];

      // تأكد من صحة بيانات Base64
      base64Content = base64Content.replace(/[^A-Za-z0-9+/=]/g, '');
      while (base64Content.length % 4 !== 0) {
        base64Content += '=';
      }

      try {
        const byteCharacters = atob(base64Content);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mimeType });
        const unsafeUrl = URL.createObjectURL(blob);

        // توجيه إلى مكون العرض مع الرابط
        this.router.navigate(['/attachment-view'], { queryParams: { url: unsafeUrl } });
        this.ref.close(this.arr);
      } catch (error) {
        console.error('Error decoding Base64 string:', error);
      }
    }

    // وظيفة لعرض الملف من الرابط مباشرة
    private showFileFromUrl(url: string) {
      // توجيه إلى مكون العرض مع الرابط
      this.router.navigate(['/attachment-view'], { queryParams: { url: url } });
      this.ref.close(this.arr);
    }


    // Helper function to handle downloading from base64 content
    private handleFileDownload(base64Content: string, base64Padding: string) {
      const mimeType = base64Padding.split(';')[0].split(':')[1];

      // Ensure valid base64 data
      base64Content = base64Content.replace(/[^A-Za-z0-9+/=]/g, '');
      while (base64Content.length % 4 !== 0) {
        base64Content += '=';
      }

      try {
        const byteCharacters = atob(base64Content);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mimeType });
        const unsafeUrl = URL.createObjectURL(blob);

        // Navigate to the attachment view component
        this.router.navigate(['/attachment-view'], { queryParams: { url: unsafeUrl } });
        this.ref.close(this.arr);
      } catch (error) {
        console.error('Error decoding Base64 string:', error);
      }
    }




    updateFileName(index: number, newName: string) {
    
        this.filesName[index] = newName.trim();
        this.attachmentService.filesName =[...this.filesName];
      this.urls[index].name=newName
        // this.setUrls()

      // this.onTableDataChange()
    }

    getFileType(fileName: string): string {
      const extension = fileName.split('.').pop()?.toLowerCase(); // Use optional chaining here
      return '.' + extension!
    }
    
  }
