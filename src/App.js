import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const initialBlockDetails = {
    number: "",
    timestamp: "",
    transactions: [],
    _difficulty: {
      _hex: "",
    },
    gasUsed: {
      _hex: "",
    },
    gasLimit: {
      _hex: "",
    },
    baseFeePerGas: {
      _hex: "",
    },
    extraData: "",
    miner: "",
    hash: "",
    parentHash: "",
    nonce: "",
  }

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

  console.log("Current Block Details", currentBlockDetails);
  return (
    <>
      <Card border="primary" style={{ textAlign: 'center' }}>
        <Card.Body>
          <Card.Title>Block</Card.Title>
          <Card.Text>
            #{blockNumber}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card border="secondary">
        <ListGroup variant="flush">
          <ListGroup.Item><b>Block Height: </b>{currentBlockDetails === undefined ? initialBlockDetails.number : currentBlockDetails.number}</ListGroup.Item>
          <ListGroup.Item><b>Status: </b>Unfinalized</ListGroup.Item>
          <ListGroup.Item><b>Timestamp: </b>{currentBlockDetails === undefined ? initialBlockDetails.timestamp : new Date(currentBlockDetails.timestamp * 1000).toUTCString()}</ListGroup.Item>
          <ListGroup.Item><b>Transactions: </b>{currentBlockDetails === undefined ? initialBlockDetails.transactions.length : currentBlockDetails.transactions.length} transactions</ListGroup.Item>
          <ListGroup.Item><b>Total Difficulty: </b>{currentBlockDetails === undefined ? initialBlockDetails._difficulty._hex : currentBlockDetails._difficulty._hex.toString(16)}</ListGroup.Item>
          <ListGroup.Item><b>Gas Used: </b>{currentBlockDetails === undefined ? initialBlockDetails.gasUsed._hex : parseInt(currentBlockDetails.gasUsed._hex)}</ListGroup.Item>
          <ListGroup.Item><b>Gas Limit: </b>{currentBlockDetails === undefined ? initialBlockDetails.gasLimit._hex : parseInt(currentBlockDetails.gasLimit._hex)}</ListGroup.Item>
          <ListGroup.Item><b>Base Fee Per Gas: </b>{currentBlockDetails === undefined ? initialBlockDetails.baseFeePerGas._hex : Utils.formatUnits(parseInt(currentBlockDetails.baseFeePerGas._hex), "ether") + " ETH (" + Utils.formatUnits(parseInt(currentBlockDetails.baseFeePerGas._hex), "gwei") + " Gwei)"}</ListGroup.Item>
          <ListGroup.Item><b>Extra Data: </b>{currentBlockDetails === undefined ? initialBlockDetails.extraData : currentBlockDetails.extraData}</ListGroup.Item>
          <ListGroup.Item><b>Validator: </b>{currentBlockDetails === undefined ? initialBlockDetails.miner : currentBlockDetails.miner}</ListGroup.Item>
          <ListGroup.Item><b>Hash: </b>{currentBlockDetails === undefined ? initialBlockDetails.hash : currentBlockDetails.hash}</ListGroup.Item>
          <ListGroup.Item><b>Parent Hash: </b>{currentBlockDetails === undefined ? initialBlockDetails.parentHash : currentBlockDetails.parentHash}</ListGroup.Item>
          <ListGroup.Item><b>Nonce: </b>{currentBlockDetails === undefined ? initialBlockDetails.nonce : currentBlockDetails.nonce}</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
}

export default App;
