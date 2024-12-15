import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productFeature } from './product.selectors';
import { ProductEffects } from './product.effects';

export const productStoreProviders = [
  provideState(productFeature),
  provideEffects(ProductEffects),
];
