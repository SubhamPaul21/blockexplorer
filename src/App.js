import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import './App.css';

import generateBlockDetails from './blockDetailsCard';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {

  const [blockNumber, setBlockNumber] = useState();
  const [currentBlockDetails, setCurrentBlockDetails] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    console.log("Block Number Fetched");
    getBlockNumber();
  }, []);

  useEffect(() => {
    async function getCurrentBlockDetails() {
      setCurrentBlockDetails(await alchemy.core.getBlock(blockNumber));
    }
    getCurrentBlockDetails();
  }, [blockNumber]);
  
  return generateBlockDetails(currentBlockDetails);
}

export default App;
