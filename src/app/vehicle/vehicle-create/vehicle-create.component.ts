import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.css']
})
export class VehicleCreateComponent implements OnInit {
  @ViewChild('createForm') createForm: NgForm;
  baseUrl = 'http://localhost:5000/api/vehicles/';
  data: any = {};
  vehicletypes: any;
  vehiclemakes: any;
  vehiclemodels: any;
  vehiclebodytypes: any;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.createForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private http: HttpClient, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getVehicleTypes();
  }

  addvehicle() {
    return this.http.post(this.baseUrl + 'addvehicle', this.data).subscribe(() => {
      this.alertify.success('Car successfully added');
    }, error => {
      this.alertify.error(error);
    });
  }

  getVehicleTypes() {
    this.http.get(this.baseUrl + 'vehicletypes').subscribe(response => {
      this.vehicletypes = response;
    }, error => {
      this.alertify.error(error);
    });
  }

  getVehicleMakes(event: any) {
    this.http.get(this.baseUrl + 'vehiclemakes/' + event).subscribe(response => {
      this.vehiclemakes = response;
    }, error => {
      this.alertify.error(error);
    });
  }

  getVehicleModels(event: any) {
    this.http.get(this.baseUrl + 'vehiclemodels/' + event).subscribe(response => {
      this.vehiclemodels = response;
    }, error => {
      this.alertify.error(error);
    });
  }

  getVehicleBodyTypes(event: any) {
    console.log(event);
    this.http.get(this.baseUrl + 'vehiclebodytypes/' + event).subscribe(response => {
      this.vehiclebodytypes = response;
    }, error => {
      this.alertify.error(error);
    });
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
