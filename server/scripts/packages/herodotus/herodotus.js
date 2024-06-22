import dotenv from 'dotenv';
import axios from 'axios';
import { ethers } from 'ethers';

dotenv.config();

class HerodotusClient {
  constructor() {
    this.apiUrl = process.env.HERODOTUS_API_URL || 'https://api.herodotus.cloud';
    this.apiKey = process.env.HERODOTUS_API_KEY;
    if (!this.apiKey) {
      throw new Error('HERODOTUS_API_KEY is not set in the environment variables');
    }

    // Replace with your Infura or Alchemy project ID
    this.provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/4c04bff6a0fc41d89acaea9ffb5639c4');
  }

  async getStorageRoot(address, blockNumber) {
    try {
      const proof = await this.provider.send('eth_getProof', [
        address,
        [], // Empty array for storage keys
        ethers.toBeHex(blockNumber)
      ]);
      return proof.storageHash; // This is the storage root
    } catch (error) {
      console.error('Error fetching storage root:', error);
      return null;
    }
  }

  async submitBatchQuery(ethereumDID, blockNumber) {
    try {
      console.log('Submitting batch query with params:', { ethereumDID, blockNumber });
      const response = await axios.post(`${this.apiUrl}/submit-batch-query?apiKey=${this.apiKey}`, {
        destinationChainId: "SN_SEPOLIA",
        fee: "0",
        data: {
          "11155111": {
            [`block:${blockNumber}`]: {
              accounts: {
                [ethereumDID]: {
                  props: ["BALANCE", "NONCE", "STORAGE_ROOT"]
                }
              }
            }
          }
        },
        webhook: {
          url: "https://webhook.site/17084e91-4a18-495d-acb1-e7c456842803",
          headers: {
            "Content-Type": "application/json"
          }
        }
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Full API response:', JSON.stringify(response.data, null, 2));
      
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Unexpected API response format');
      }
      
      if (!response.data.internalId) {
        throw new Error('Internal ID not found in API response');
      }
      
      return response.data;
    } catch (error) {
      this.logError('Error submitting batch query', error);
      throw error;
    }
  }

  async checkQueryStatus(internalId) {
    try {
      const url = `${this.apiUrl}/batch-queries/${internalId}?apiKey=${this.apiKey}`;
      console.log('Checking query status with URL:', url);
      const response = await axios.get(url);
      console.log('Query status response:', response.data);
      return response.data;
    } catch (error) {
      this.logError('Error checking query status', error);
      throw error;
    }
  }

  async fetchAccountData(address, blockNumber) {
    const data = {};
    try {
      // Fetch balance
      const balance = await this.provider.getBalance(address, blockNumber);
      data.balance = ethers.formatEther(balance);

      // Fetch nonce
      const nonce = await this.provider.getTransactionCount(address, blockNumber);
      data.nonce = nonce;

      // Fetch storage root (placeholder, as described above)
      // data.storageRoot = await this.provider.getStorageRoot(address, blockNumber);
      data.storageRoot = await this.getStorageRoot(address, blockNumber); // Placeholder
    } catch (error) {
      console.error('Error fetching account data:', error);
    }
    return data;
  }

  async sendToWebhook(proofData) {
    try {
      const webhookUrl = 'https://webhook.site/17084e91-4a18-495d-acb1-e7c456842803';
      console.log('Sending proof data to webhook:', JSON.stringify(proofData, null, 2));
      await axios.post(webhookUrl, proofData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Proof data sent to webhook successfully.');
    } catch (error) {
      console.error('Error sending proof data to webhook:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      }
    }
  }

  async bridgeEthereumDIDToStarknet(ethereumDID, blockNumber) {
    try {
      const result = await this.submitBatchQuery(ethereumDID, blockNumber);
      console.log('Proof generation initiated. Internal ID:', result.internalId);

      console.log('Polling for query status...');
      let proofData;
      for (let i = 0; i < 30; i++) {
        await new Promise(resolve => setTimeout(resolve, 20000)); // Increased polling interval to 20 seconds
        const status = await this.checkQueryStatus(result.internalId);
        if (status.batchQuery.status === 'DONE') {
          console.log('Query completed:', status);
          proofData = status.batchQuery.data;
          console.log('Proof data:', JSON.stringify(proofData, null, 2));
          
          // Fetch actual data and merge with proofData
          const accountData = await this.fetchAccountData(ethereumDID, blockNumber);
          proofData['11155111'][`block:${blockNumber}`]['accounts'][ethereumDID] = {
            props: [
              { BALANCE: accountData.balance },
              { NONCE: accountData.nonce },
              { STORAGE_ROOT: accountData.storageRoot }
            ],
            slots: []
          };

          break;
        }
        console.log(`Attempt ${i + 1}: Query still processing... Current status: ${status.batchQuery.status}`);
      }

      if (proofData) {
        await this.sendToWebhook(proofData); // Send proof data to webhook
      }
    } catch (error) {
      this.logError('Error bridging Ethereum DID to Starknet', error);
      throw error;
    }
  }

  logError(message, error) {
    console.error(message + ':', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    }
  }
}

const herodotus = new HerodotusClient();

async function main() {
  try {
    const ethereumDID = '0x29C914081A8F642ea3aed092087095b08B304315';
    const blockNumber = 6160383; // Example of a lower block number
    await herodotus.bridgeEthereumDIDToStarknet(ethereumDID, blockNumber);
  } catch (error) {
    console.error('Main execution error:', error);
  }
}

main();
