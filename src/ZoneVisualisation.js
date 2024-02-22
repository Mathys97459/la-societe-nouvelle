import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ZoneVisualisation = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) {
        // Si data est indéfini ou un tableau vide, ne fais rien
        return;
      }
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((entry) => entry.year),
        datasets: [
          {
            label: 'Tendance des intensités d\'émission de gaz à effet de serre des branches d\'activité',
            data: data.map((entry) => entry.value),
            borderColor: '#fcba03',
            backgroundColor: '#fff',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div id='graphique'>
      <canvas ref={chartRef}></canvas>
      <p>Note : Tendance pour toutes les activités. Les objectifs définis pour l'indicateur d'intensité d'émission de gaz à effet de serre se basent sur les budgets carbone sectoriels de la Stratégie Nationale Bas Carbone 2 (SBNC 2).
        <br></br><br></br>
        Sources : Insee, Eurostat, Banque Mondiale - Traitement La Société Nouvelle (Historique), SNCB - Traitement La Société Nouvelle (Objectif).
      </p>
    </div>
  );
};

export default ZoneVisualisation;
