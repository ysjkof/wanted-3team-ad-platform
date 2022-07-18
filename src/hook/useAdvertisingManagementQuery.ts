import { useEffect, useState } from 'react';
import { Advertising, AdvertisingManagement } from '../interfaces/database';
import advertisingManagementServices from '../api/advertisingManagementServices';

export interface CreateAdvertisingInpus
  extends Pick<Advertising, 'adType' | 'title' | 'budget' | 'startDate' | 'endDate' | 'status'> {}

export interface ModifyAdvertisingInpus extends Partial<CreateAdvertisingInpus> {
  id: number;
}

function useAdvertisingManagementQuery() {
  const [managementState, setMenagementState] = useState<AdvertisingManagement>();
  const [loading, setLoading] = useState(true);

  const getManagementState = async () => {
    setLoading(true);
    setMenagementState(await advertisingManagementServices.getAll());
    setLoading(false);
  };

  const createAdvertising = async (mutationAdvertisingInpus: CreateAdvertisingInpus) => {
    setLoading(true);
    const result = await advertisingManagementServices.createAdvertising(mutationAdvertisingInpus);
    setLoading(false);
    return result;
  };

  const modifyAdversising = async (mutationAdvertisingInpus: ModifyAdvertisingInpus) => {
    setLoading(true);
    await advertisingManagementServices.modifyAdvertising(mutationAdvertisingInpus);
    setLoading(false);
  };

  const deleteAdversising = async (id: number) => {
    setLoading(true);
    await advertisingManagementServices.deleteAdvertising(id);
    setLoading(false);
  };

  useEffect(() => {
    getManagementState();
  }, []);

  return { loading, managementState, createAdvertising, modifyAdversising, deleteAdversising };
}

export default useAdvertisingManagementQuery;
