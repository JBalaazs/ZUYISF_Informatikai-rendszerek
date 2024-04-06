import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DriverService } from './drivers/drivers.service';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, BrowserModule],
  providers: [DriverService],
  bootstrap: [],
})
export class AppModule {}
