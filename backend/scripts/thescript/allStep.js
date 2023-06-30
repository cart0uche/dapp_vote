// yarn hardhat run --network localhost scripts/the_script/allStep.js
// lancer le script
http://localhost:3000


//////////////////

const { ethers } = require("hardhat");


async function main() {
  // Adresse du contrat déployé localement
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  const [owner, account1, account2, account3, account4,account5  ] = await hre.ethers.getSigners();


  // Abstraction du contrat
  const Contract = await ethers.getContractFactory("Voting");
  const contract = await Contract.attach(contractAddress);

  // par default c'est lehonneur [0] qui appelle la fonction
  // function addVoter onlyOwner

    const add1 = await contract.addVoter(account1.address);
    console.log("Résultat de l'appel de fonction :", add1);

    const waitFourSeconds = () => {
        setTimeout(() => {
          console.log("4 secondes se sont écoulées !");
        }, 4000);
      };
      
      // Appeler la fonction pour démarrer l'attente de 4 secondes
      waitFourSeconds();

    const add2 = await contract.addVoter(account2.address);
    console.log("Résultat de l'appel de fonction :", add2);

    const add3 = await contract.addVoter(account3.address);
    console.log("Résultat de l'appel de fonction :", add3);

    // function startProposalsRegistering  WorkFow Satus
    // par default c'est le owner [0] qui appelle la fonction
    const startProposal = await contract.startProposalsRegistering();
    console.log("Résultat de l'appel de fonction :",startProposal );

    //
      // function addProposal  
    // only Voters
    const proposal1 = await contract.connect(account1).addProposal("Rouge");
    console.log("Résultat de l'appel de fonction :", proposal1)

    const proposal2 = await contract.connect(account2).addProposal("Vert");
    console.log("Résultat de l'appel de fonction :", proposal2)

    const proposal3 = await contract.connect(account3).addProposal("Jaune");
    console.log("Résultat de l'appel de fonction :", proposal3)

    const proposal4 = await contract.connect(account4).addProposal("bleu");
    console.log("Résultat de l'appel de fonction :", proposal4)

    const proposa5 = await contract.connect(account5).addProposal("noir");
    console.log("Résultat de l'appel de fonction :", proposal5)



    // function endProposalsRegistering  WorkFow Satus
    // par default c'est lehonneur [0] qui appelle la fonction
    const endProposal = await contract.endProposalsRegistering();
    console.log("Résultat de l'appel de fonction :",endProposal );



      


    // function endProposalsRegistering  WorkFow Satus
    // par default c'est lehonneur [0] qui appelle la fonction
    const startVoting = await contract.startVotingSession();
    console.log("Résultat de l'appel de fonction :",startVoting );


      /*


      // function setVote
    // only Voters
    const votedPoposal1 = await contract.connect(account1).setVote(1);
    console.log("Résultat de l'appel de fonction :", proposal1)

    const votedProposal2 = await contract.connect(account2).setVote(2);
    console.log("Résultat de l'appel de fonction :", proposal2)

    const votedPproposal3 = await contract.connect(account3).setVotel(2);
    console.log("Résultat de l'appel de fonction :", proposal3)

    const votedProposal4 = await contract.connect(account4).setVote(2);
    console.log("Résultat de l'appel de fonction :", proposal2)

    const votedPproposal5 = await contract.connect(account5).setVote(3);
    console.log("Résultat de l'appel de fonction :", proposal3)

    // function endProposalsRegistering  WorkFow Satus
    // par default c'est l'owner [0] qui appelle la fonction
    const endVoting = await contract.endVotingSession();
    console.log("Résultat de l'appel de fonction :",endVoting );

      // function endProposalsRegistering  WorkFow Satus
    // par default c'est l'owner [0] qui appelle la fonction
    const tallyVotes = await contract.tallyVotes();
    console.log("Résultat de l'appel de fonction :",tallyVotes );


   */














         
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });