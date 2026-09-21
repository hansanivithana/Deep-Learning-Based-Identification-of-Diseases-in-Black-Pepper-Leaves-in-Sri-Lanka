import { Component, OnInit } from '@angular/core';
import {UploadService} from "../service/upload.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {

  url = "##pastetheurloftheimage"
  isActive = false;
  predictIsActive = false;
  status = true;
  file !: File ;
  imageUrl : string;
  diseases_name:any
  diseases_no:any
  errorMessage: any;


  constructor(
    private uploadService : UploadService,
    private router: Router,
  ) {
    this.imageUrl = '';
  }

  ngOnInit(): void {
  }

  selectFile(event:any){

    if(event.target.files){
      let reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      this.isActive = true;
      this.status = false;
      reader.onload = (event: any) => {
        this.url = event.target.result
      }
      this.file = event.target.files[0];
    }
  }

  predictDiseases() {
    const formData = new FormData();
    formData.append('image', this.file ,this.file.name);
    this.uploadService.getData(formData).subscribe( (response :any) => {
      this.predictIsActive = true;
      this.diseases_name = response.prediction_result;
      this.errorMessage = '';
      if(this.diseases_name == "Gall Thrips_stage1"){
        this.diseases_no = 1
      }
      else if(this.diseases_name == "Gall Thrips_stage2"){
        this.diseases_no = 2
      }
      else if(this.diseases_name == "Gall Thrips_stage3"){
        this.diseases_no = 3
      }
      else if(this.diseases_name == "Healthy Leaves"){
        this.diseases_no = 4
      }
      else if(this.diseases_name == "Leaf Blight_stage1"){
        this.diseases_no = 5
      }
      else if(this.diseases_name == "Leaf Blight_stage2"){
        this.diseases_no = 6
      }
      else if(this.diseases_name == "Leaf Blight_stage3"){
        this.diseases_no = 7
      }
      else if(this.diseases_name == "Mosaic_stage1"){
        this.diseases_no = 8
      }
      else if(this.diseases_name == "Mosaic_stage2"){
        this.diseases_no = 9
      }
      else if(this.diseases_name == "Mosaic_stage3"){
        this.diseases_no = 10
      }
      else if(this.diseases_name == "Powdery_stage1"){
        this.diseases_no = 11
      }
      else if(this.diseases_name == "Powdery_stage2"){
        this.diseases_no = 12
      }
      else if(this.diseases_name == "Powdery_stage3"){
        this.diseases_no = 13
      }   
      else if(this.diseases_name == "Quick Wilt_stage1"){
        this.diseases_no = 14
      }
      else if(this.diseases_name == "Quick Wilt_stage2"){
        this.diseases_no = 15
      }
      else if(this.diseases_name == "Quick Wilt_stage3"){
        this.diseases_no = 16
      }
      else if(this.diseases_name == "Pollu Disease_stage1"){
        this.diseases_no = 17
      }
      else if(this.diseases_name == "Pollu Disease_stage2"){
        this.diseases_no = 18
      }
      else if(this.diseases_name == "Pollu Disease_stage3"){
        this.diseases_no = 19
      }

      this.imageUrl = response.url;
    }, error => {
      this.predictIsActive = true;
      this.diseases_name = '';
      this.errorMessage = error.error.error;
    });
  }

  diseasesDetails(param: any) {
    this.router.navigate(['/diseases', param])
  }

  cancelImage() {
    this.status = true;
    this.isActive = false;
    this.predictIsActive = false;
  }
}
