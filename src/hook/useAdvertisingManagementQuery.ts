import { useEffect, useState } from 'react';
import { Advertising, AdvertisingManagement } from '../databaseTypes';
import advertisingManagementServices from '../api/advertisingManagementServices';

export interface MutationAdvertisingInpus
  extends Pick<Advertising, 'adType' | 'title' | 'budget' | 'startDate' | 'endDate' | 'status'> {}

function useAdvertisingManagementQuery() {
  const [managementState, setMenagementState] = useState<AdvertisingManagement>();
  const [loading, setLoading] = useState(true);

  const queryManagementState = async () => {
    setLoading(true);

    setMenagementState(await advertisingManagementServices.getAll());
    setLoading(false);
  };

  const createAdvertising = async (mutationAdvertisingInpus: MutationAdvertisingInpus) => {
    setLoading(true);

    const result = await advertisingManagementServices.createAdvertising(mutationAdvertisingInpus);
    setLoading(false);
    return result;
  };

  useEffect(() => {
    queryManagementState();
  }, []);

  return { loading, managementState, createAdvertising };
}

export default useAdvertisingManagementQuery;
