import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from 'app/services/translation.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translator:TranslationService){}

  transform(value: string, defaultValue: string): any {
    return this.translator.translate(value, defaultValue);
  }

}
