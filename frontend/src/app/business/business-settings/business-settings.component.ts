import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';

import { NGXLogger } from 'ngx-logger';

import { SnackService } from '../../core/service/snack.service';
import { ShopService } from '../../core/service/shop.service';

@Component({
  selector: 'app-business-settings',
  standalone: true,
  templateUrl: './business-settings.component.html',
  styleUrls: ['./business-settings.component.scss'],
  imports: [TranslateModule, CommonModule, ReactiveFormsModule, MatSlideToggleModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessSettingsComponent {
  router: Router = inject(Router);
  showPopup: boolean = false;
  selectedImages: any[] = [];
  email: string = 'i@gmail.com'

  registerShopForm = new FormGroup({
    shopName: new FormControl('', Validators.required),
    shopType: new FormControl('General', Validators.required),
    shopAddress: new FormControl('', Validators.required),
    shopPhone: new FormControl('0000000000'),
    // shopPhone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    shopEmail: new FormControl('', [Validators.required, Validators.email]),
    shopImage: new FormArray([]),
    shopDescription: new FormControl('', Validators.required),
  });

  constructor(private snackService: SnackService, private shopServices: ShopService, private logger: NGXLogger) {}

  onFileChange(event: any) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (e: any) => {
        this.selectedImages.push(e.target.result);
        const shopImageFormArray = this.registerShopForm.get('shopImage') as FormArray;
        if (shopImageFormArray.controls.length < 1) {
          shopImageFormArray.push(new FormControl(e.target.result));
        }
      };
    }
  }

  // onFileChange(event: any) {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);

  //     reader.onload = (e: any) => {
  //       const imageData = e.target.result;
  //       this.selectedImages = [imageData]; // Store only the first image
  //       const shopImageFormArray = this.registerShopForm.get('shopImage') as FormArray;
  //       if (shopImageFormArray.length === 0) {
  //         shopImageFormArray.push(imageData); // Add only if the array is empty
  //       } else {
  //         shopImageFormArray.at(0).setValue(imageData); // Update only the first element
  //       }
  //     };
  //   }
  // }

  send(): void {
    if (this.registerShopForm.valid) {
      this.shopServices.registerShop(this.registerShopForm.value as any).then((response) => {
        if (response.success) {
          this.snackService.showMessage('Business successfully registered');
          this.router.navigate(['business-config', response.newShop._id]);
          // this.router.navigate(['manage-business', response.data._id]);
          this.snackService.showMessage(`Redirecting to ${response.data.name} shop`);
        } else {
          this.snackService.showError(`Email address is already registered to a business. Please try a different email address.🙏`);
          this.logger.error(response);
        }
      });
    } else {
      this.registerShopForm.markAllAsTouched();
      this.logger.warn('Invalid data');
    }
  }

  displayPopup(): void {
    this.showPopup = true;
  }

  hidePopup(): void {
    this.showPopup = false;
  }
}
