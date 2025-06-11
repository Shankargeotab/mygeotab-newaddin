import React, { useEffect, useRef, useState } from 'react';
import '@geotab/zenith/dist/index.css';
import { Button, Card } from '@geotab/zenith';

const PlowStatus = () => {
  const [status, setStatus] = useState('Fetching status…');

  const fetchPlowStatus = async () => {
    try {
      const toDate = new Date();
      const fromDate = new Date(toDate.getTime() - 5 * 60 * 1000);

      const data = await window.api.call('Get', {
        typeName: 'StatusData',
        search: {
          fromDate,
          toDate,
          diagnosticSearch: {
            id: [
              'DiagnosticAux6Id',
              'DiagnosticThirdPartyAux6Id',
              'DiagnosticIgnitionId'
            ]
          }
        }
      });

      const ignData = data.find(d => d.diagnostic.id === 'DiagnosticIgnitionId');
      const auxData = data.filter(d =>
        d.diagnostic.id === 'DiagnosticAux6Id' ||
        d.diagnostic.id === 'DiagnosticThirdPartyAux6Id'
      );

      if (!ignData || auxData.length === 0) {
        setStatus('⚠️ Data missing or incomplete.');
        return;
      }

      const ignitionOn = ignData.value === 1;
      const activeVehicles = auxData.filter(d => d.value === 1 && ignitionOn);

      if (activeVehicles.length === 0) {
        setStatus('❌ No vehicles with Plow ON and Ignition ON.');
      } else {
        const html = [
          '✅ Vehicles with Plow ON and Ignition ON:',
          ...activeVehicles.map(d => `• Vehicle ID: ${d.device.id}`)
        ].join('\n');
        setStatus(html);
      }
    } catch (e) {
      console.error('❌ Error fetching plow status:', e);
      setStatus('⚠️ Error loading plow status.');
    }
  };

  useEffect(() => {
    if (window.api) {
      fetchPlowStatus();
    } else {
      console.warn('🟡 Waiting for Geotab API to be available...');
    }
  }, []);

  return (
    <Card style={{ padding: '1rem', maxWidth: '600px', margin: '1rem auto' }}>
      <h2>Plow Status</h2>
      <pre>{status}</pre>
      <Button onClick={fetchPlowStatus}>Refresh Status</Button>
    </Card>
  );
};

export default PlowStatus;
