import { createFeature, createReducer, on } from '@ngrx/store';
import { UploadActions } from './upload.actions';

export interface UploadState {
  uploadedImageUrl: string | null;
  isUploading: boolean;
  error: string | null;
}

const initialState: UploadState = {
  uploadedImageUrl: null,
  isUploading: false,
  error: null,
};

export const uploadFeature = createFeature({
  name: 'upload',
  reducer: createReducer(
    initialState,
    on(UploadActions.uploadImage, (state) => ({
      ...state,
      isUploading: true,
      error: null,
    })),
    on(UploadActions.uploadImageSuccess, (state, { url }) => ({
      ...state,
      uploadedImageUrl: url,
      isUploading: false,
    })),
    on(UploadActions.uploadImageFailure, (state, { error }) => ({
      ...state,
      error,
      isUploading: false,
    }))
  ),
});
