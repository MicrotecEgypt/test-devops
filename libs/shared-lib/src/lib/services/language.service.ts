import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { StorageService } from './localstorage.service';
import { StorageKeys } from '../constants/storagekeys';
import { Cultures } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  get Lang(): string {
    let currentLanguage =
      this.storageService.getItem(StorageKeys.LANG_KEY) === Cultures.English
        ? Cultures.Arabic
        : Cultures.English;
    return currentLanguage;
  }

  getTranslation(key: string): Observable<string> {
    return this.transalteService.get(key);
  }

  transalte(key: string) {
    return this.transalteService.instant(key);
  }

  setDefaultLang(lang: string) {
    const isValidLang = Object.values(Cultures).includes(lang as Cultures);
    const selectedLang = isValidLang ? lang : Cultures.English;
    this.storageService.setItem(StorageKeys.LANG_KEY, selectedLang);
  }

  setLang() {
    let currentLanguage = this.storageService.getItem(StorageKeys.LANG_KEY);
    currentLanguage = currentLanguage || Cultures.English;
    this.transalteService.use(currentLanguage);
  }
  getLang(): string {
    let currentLanguage = this.storageService.getItem(StorageKeys.LANG_KEY);
    return currentLanguage;
  }

  get ar(): boolean {
    let currentLanguage = this.storageService.getItem(StorageKeys.LANG_KEY);
    return currentLanguage === 'ar';
  }

  toggleLanguage(): void {
    let currentLanguage = this.storageService.getItem(StorageKeys.LANG_KEY) === 'en' ? 'ar' : 'en';
    this.storageService.setItem(StorageKeys.LANG_KEY, currentLanguage);
    this.transalteService.use(currentLanguage);
  }
  constructor(private transalteService: TranslateService, private storageService: StorageService) {}
}