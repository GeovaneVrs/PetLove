import { delay } from '../utils/delay';
import type { ApiResponse } from '../types';

/** Cliente HTTP simulado — pronto para trocar por Axios real no futuro */
export async function apiRequest<T>(
  handler: () => T | Promise<T>,
  options?: { delayMs?: number; message?: string },
): Promise<ApiResponse<T>> {
  const wait = options?.delayMs ?? 600;
  await delay(wait);
  const data = await handler();
  return {
    data,
    success: true,
    message: options?.message,
  };
}
