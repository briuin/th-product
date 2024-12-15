import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { UploadActions } from './upload.actions';
import { UploadService } from '../services/upload.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UploadEffects {
  constructor(private actions$: Actions, private uploadService: UploadService) {}

  uploadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadActions.uploadImage),
      mergeMap(({ file }) =>
        this.uploadService.uploadImage(file).pipe(
          map((response) => UploadActions.uploadImageSuccess({ url: response.url })),
          catchError((error) =>
            of(UploadActions.uploadImageFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
