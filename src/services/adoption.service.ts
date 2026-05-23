import { apiRequest } from './api.client';
import type { AdoptionFormData } from '../types';

export const adoptionService = {
  async submit(petId: string, form: AdoptionFormData): Promise<{ requestId: string }> {
    const res = await apiRequest(
      () => ({
        requestId: `REQ-${petId}-${Date.now()}`,
        ...form,
      }),
      { delayMs: 1200, message: 'Solicitação enviada com sucesso!' },
    );
    return { requestId: res.data.requestId };
  },
};
