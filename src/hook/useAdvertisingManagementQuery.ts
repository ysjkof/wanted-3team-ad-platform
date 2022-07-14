import { useEffect, useState } from 'react';
import { AdvertisingManagement } from '../database/dbTypes';
import advertisingManagementServices from '../api/advertisingManagementServices';

function useAdvertisingManagementQuery() {
  const [managementState, setMenagementState] = useState<AdvertisingManagement>();
  const [loading, setLoading] = useState(true);

  const queryManagementState = async () => {
    setLoading(true);

    setMenagementState(await advertisingManagementServices.getAll());
    setLoading(false);
  };

  useEffect(() => {
    queryManagementState();
  }, []);

  return { loading, managementState };
}

export default useAdvertisingManagementQuery;
