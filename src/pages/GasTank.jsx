import React from 'react'
import GaugeChart from 'react-gauge-chart'

export default function GasTank() {
  return (
    <div>
      Gas Tank

      <GaugeChart
          id="gauge-chart5"
          nrOfLevels={420}
          arcsLength={[0.3, 0.3, 0.3]}
          colors={["#EA4228", "#F5CD19", "#5BE12C"]}
          percent={0.37}
          arcPadding={0.02}
          hideText={true}
        />
    </div>
  )
}
