import { createActionGroup, props } from '@ngrx/store';

export const UploadActions = createActionGroup({
  source: 'Upload',
  events: {
    'Upload Image': props<{ file: File }>(),
    'Upload Image Success': props<{ url: string }>(),
    'Upload Image Failure': props<{ error: any }>(),
  },
});
