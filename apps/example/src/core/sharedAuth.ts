import { initializeAuthPackage } from '@packages/auth';
import { type ApiType } from './coreTypes';

export function initializeAuth(api: ApiType) {
    return initializeAuthPackage(api);
}