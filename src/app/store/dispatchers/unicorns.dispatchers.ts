import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Unicorn } from '../../shared/models/unicorn.model';
import { deleteUnicorn, getUnicorn, getUnicorns, updateUnicorn } from '../actions/unicorns.actions';
import { EntityState } from '../reducers';

@Injectable({ providedIn: 'root' })
export class UnicornsDispatchers {
  constructor(private store: Store<EntityState>) {}

  public getUnicorns(): void {
    this.store.dispatch(getUnicorns());
  }

  public getUnicorn(id: number): void {
    this.store.dispatch(getUnicorn({ id }));
  }

  public deleteUnicorn(unicorn: Unicorn): void {
    this.store.dispatch(deleteUnicorn({ unicorn }));
  }

  public updateUnicorn(unicorn: Unicorn): void {
    this.store.dispatch(updateUnicorn({ unicorn }));
  }
}
