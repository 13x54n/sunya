import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import SecurityAnalysis from './SecurityAnalysis';
import DeploymentWizard from './DeploymentWizard';
import ContractVerification from './ContractVerification';
import { RpcProvider } from 'starknet';

// Initialize the RPC provider
const provider = new RpcProvider({
  nodeUrl:
    'https://free-rpc.nethermind.io/sepolia-juno/?apikey=h2tR0Pyfsu9pL9sKjeFf71Gb6bYR6dqH2X6DeDTj',
});

export default function Dashboard({ wallet }) {
  const [activeTab, setActiveTab] = useState('analysis');
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [blockDetails, setBlockDetails] = useState(null);
  const [transactionReceipt, setTransactionReceipt] = useState(null);

  useEffect(() => {
    const transactionHash =
      '0x27156fbf72983857ddab2851a821f71dba8f8af06c675bd3967764aa22b65b8';

    const fetchTransactionStatus = async () => {
      try {
        const status = await provider.getTransactionStatus(transactionHash);
        console.log('Transaction Status:', status);
        setTransactionStatus(status);
      } catch (error) {
        console.error('Error fetching transaction status:', error);
      }
    };

    const fetchBlockDetails = async () => {
      try {
        const block = await provider.getBlockWithTxHashes('latest');
        console.log('Block Details:', block);
        setBlockDetails(block);
      } catch (error) {
        console.error('Error fetching block details:', error);
      }
    };

    const fetchTransactionReceipt = async () => {
      try {
        const receipt = await provider.getTransactionReceipt(transactionHash);
        console.log('Transaction Receipt:', receipt);
        setTransactionReceipt(receipt);
      } catch (error) {
        console.error('Error fetching transaction receipt:', error);
      }
    };

    fetchTransactionStatus();
    fetchBlockDetails();
    fetchTransactionReceipt();
  }, []);

  const handleActiveTab = (_d) => {
    setActiveTab(_d);
  };

  return (
    <div className='container mx-auto p-6 py-4 lg:px-8'>
      <div className='dashboardContainer__header flex items-center justify-between mb-5'>
        <h1 className='font_tiny5 text-5xl my-4'>
          🛸 Welcome, {wallet?.selectedAddress.substring(0, 5)}...
          {wallet?.selectedAddress.slice(-4)}!
        </h1>

        <div className='w-20 flex flex-col items-center'>
          <GaugeChart
            id='gauge-chart5'
            nrOfLevels={420}
            arcsLength={[0.3, 0.5, 0.2]}
            colors={['#EA4228', '#F5CD19', '#5BE12C']}
            percent={0.37}
            arcPadding={0.02}
            hideText={true}
          />
          <p className='text-md'>⛽</p>
        </div>
      </div>

      <div className='flex items-center gap-10 mb-3'>
        <div
          className={`border-2 border-gray-500 flex-1 h-50 p-1 px-2 rounded-lg bg-gray-50  ease-in-out transition-all shadow-sm cursor-pointer hover:shadow-lg font_bebas text-2xl ${
            activeTab === 'analysis' ? 'bg-[#a29bfe] shadow-xl' : ''
          }`}
          onClick={() => handleActiveTab('analysis')}
        >
          <i className='ri-bug-line'></i> Security Analysis
        </div>
        <div
          className={`border-2 border-gray-500 flex-1 h-50  p-1 px-2 rounded-lg bg-gray-50  ease-in-out transition-all shadow-sm cursor-pointer hover:shadow-lg font_bebas text-2xl ${
            activeTab === 'deployment' ? 'bg-[#dff9fb] shadow-xl' : ''
          }`}
          onClick={() => handleActiveTab('deployment')}
        >
          <i className='ri-cloud-line'></i> Deployment Wizard
        </div>
        <div
          className={`border-2 border-gray-500 flex-1 h-50  p-1 px-2 rounded-lg bg-gray-50  ease-in-out transition-all shadow-sm cursor-pointer hover:shadow-lg font_bebas text-2xl ${
            activeTab === 'verification' ? 'bg-[#b8e994] shadow-xl' : ''
          }`}
          onClick={() => handleActiveTab('verification')}
        >
          <i className='ri-magic-line'></i> Verification
        </div>
      </div>

      <p className='text-md text-gray-500 font-bold'>
        {'Dashboard ' + '>' + ' Security Analysis'}
      </p>

      <div>
        {activeTab === "analysis" && <SecurityAnalysis wallet={wallet}/>}
        {activeTab === "deployment" && <DeploymentWizard />}
        {activeTab === "verification" && <ContractVerification />}
      </div>
    </div>
  );
}
