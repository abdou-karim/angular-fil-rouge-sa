import { Injectable } from '@angular/core';
import {GeneralService} from '../general/general.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private API_URL = environment.apiUrl;
  constructor(private geneService: GeneralService ) { }
  // tslint:disable-next-line:typedef
  getAllTag(){
    return this.geneService.getAll(`${this.API_URL}/admin/tags`);
  }
}
