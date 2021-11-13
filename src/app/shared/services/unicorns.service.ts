import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { concatAll, map, mergeMap, toArray } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Capacity } from '../models/capacity.model';
import { Unicorn } from '../models/unicorn.model';
import { CapacitiesService } from './capacities.service';

@Injectable({
  providedIn: 'root',
})
export class UnicornsService {
  constructor(private readonly _http: HttpClient, private readonly _capacitiesService: CapacitiesService) {}

  public getAll(): Observable<Unicorn[]> {
    return this._http.get<Unicorn[]>(`${environment.apiUrl}/unicorns`);
  }

  public get(id: number): Observable<Unicorn> {
    return this._http.get<Unicorn>(`${environment.apiUrl}/unicorns/${id}`);
  }

  public update(unicorn: Unicorn): Observable<Unicorn> {
    const res = [1, 2, 3].map((e) => e * 10);

    return this._http.put<Unicorn>(`${environment.apiUrl}/unicorns/${unicorn.id}`, unicorn);
  }

  public delete(unicorn: Unicorn): Observable<void> {
    return this._http.delete<void>(`${environment.apiUrl}/unicorns/${unicorn.id}`);
  }

  public create(unicorn: Unicorn): Observable<Unicorn> {
    return this._http.post<Unicorn>(`${environment.apiUrl}/unicorns`, unicorn);
  }

  /////

  public getAllOrderByAge(): Observable<Unicorn[]> {
    return this.getAll().pipe(map((unicorns: Unicorn[]) => [...unicorns].sort((u1, u2) => u2.birthyear - u1.birthyear)));
  }

  public getAllWithCapacitiesLabels(): Observable<Unicorn[]> {
    return this.getAll().pipe(
      // Unicorn[]
      concatAll(),
      // Unicorn (x1)
      mergeMap((unicorn: Unicorn): Observable<Unicorn> => {
        const capacitiesIds = unicorn.capacities;
        return from(capacitiesIds).pipe(
          // capacityId (number)
          mergeMap((capacityId) => this._capacitiesService.get(capacityId)),
          // Capacity (id + label)
          map((capacity: Capacity): string => capacity.label),
          // label
          toArray(),
          // label[] = ["Strong", "Speed"]
          map((capacitiesLabels: string[]): Unicorn => ({ ...unicorn, capacitiesLabels }))
        );
      }),
      // Unicorn avec ses capacity labels
      toArray()
    );
  }
}
