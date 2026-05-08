import { db } from './mockState';
import { RTIStatus } from '../types/db';
import { config } from '../config';

const SLEEP_MS = 500;
const sleep = () => new Promise(resolve => setTimeout(resolve, SLEEP_MS));

const BASE_URL = config.RTI_TRACKER_SERVER_URL;

export const statusService = {
  async list(page: number, pageSize: number, search?: string, httpClient?: any) {
    const response = await httpClient.request({
      url: `${BASE_URL}/api/v1/rti_statuses`,
      params: { page, pageSize, query: search },
      method: 'GET',
    });
    return response.data;
  },

  async create(payload: Partial<RTIStatus>) {
    await sleep();

    const name = payload.name;
    if (!name) throw new Error('Status name is required');
    const exists = db.statuses.some(s => s.name.toLowerCase() === name.toLowerCase());
    if (exists) throw new Error('Status name already exists');

    const id = payload.id || crypto.randomUUID();
    const newStatus: RTIStatus = {
      id,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    db.setStatuses([newStatus, ...db.statuses]);
    return newStatus;
  },

  async update(id: string, payload: Partial<RTIStatus>) {
    await sleep();
    const index = db.statuses.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Status not found');

    const name = payload.name;
    if (name) {
      const exists = db.statuses.some(s => s.name.toLowerCase() === name.toLowerCase() && s.id !== id);
      if (exists) throw new Error('Status name already exists');
    }

    const updatedStatus = {
      ...db.statuses[index],
      ...payload,
      updatedAt: new Date(),
    };

    const newStatuses = [...db.statuses];
    newStatuses[index] = updatedStatus;
    db.setStatuses(newStatuses);

    return updatedStatus;
  },

  async remove(id: string) {
    await sleep();
    db.statuses = db.statuses.filter(s => s.id !== id);
  }
};
