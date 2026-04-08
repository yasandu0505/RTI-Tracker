import { mockReceivers, mockInstitutions, mockPositions } from '../data/mockData';
import { Institution, Position, Receiver } from '../types/db';

const SLEEP_MS = 500;

// TODO: Remove this after implementing the actual API
const sleep = () => new Promise(resolve => setTimeout(resolve, SLEEP_MS));

// Keep local mutable copies for the mock service
let receivers = [...mockReceivers];
let institutions = [...mockInstitutions];
let positions = [...mockPositions];

export const receiversService = {
  async listReceivers(page: number, pageSize: number) {
    await sleep();

    // mocking response for pagination
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      data: receivers.slice(start, end),
      pagination: {
        page,
        pageSize,
        totalItems: receivers.length,
        totalPages: Math.ceil(receivers.length / pageSize)
      }
    };
  },

  async createReceiver(payload: Partial<Receiver>) {
    await sleep();

    // mocking response for create
    const inst = institutions.find(i => i.id === payload.institutionId);
    const pos = positions.find(p => p.id === payload.positionId);
    
    const newReceiver: Receiver = {
      id: `rec-${Date.now()}`,
      institutionId: payload.institutionId!,
      positionId: payload.positionId!,
      email: payload.email || null,
      contactNo: payload.contactNo || null,
      address: payload.address || null,
      institutionName: inst?.name,
      positionName: pos?.name,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    receivers = [newReceiver, ...receivers];
    return newReceiver;
  },

  async updateReceiver(id: string, payload: Partial<Receiver>) {
    await sleep();

    //mocking response for update
    const inst = institutions.find(i => i.id === payload.institutionId);
    const pos = positions.find(p => p.id === payload.positionId);

    receivers = receivers.map(r => 
      r.id === id ? { 
        ...r, 
        ...payload, 
        institutionName: inst?.name || r.institutionName,
        positionName: pos?.name || r.positionName,
        updatedAt: new Date() 
      } : r
    );
    return receivers.find(r => r.id === id);
  },

  async removeReceiver(id: string) {
    await sleep();
    receivers = receivers.filter(r => r.id !== id);
  },

  async listInstitutions(page: number, pageSize: number) {
    await sleep();
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      data: institutions.slice(start, end),
      pagination: {
        page,
        pageSize,
        totalItems: institutions.length,
        totalPages: Math.ceil(institutions.length / pageSize)
      }
    };
  },

  async createInstitution(payload: { name: string }) {
    await sleep();
    const newInst: Institution = {
      id: `inst-${Date.now()}`,
      name: payload.name,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    institutions = [newInst, ...institutions];
    return newInst;
  },

  async updateInstitution(id: string, payload: { name: string }) {
    await sleep();
    institutions = institutions.map(i => 
      i.id === id ? { ...i, ...payload, updatedAt: new Date() } : i
    );
    // Update cached names in receivers
    receivers = receivers.map(r => 
      r.institutionId === id ? { ...r, institutionName: payload.name } : r
    );
    return institutions.find(i => i.id === id);
  },

  async removeInstitution(id: string) {
    await sleep();
    institutions = institutions.filter(i => i.id !== id);
  },

  async listPositions(page: number, pageSize: number) {
    await sleep();
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      data: positions.slice(start, end),
      pagination: {
        page,
        pageSize,
        totalItems: positions.length,
        totalPages: Math.ceil(positions.length / pageSize)
      }
    };
  },

  async createPosition(payload: { name: string }) {
    await sleep();
    const newPos: Position = {
      id: `pos-${Date.now()}`,
      name: payload.name,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    positions = [newPos, ...positions];
    return newPos;
  },

  async updatePosition(id: string, payload: { name: string }) {
    await sleep();
    positions = positions.map(p => 
      p.id === id ? { ...p, ...payload, updatedAt: new Date() } : p
    );
    // Update cached names in receivers
    receivers = receivers.map(r => 
      r.positionId === id ? { ...r, positionName: payload.name } : r
    );
    return positions.find(p => p.id === id);
  },

  async removePosition(id: string) {
    await sleep();
    positions = positions.filter(p => p.id !== id);
  }
};
