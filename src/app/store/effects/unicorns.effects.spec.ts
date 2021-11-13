import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jest-marbles';
import { Observable, of, throwError } from 'rxjs';
import { Unicorn } from '../../shared/models/unicorn.model';
import { NotificationService } from '../../shared/services/notification.service';
import { UnicornsService } from '../../shared/services/unicorns.service';
import { getUnicorns, getUnicornsError, getUnicornsSuccess } from '../actions/unicorns.actions';
import { UnicornsEffects } from './unicorns.effects';

describe('UnicornsEffects', () => {
  let effects: UnicornsEffects;
  let actions$: Observable<Action>;
  let unicornsService: UnicornsService;
  let notificationService: NotificationService;
  const initialState = { unicorns: [], cart: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        UnicornsEffects,
        {
          provide: UnicornsService,
          useValue: {
            getAll: jest.fn(),
            get: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: NotificationService,
          useValue: {
            onError: jest.fn(),
          },
        },
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
    });

    unicornsService = TestBed.inject(UnicornsService);
    notificationService = TestBed.inject(NotificationService);
    effects = TestBed.inject(UnicornsEffects);
  });

  describe('getUnicorns$', () => {
    let unicornsServiceGetUnicornsSpy: jest.SpyInstance;

    beforeEach((): void => {
      unicornsServiceGetUnicornsSpy = jest.spyOn(unicornsService, 'getAll').mockImplementation();
    });

    describe('when the API call to get all unicorns works', () => {
      let unicorns: Unicorn[];

      beforeEach((): void => {
        unicorns = [{ id: 1 }, { id: 2 }, { id: 3 }] as Unicorn[];

        unicornsServiceGetUnicornsSpy.mockReturnValue(of(unicorns as Unicorn[]));
      });

      it('should dispatch action "getUnicornsSuccess" with unicorns in payload', () => {
        actions$ = hot('-a--', { a: getUnicorns });

        const expected = hot('-a--', { a: getUnicornsSuccess({ unicorns }) });
        expect(effects.getUnicorns$).toBeObservable(expected);
      });
    });

    describe('when the API call to get all unicorns fails', () => {
      beforeEach((): void => {
        unicornsServiceGetUnicornsSpy.mockReturnValue(throwError(null));
      });

      it('should dispatch action "updateUnicornError"', () => {
        actions$ = hot('-a--', { a: getUnicorns });

        const expected = hot('-a--', { a: getUnicornsError() });
        expect(effects.getUnicorns$).toBeObservable(expected);
      });
    });
  });

  describe('getUnicorn$', () => {
    // TODO ;-)
  });

  describe('updateUnicorn$', () => {
    // TODO ;-)
  });

  describe('deleteUnicorn$', () => {
    // TODO ;-)
  });
});
