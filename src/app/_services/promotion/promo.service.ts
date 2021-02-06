import { Injectable } from '@angular/core';
import {GeneralService} from '../general/general.service';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  private API_URL = environment.apiUrl;
  constructor(private http: HttpClient,private genService: GeneralService) { }
  addPromotion(promo: FormData){
    return this.http.post(`${this.API_URL}/admin/promotions`, promo)
      .pipe(
        map(
          reponse => {
            return reponse
          }
        )
      );
  }
}
