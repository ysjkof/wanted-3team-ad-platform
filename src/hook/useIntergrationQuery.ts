import { useEffect, useState } from 'react';
import { IntegrationStatus } from '../database/dbTypes';
import { QueryOptions } from '../api/httpRequest';
import integrationStatusServices from '../api/integrationStatusServices';

function useIntegrationStatusQuery(queryOptions: QueryOptions) {
  const [integrationReports, setIntegrationReports] = useState<IntegrationStatus>();
  const [loading, setLoading] = useState(true);

  const queryIntegrationStatus = async (queryOptions: QueryOptions) => {
    setLoading(true);

    setIntegrationReports(await integrationStatusServices.getBetween(queryOptions));
    setLoading(false);
  };

  useEffect(() => {
    queryIntegrationStatus(queryOptions);
  }, []);

  return { loading, integrationReports, queryIntegrationStatus };
}

export default useIntegrationStatusQuery;
