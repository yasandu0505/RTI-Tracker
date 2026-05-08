import { Receiver } from '../types/db';
import { config } from '../config';

const BASE_URL = config.RTI_TRACKER_SERVER_URL;

export const receiversService = {
  listReceivers: async (page: number = 1, pageSize: number = 10, search?: string, httpClient?: any): Promise<{
    data: Receiver[],
    pagination: {
      page: number,
      pageSize: number,
      totalItems: number,
      totalPages: number
    }
  }> => {
    const response = await httpClient.request({
      url: `${BASE_URL}/api/v1/receivers`,
      params: { page, pageSize, query: search },
      method: 'GET',
    });
    return response.data;
  },

  async createReceiver(payload: Partial<Receiver>, httpClient?: any) {
    const response = await httpClient.request({
      url: `${BASE_URL}/api/v1/receivers`,
      method: 'POST',
      data: payload,
    });
    return response.data;
  },

  async updateReceiver(id: string, payload: Partial<Receiver>, httpClient?: any) {
    const response = await httpClient.request({
      url: `${BASE_URL}/api/v1/receivers/${id}`,
      method: 'PUT',
      data: payload,
    });
    return response.data;
  },

  async removeReceiver(id: string, httpClient?: any) {
    await httpClient.request({
      url: `${BASE_URL}/api/v1/receivers/${id}`,
      method: 'DELETE'
    });
  }
};