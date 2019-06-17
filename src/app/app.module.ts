import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CarserviceMgmtModule } from './carservice-mgmt/carservice-mgmt.module';
import { AuthPipePipe } from './auth-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CarserviceMgmtModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
