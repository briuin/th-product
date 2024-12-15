import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { uploadFeature } from './upload.reducer';
import { UploadEffects } from './upload.effects';

export const uploadProviders = [
  provideState(uploadFeature),
  provideEffects(UploadEffects),
];
