import { useEffect, useState } from 'react';
import { TotalAdStatus } from '../interfaces/database';
import { QueryOptions } from '../api/common/httpRequest';
import totalAdStatusServices from '../api/totalAdStatusServices';

function useTotalAdStatus(queryOptions: QueryOptions) {
  const [totalAdStatus, setTotalAdStatus] = useState<TotalAdStatus>();
  const [loading, setLoading] = useState(true);

  const getTotalAdStatus = async (queryOptions: QueryOptions) => {
    setLoading(true);
    setTotalAdStatus(await totalAdStatusServices.getBetween(queryOptions));
    setLoading(false);
  };

  useEffect(() => {
    getTotalAdStatus(queryOptions);
  }, []);

  return { loading, totalAdStatus, getTotalAdStatus };
}

export default useTotalAdStatus;
