// yarn hardhat run --network localhost scripts/thescript/allStep.js
// lancer le script
//http://localhost:3000

const { ethers } = require("hardhat");

function wait(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function main() {
  // Adresse du contrat déployé localement
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  const [owner, account1, account2, account3, account4, account5] = await ethers.getSigners();

  // Abstraction du contrat
  const Contract = await ethers.getContractFactory("Voting");
  const contract = await Contract.attach(contractAddress);

  const add1 = await contract.addVoter(account1.address);
  console.log("Résultat de l'appel de fonction :", add1);
  await wait(4000);

  const add2 = await contract.addVoter(account2.address);
  console.log("Résultat de l'appel de fonction :", add2);
  await wait(4000);

  const add3 = await contract.addVoter(account3.address);
  console.log("Résultat de l'appel de fonction :", add3);
  await wait(4000);

  const add4 = await contract.addVoter(account4.address);
  console.log("Résultat de l'appel de fonction :", add4);
  await wait(4000);

  const add5 = await contract.addVoter(account5.address);
  console.log("Résultat de l'appel de fonction :", add5);
  await wait(4000);

  console.log("4 secondes se sont écoulées !");

  const startProposal = await contract.startProposalsRegistering();
  console.log("Résultat de l'appel de fonction :", startProposal);
  await wait(4000);

  const proposal1 = await contract.connect(account1).addProposal("Rouge");
  console.log("Résultat de l'appel de fonction :", proposal1);
  await wait(4000);

  const proposal2 = await contract.connect(account2).addProposal("Vert");
  console.log("Résultat de l'appel de fonction :", proposal2);
  await wait(4000);

  const proposal3 = await contract.connect(account3).addProposal("Jaune");
  console.log("Résultat de l'appel de fonction :", proposal3);
  await wait(4000);

  const proposal4 = await contract.connect(account4).addProposal("bleu");
  console.log("Résultat de l'appel de fonction :", proposal4);
  await wait(4000);

  const proposal5 = await contract.connect(account5).addProposal("noir");
  console.log("Résultat de l'appel de fonction :", proposal5);
  await wait(4000);

  console.log("4 secondes se sont écoulées !");

  const endProposal = await contract.endProposalsRegistering();
  console.log("Résultat de l'appel de fonction :", endProposal);
  await wait(4000);

  const startVoting = await contract.startVotingSession();
  console.log("Résultat de l'appel de fonction :", startVoting);
  await wait(4000);

  const votedPoposal1 = await contract.connect(account1).setVote(1);
  console.log("Résultat de l'appel de fonction :", votedPoposal1);

  const votedProposal2 = await contract.connect(account2).setVote(2);
  console.log("Résultat de l'appel de fonction :", votedProposal2);

  const votedProposal3 = await contract.connect(account3).setVote(2);
  console.log("Résultat de l'appel de fonction :", votedProposal3);

  const votedProposal4 = await contract.connect(account4).setVote(2);
  console.log("Résultat de l'appel de fonction :", votedProposal4);

  const votedProposal5 = await contract.connect(account5).setVote(3);
  console.log("Résultat de l'appel de fonction :", votedProposal5);

  console.log("4 secondes se sont écoulées !");

  const endVoting = await contract.endVotingSession();
  console.log("Résultat de l'appel de fonction :", endVoting);
  await wait(4000);

  const tallyVotes = await contract.tallyVotes();
  console.log("Résultat de l'appel de fonction :", tallyVotes);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });







