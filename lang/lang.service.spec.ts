import { async, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { LangService } from './lang.service';

describe('LangService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LangService],
      imports: [HttpModule]
    });
  });

  it('should ...', inject([LangService], (service: LangService) => {
    expect(service).toBeTruthy();
  }));

  it('should return async locales',
    async(inject([LangService], (service: LangService) => {
    service.getLocales().then(locales => {
      expect(locales.length).toBe(3);
      const en = locales.find(l => l.name === 'en');
      expect((en.text as string).toLowerCase()).toEqual('english');
      expect((en.ico as string).toLowerCase()).toContain('enflag');
    });
  })));

  it('should return async lang',
    async(inject([LangService], (service: LangService) => {
    service.getMap('en').then(lang => {
      expect(lang.menuFile).toEqual('File');
      expect(lang['menuFile']).toEqual('File');
    });
  })));
});
