import { NgModule, ErrorHandler, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookTrackerErrorHandlerService } from './book-tracker-error-handler.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataService } from './data.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    //LoggerService,   --uses "providedIn: 'root' "
    DataService,
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService }
  ]
})
export class CoreModule {

  //To guard against a lazy-loaded module re-importing CoreModule
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule is already loaded. Import it in the AppModule only');
  }

}
