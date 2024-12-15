import { uploadFeature } from './upload.reducer';

export const {
  selectUploadedImageUrl,
  selectIsUploading,
  selectError: selectUploadError,
} = uploadFeature;
