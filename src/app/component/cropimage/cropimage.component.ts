import { Component, OnInit,Inject,EventEmitter,Output,Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SignupService } from '../../core/services/http/http.service'

@Component({
  selector: 'app-cropimage',
  templateUrl: './cropimage.component.html',
  styleUrls: ['./cropimage.component.css']
})
export class CropimageComponent implements OnInit {
  public img;
  constructor(private imageService: SignupService,
    public dialogRef: MatDialogRef<CropimageComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}
  ngOnInit() {
  }
 /* First the file is assigned as null */
  public selectedFile
  public croppedImage:any;
  imageCropped(event){
    this.croppedImage=event.file
  }
   /* a method to upload the image by triggering the event */
  onImageUpload() {
    /*assigning the path & files of event to the selected file */
    this.selectedFile = this.croppedImage;
    /*it is used to transmit keyed data */
    const uploadData = new FormData();
    /* 
     * FormData.append():Appends a new value onto an existing key inside a FormData object,
     * or adds the key if it does not already exist.
     */
    uploadData.append('file', this.selectedFile, this.selectedFile.name);
    this.imageService.loadingImage('user/uploadProfileImage', uploadData,  localStorage.getItem('id')).subscribe(response => {
      console.log(response, "success in image upload");
      /* to display the image url */
      console.log("url: ", response['status'].imageUrl)
      /* setting the url */
      this.img = "http://34.213.106.173/" + response['status'].imageUrl;
       localStorage.setItem('imageUrl',response['status'].imageUrl);
        this.dialogRef.close();
      /* if error exists */
    }, error => {
      /* then display the error */
      console.log(error);
    })
  }
}
