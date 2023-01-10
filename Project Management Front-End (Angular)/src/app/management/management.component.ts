import { ChangeDetectorRef, Component, OnInit,OnDestroy, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list'; 
import { CommonModule } from '@angular/common';
import { SharedService } from '../lib/shared.service';
import { AccountService } from '../lib/account.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
@Component({
  standalone:true,
  selector: 'app-management',
  imports:[
    RouterModule,
    IonicModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers:[AccountService],
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit,OnDestroy,AfterViewInit {
  sideMode:any="side";
  showRegister = false;
  hidden = true;
  contentMargin:any = "margin-left:12vw";
  sideNavWidth:any ="width:12vw";
  iconSize="font-size: 1.7vw;"
  navContainerWidth:any= 0;
  showLoading = false;
  account:any={
    photo:null
  };
  formData:FormGroup;
  loggedIn = false;
  loginData:FormGroup;
  registerForm: {
    photo:null
  }
  profilePicture = null;
  first_name ="";
  last_name = "";
  @ViewChild('nav') sideNav !: MatSidenav; 

  constructor(
    private route:Router, 
    private activatedRoute:ActivatedRoute,
    private cdr:ChangeDetectorRef, 
    private _sharedService:SharedService,
    private accountService:AccountService,
    private formBuilder: FormBuilder,
    private formBuilder2: FormBuilder,
    private _snackBar: MatSnackBar
    ) {
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth <= 992){
      this.sideMode = "over"
      this.hidden = false;
      this.sideNav.opened = false
      this.contentMargin = "margin-left:0";
      this.sideNavWidth ="width:35vw"
    }else {
      this.hidden = true;
      this.sideMode = "side"
      this.sideNav.opened = true
      this.sideNavWidth = "width:12vw"
      this.contentMargin = "margin-left:12vw";
    }
    this.navContainerWidth = this.sideNav._container?._content.getElementRef().nativeElement.offsetLeft;
    this.cdr.detectChanges();
  }
  async ngOnInit() {
    this.formData = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ])),
      password:new FormControl(null, Validators.required),
      first_name:new FormControl(null, Validators.required),
      last_name:new FormControl(null, Validators.required),
      photo:new FormControl(null),
    });
    this.loginData = this.formBuilder2.group({
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ])),
      password:new FormControl(null, Validators.required),
    })
  }
  ngAfterViewInit(): void {
    if(this.loggedIn){
      this.route.navigate(['dashboard'],{relativeTo:this.activatedRoute,skipLocationChange:true})
      if (window.innerWidth <= 992){
        this.sideMode = "over"
        this.hidden = false;
        this.sideNav.opened = false
        this.contentMargin = "margin-left:0";
      }else {
        this.sideMode = "side"
        this.hidden = true;
        this.sideNav.opened = true
        this.sideNavWidth = "width:12vw"
      }
      this.navContainerWidth = this.sideNav._container?._content.getElementRef().nativeElement.offsetLeft;
      this.cdr.detectChanges();
    }
  }
  ngOnDestroy(): void {

  }
  async registerAccount(){
    let registration = this.formData.getRawValue();
    this.showLoading = true;
    await this.accountService.createAccount(registration).then((result:any)=>{
      if(result.result == "Account Exists"){
        this._snackBar.open("Email Already Exists", 'OK', {
          duration: 3000
        });
        this.formData.controls['email'].setValue(null);
      }else{
        this.formData = this.formBuilder.group({
          email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
          ])),
          password:new FormControl(null, Validators.required),
          first_name:new FormControl(null, Validators.required),
          last_name:new FormControl(null, Validators.required),
          photo:new FormControl(null),
        });
        this.formData.controls['email'].setValue(null)
        this.formData.controls['password'].setValue(null)
        this.formData.controls['first_name'].setValue(null)
        this.formData.controls['last_name'].setValue(null)
        this.showLoginForm();
      }
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    this.showLoading = false;
  }
  async logIn(nav:MatSidenav){
    let loginAccount = this.loginData.getRawValue();
    this.showLoading = true;
    await this.accountService.login(loginAccount).then((result:any)=>{
      if(result.result == "Email/Password does not match..."){
        this._snackBar.open("Email/Password does not match...", 'OK', {
          duration: 3000
        })
      }else if(result.result == "No Account Found"){
        this._snackBar.open("Email/Password does not match...", 'OK', {
          duration: 3000
        })
      }else{
        this.loginData.controls['email'].setValue(null)
        this.loginData.controls['password'].setValue(null)
        this.account = result[0];
        this._sharedService.setAccountID(result[0].account_id);
        this.profilePicture = this.account.photo;
        this.first_name = this.account.first_name;
        this.last_name = this.account.last_name
        this.loggedIn = true;
        this.sideNav = nav;
        this.ngAfterViewInit();
      }
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    this.showLoading = false;
  }
  async showRegisterForm(){
    this.showRegister = true;
  }
  async showLoginForm(){
    this.showRegister = false;
  }
  async logOut(){
    this.route.navigate(['../manage'],{relativeTo:this.activatedRoute,skipLocationChange:true})
    this.account={
      photo:null
    };
    this.loginData.controls['email'].setValue(null)
    this.loginData.controls['password'].setValue(null)
    this._sharedService.setAccountID(null);
    this.profilePicture = null;
    this.loggedIn = false;
    this.showRegister = false;
  }
  openFile(button:HTMLInputElement){
    button.click()
  }
  handle(e){
    console.log('Change input file')
  }
  private readBase64(file): Promise<any> {
    const reader = new FileReader();
    const future = new Promise((resolve, reject) => {
      reader.addEventListener('load', function () {
        resolve(reader.result);
      }, false);
      reader.addEventListener('error', function (event) {
        reject(event);
      }, false);
    
      reader.readAsDataURL(file);
    });
    return future;
    
  }
  async changeListener($event) {
    let file = $event.target.files[0];
    await this.readBase64(file)
    .then((data) => {
        this.account.photo = data
        let account_photo = {
          photo:data
        }
        this.accountService.updateProfilePic(this.account.account_id,account_photo)
        this.profilePicture = data
    });
  }
}
