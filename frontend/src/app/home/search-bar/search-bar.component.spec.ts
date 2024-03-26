import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { SearchBarComponent, SearchQueryEvent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let mockLogger: jasmine.SpyObj<NGXLogger>;

  beforeEach(async () => {
    const loggerSpy = jasmine.createSpyObj('NGXLogger', ['debug', 'info', 'warn', 'error']);

    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, NoopAnimationsModule, TranslateModule.forRoot()],
      providers: [{ provide: NGXLogger, useValue: loggerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    mockLogger = TestBed.inject(NGXLogger) as jasmine.SpyObj<NGXLogger>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchQuery event for business search when business search type is toggled', () => {
    spyOn(component.searchQuery, 'emit');

    const searchQuery = 'TEST QUERY';
    component.isBusinessSearchType = true;
    component.searchBarControl.setValue(searchQuery);
    component.submitSearch();

    expect(component.searchQuery.emit).toHaveBeenCalledWith(jasmine.objectContaining({
      query: searchQuery,
      searchType: 'business'
    }));
  });

  it('should emit searchQuery event for product search when product search type is toggled', () => {
    spyOn(component.searchQuery, 'emit');

    const searchQuery = 'TEST QUERY';
    component.isBusinessSearchType = false;
    component.searchBarControl.setValue(searchQuery);
    component.submitSearch();

    expect(component.searchQuery.emit).toHaveBeenCalledWith(jasmine.objectContaining({
      query: searchQuery,
      searchType: 'product'
    }));
  });

  it('should toggle between business and product search types', () => {
    // Initial state is business search type
    expect(component.isBusinessSearchType).toBeTruthy();
    
    component.toggleSearchType();
    expect(component.isBusinessSearchType).toBeFalsy();
    expect(component.searchBarControl.value).toBe('');
  
    component.toggleSearchType();
    expect(component.isBusinessSearchType).toBeTruthy();
    expect(component.searchBarControl.value).toBe('');
  });
});
