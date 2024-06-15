import {
  DynamicContextProvider,
  DynamicWidget,
} from '@dynamic-labs/sdk-react-core';
import { EthersExtension } from '@dynamic-labs/ethers-v5';

import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { StarknetWalletConnectors } from '@dynamic-labs/starknet';

const App = () => (
  <DynamicContextProvider
    settings={{
      environmentId: 'c991ecb6-69ad-457f-b187-077b666b3f12',
      walletConnectorExtensions: [EthersExtension],
      walletConnectors: [EthereumWalletConnectors, StarknetWalletConnectors],
    }}
  >
    <DynamicWidget />
  </DynamicContextProvider>
);

export default App;
