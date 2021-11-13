import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Unicorn } from '../../shared/models/unicorn.model';
import { EntityState } from '../reducers';

// selectors
export const getUnicorns = createFeatureSelector<Unicorn[]>('unicorns');
const getSortedUnicorns = createSelector(getUnicorns, (state) => [...state].sort((a, b) => a.id - b.id));
const getUnicorn = (id: number) => createSelector(getUnicorns, (state: Unicorn[]) => state.find((u) => u.id === id));
const getOldest = createSelector(getUnicorns, (unicorns: Unicorn[]) =>
  unicorns.reduce((acc: Unicorn | null, unicorn: Unicorn) => {
    if (!acc) {
      return unicorn;
    }
    return acc.birthyear > unicorn.birthyear ? unicorn : acc;
  }, null)
);
const getAverageAge = createSelector(getUnicorns, (unicorns) => {
  const ages = unicorns.map((unicorn) => new Date().getFullYear() - unicorn.birthyear);
  const agesSum = ages.reduce((acc, age) => acc + age, 0);
  return agesSum / unicorns.length;
});

@Injectable({ providedIn: 'root' })
export class UnicornsSelectors {
  constructor(private store: Store<EntityState>) {}

  public unicorns$ = this.store.select(getUnicorns);
  public sortedUnicorns$ = this.store.select(getSortedUnicorns);
  public unicorn$ = (id: number) => this.store.select(getUnicorn(id));
  public oldest$ = this.store.select(getOldest);
  public averageAge$ = this.store.select(getAverageAge);
}
