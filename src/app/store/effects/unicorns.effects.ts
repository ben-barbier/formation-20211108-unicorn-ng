import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { NotificationService } from '../../shared/services/notification.service';
import { UnicornsService } from '../../shared/services/unicorns.service';
import * as UnicornsActions from '../actions/unicorns.actions';

@Injectable()
export class UnicornsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly unicornsService: UnicornsService,
    private readonly _notificationService: NotificationService
  ) {}

  getUnicorns$ = createEffect(() =>
    this.actions$.pipe(
      // 100% des actions qui passent là
      ofType(UnicornsActions.getUnicorns),
      // Uniquement les action de type "getUnicorns"
      switchMap(() =>
        this.unicornsService.getAll().pipe(
          map((unicorns) => UnicornsActions.getUnicornsSuccess({ unicorns })),
          catchError(() => of(UnicornsActions.getUnicornsError()))
        )
      )
    )
  );

  getUnicorn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnicornsActions.getUnicorn),
      switchMap((action) =>
        this.unicornsService.get(action.id).pipe(
          map((unicorn) => UnicornsActions.getUnicornSuccess({ unicorn })),
          catchError(() => of(UnicornsActions.getUnicornError()))
        )
      )
    )
  );

  updateUnicorn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnicornsActions.updateUnicorn),
      concatMap((action) =>
        this.unicornsService.update(action.unicorn).pipe(
          map((unicorn) => UnicornsActions.updateUnicornSuccess({ unicorn })),
          catchError(() => of(UnicornsActions.updateUnicornError()))
        )
      )
    )
  );

  deleteUnicorn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnicornsActions.deleteUnicorn),
      concatMap(({ unicorn }) =>
        this.unicornsService.delete(unicorn).pipe(
          map(() => UnicornsActions.deleteUnicornSuccess()),
          catchError(() => {
            this._notificationService.onError(`Une erreur est survenue lors de la suppression de ${unicorn.name}`);
            return of(UnicornsActions.deleteUnicornError({ unicorn }));
          })
        )
      )
    )
  );
}
