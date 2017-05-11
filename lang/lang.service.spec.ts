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

  it('should inject', inject([LangService], (service: LangService) => {
    expect(service).toBeTruthy();
  }));

  it('should return locales',
    async(inject([LangService], (service: LangService) => {
    service.getLocales().then(locales => {
      const en = locales.find(l => l.name === 'en');
      expect(locales.length).toBe(3);
      expect((en.text as string).toLowerCase()).toEqual('english');
      expect((en.ico as string).toLowerCase()).toContain('enflag');
    });
  })));

  it('should return File',
    async(inject([LangService], (service: LangService) => {
    service.getMap('en').then(lang => {
      expect(service['menuFile']).toEqual('File');
    });
    service.getMap('uk').then(lang => {
      expect(service['menuFile']).toEqual('Файл');
    });
  })));
});
