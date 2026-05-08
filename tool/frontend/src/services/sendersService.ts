import { config } from '../config';

const BASE_URL = config.RTI_TRACKER_SERVER_URL;

export const sendersService = {
  async listSenders(page: number, pageSize: number, search?: string, httpClient?: any) {
    const response = await httpClient.request({
      url: `${BASE_URL}/api/v1/senders`,
      params: { page, pageSize, query: search },
      method: 'GET',
    });
    return response.data;
  }
};

