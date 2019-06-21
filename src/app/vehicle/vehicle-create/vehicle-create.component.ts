import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.css']
})
export class VehicleCreateComponent implements OnInit {
  @ViewChild('createForm') createForm: FormGroup;
  baseUrl = 'http://localhost:5000/api/vehicles/';
  data: any = {};
  vehicletypes: any;
  vehiclemakes: any;
  vehiclemodels: any;
  vehiclebodytypes: any;

  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any) {
  //   if (this.createForm.dirty) {
  //     $event.returnValue = true;
  //   }
  // }
  constructor(private http: HttpClient, private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initCreateForm();
    this.getVehicleTypes();
  }

  initCreateForm() {
    this.createForm = this.fb.group({
      vehicletypeid: ['Select Vehicle Type', Validators.required],
      make: ['Select Vehicle Make', Validators.required],
      model: ['Select Vehicle Model', Validators.required],
      bodytype: ['Select Vehicle Body Type', Validators.required],
      engine: ['', [Validators.required, Validators.maxLength(20)]],
      doors: ['', [Validators.required, Validators.max(10), Validators.min(2)]],
      wheels: ['', [Validators.required, Validators.max(18), Validators.min(4)]]
    }, { validator: [ this.dropdownTypeValidator, this.dropdownMakeValidator,
              this.dropdownModelValidator, this.dropdownBodyTypeValidator] });
  }

  addvehicle() {
    console.log(this.createForm.value);
    return this.http.post(this.baseUrl + 'addvehicle', this.createForm.value).subscribe(() => {
      this.alertify.success('Car successfully added');
    }, error => {
      this.alertify.error('Create Car Failed');
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
    if (event !== 'Select Vehicle Type') {
      this.http.get(this.baseUrl + 'vehiclemakes/' + event).subscribe(response => {
        this.vehiclemakes = response;
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  getVehicleModels(event: any) {
    console.log(event);
    if (event !== 'Select Vehicle Make') {
      this.http.get(this.baseUrl + 'vehiclemodels/' + event).subscribe(response => {
        this.vehiclemodels = response;
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  getVehicleBodyTypes(event: any) {
    if (event !== 'Select Vehicle Model') {
      this.http.get(this.baseUrl + 'vehiclebodytypes/' + event).subscribe(response => {
        this.vehiclebodytypes = response;
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  dropdownTypeValidator(g: FormGroup) {
    return g.get('vehicletypeid').value !== 'Select Vehicle Type' ? null : {'invalid' : true};
  }

  dropdownMakeValidator(g: FormGroup) {
    return g.get('make').value !== 'Select Vehicle Make' ? null : {'invalid' : true};
  }

  dropdownModelValidator(g: FormGroup) {
    return g.get('model').value !== 'Select Vehicle Model' ? null : {'invalid' : true};
  }

  dropdownBodyTypeValidator(g: FormGroup) {
    return g.get('bodytype').value !== 'Select Vehicle Body Type' ? null : {'invalid' : true};
  }
}
