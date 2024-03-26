import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { ActionRowComponent } from './action-row/action-row.component';
import { SearchBarComponent, SearchQueryEvent } from './search-bar/search-bar.component';
import { MapComponent } from './map/map.component';
import { SnackService } from '../core/service/snack.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ActionRowComponent, MapComponent, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  @ViewChild(MapComponent) mapComponent!: MapComponent;
  @ViewChild(SearchBarComponent) searchBarComponent!: SearchBarComponent;

  private mapSubscription!: Subscription;

  constructor(private readonly snackService: SnackService) {}

  ngAfterViewInit(): void {
    if (this.mapComponent) {
      this.mapSubscription = this.mapComponent.filteredShopCountChange.subscribe((count: number) => {
        this.displaySearchResultMessage(count);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.mapSubscription) {
      this.mapSubscription.unsubscribe();
    }
  }

  private displaySearchResultMessage(numberOfShopsFound: number): void {
    // Display a message with the count of discovered shops
    this.snackService.showMessage(`Your search resulted in ${numberOfShopsFound} shops found. Please zoom out to see the shop markers.`);
  }

  passSearchQueryToMap(event: SearchQueryEvent): void {
    this.mapComponent.filterShops(event.query, event.searchType);
  }

  handleSearchTypeToggled(): void {
    this.mapComponent.resetAndShowAllShops();
  }
}
