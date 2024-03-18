import { Component, OnInit } from '@angular/core';
import { customermodel } from '../Model/customermodel';
import { MatTableDataSource } from '@angular/material/table';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import{faPrint} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class customerComponent implements OnInit{

  constructor(private dialog: MatDialog,private api: ApiService) { }
  companydata!: customermodel[];
  icon = faPrint;
  finaldata:any;

  ngOnInit(): void {
    this.LoadCompany();
  }

  displayColums: string[] = ["customerCode", "name", "address", "email", "mobileNo","geoLocation","action"]
   Openpopup(customerCode: any) {
    const _popup = this.dialog.open(PopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        customerCode: customerCode
      }

    })
    _popup.afterClosed().subscribe(r => {
      this.LoadCompany();
    });
  }

  LoadCompany() {
    this.api.Getallcustomer().subscribe(response => {
      this.companydata = response;
      this.finaldata=new MatTableDataSource<customermodel>(this.companydata);
      
    });
  }
  EditCompany(customerCode: any) {
    this.Openpopup(customerCode);
  }
  RemoveCompany(customerCode: any) {
   
    alertify.confirm("Remove Customer", "do you want remove this customer?", () => {
      this.api.Removecustomerbycode(customerCode).subscribe(r => {
        this.LoadCompany();
      });
    }, function () {

    })


  }
  print()
  {
    alert("Printed successfully.");
  }

 

}
