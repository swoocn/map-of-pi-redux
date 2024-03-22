import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiStateService } from './core/service/ui-state.service';
import { PaymentsService } from './core/service/payments.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly logger: NGXLogger,
    private readonly uiStateService: UiStateService,
    private readonly paymentServices: PaymentsService,
  ) {
    this.uiStateService.setShowBackButton(false);
    this.logger.log('### AppComponent created ###');
  }

  ngOnInit() {
    this.paymentServices.signInUser();
  }
}
