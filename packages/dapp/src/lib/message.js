import { Contract, utils } from 'ethers';

import i18n from '../i18n';

export const NOT_ENOUGH_COLLECTED_SIGNATURES = i18n.t(
  'transaction_to_the_bridge_is_found_but_oracles_confirmations_are_not_collected_yet_wait_for_a_minute_and_try_again',
);

export const getMessageData = async (
  isHome,
  ethersProvider,
  txHash,
  txReceipt,
) => {
  const abi = isHome
    ? new utils.Interface([
        'event UserRequestForSignature(bytes32 indexed messageId, bytes encodedData)',
      ])
    : new utils.Interface([
        'event UserRequestForAffirmation(bytes32 indexed messageId, bytes encodedData)',
      ]);
  let receipt = txReceipt;
  if (!receipt) {
    try {
      receipt = await ethersProvider.getTransactionReceipt(txHash);
    } catch (error) {
      throw Error(i18n.t('invalid_hash'));
    }
  }
  if (!receipt || !receipt.logs) {
    throw Error(i18n.t('no_transaction_found'));
  }
  const eventFragment = abi.events[Object.keys(abi.events)[0]];
  const eventTopic = abi.getEventTopic(eventFragment);
  const event = receipt.logs.find(e => e.topics[0] === eventTopic);
  if (!event) {
    throw Error(
      i18n.t(
        'it_is_not_a_bridge_transaction_specify_hash_of_a_transaction_sending_tokens_to_the_bridge',
      ),
    );
  }
  const decodedLog = abi.decodeEventLog(
    eventFragment,
    event.data,
    event.topics,
  );

  return {
    messageId: decodedLog.messageId,
    messageData: decodedLog.encodedData,
  };
};

export const getMessage = async (isHome, provider, ambAddress, txHash) => {
  const { messageId, messageData } = await getMessageData(
    isHome,
    provider,
    txHash,
  );
  const messageHash = utils.solidityKeccak256(['bytes'], [messageData]);

  const abi = [
    'function isAlreadyProcessed(uint256 _number) public pure returns (bool)',
    'function requiredSignatures() public view returns (uint256)',
    'function numMessagesSigned(bytes32 _message) public view returns (uint256)',
    'function signature(bytes32 _hash, uint256 _index) public view returns (bytes)',
  ];
  const ambContract = new Contract(ambAddress, abi, provider);
  const [requiredSignatures, numMessagesSigned] = await Promise.all([
    ambContract.requiredSignatures(),
    ambContract.numMessagesSigned(messageHash),
  ]);

  const isEnoughCollected = await ambContract.isAlreadyProcessed(
    numMessagesSigned,
  );
  if (!isEnoughCollected) {
    throw Error(NOT_ENOUGH_COLLECTED_SIGNATURES);
  }
  const signatures = await Promise.all(
    Array(requiredSignatures.toNumber())
      .fill(null)
      .map((_item, index) => ambContract.signature(messageHash, index)),
  );
  return {
    messageData,
    signatures,
    messageId,
  };
};

export const messageCallStatus = async (
  ambAddress,
  ethersProvider,
  messageId,
) => {
  const abi = [
    'function messageCallStatus(bytes32 _messageId) public view returns (bool)',
  ];
  const ambContract = new Contract(ambAddress, abi, ethersProvider);
  const claimed = await ambContract.messageCallStatus(messageId);
  return claimed;
};

export const requiredSignatures = async (homeAmbAddress, homeProvider) => {
  const abi = ['function requiredSignatures() public view returns (uint256)'];
  const ambContract = new Contract(homeAmbAddress, abi, homeProvider);
  const numRequired = await ambContract.requiredSignatures();
  return numRequired;
};
