import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';



@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  editdata: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    if (this.data.customerCode != '' && this.data.customerCode != null) {
      this.api.Getcustomerbycode(this.data.customerCode).subscribe(response => {
        this.editdata = response;
        this.customerform.setValue({
          customerCode: this.editdata.customerCode, name: this.editdata.name,
          address: this.editdata.address,email: this.editdata.email,mobileNo: this.editdata.mobileNo,
          geoLocation: this.editdata.geoLocation
        });
      });
    }
    
  }

  customerform = this.builder.group({
    customerCode: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    mobileNo: this.builder.control('', Validators.required),
    geoLocation: this.builder.control('', Validators.required)

  });


  SaveCompany() {
    if (this.customerform.valid) {
      const Editid = this.customerform.getRawValue().customerCode;
      if (Editid != '' && Editid != null) {
        this.api.Updatecustomer(Editid, this.customerform.getRawValue()).subscribe(response => {
          this.closepopup();
          alert("Updated successfully.")
        });
      } else {
        this.api.Createcustomer(this.customerform.value).subscribe(response => {
          this.closepopup();
          alert("saved successfully.")
        });
      }
    }
  }
  closepopup() {
    this.dialog.closeAll();
  }
  

}


