// SPDX-License-Identifier: MIT  test repo

pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title A voting contract
 * @author Alyra
 * @notice You can use this contract for only one vote
 * Owner can add voters and manage the workflow (proposal/vote/tally votes)
 * Voters can add proposals and vote
 */
contract Voting is Ownable {
    /// @notice Winning proposal id
    uint public winningProposalID;

    /**
     * @dev Voter struct that define a voter
     */
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    /**
     * @dev Proposal struct that define a proposal
     */
    struct Proposal {
        string description;
        uint voteCount;
    }

    /**
     * @dev  Workflow status that define the vote process
     */
    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    /// @notice Current workflow status
    WorkflowStatus public workflowStatus;

    /// @notice Store proposals
    Proposal[] proposalsArray;

    /// @notice Store voters
    mapping(address => Voter) voters;

    /**
     * @notice Voter registered event
     * @param voterAddress Voter address
     */
    event VoterRegistered(address voterAddress);

    /**
     * @notice Workflow status change event
     * @param previousStatus Previous workflow status
     * @param newStatus New workflow status
     */
    event WorkflowStatusChange(
        WorkflowStatus previousStatus,
        WorkflowStatus newStatus
    );

    /**
     * @notice Proposal registered event
     * @param proposalId Proposal id
     */
    event ProposalRegistered(uint proposalId);

    /*
     * @notice Voted event
     * @param voter Voter address
     * @param proposalId proposal voted
     */
    event Voted(address voter, uint proposalId);

    /// @notice Only voters modifier to restrict actions only for voters
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }

    // ::::::::::::: GETTERS ::::::::::::: //

    /**
     * @notice Get voter's information by his address, only available for voters
     * @param _addr Voter address
     * @return Voter Voter struct
     */
    function getVoter(
        address _addr
    ) external view onlyVoters returns (Voter memory) {
        return voters[_addr];
    }

    /**
     * @notice Get one proposal
     * @param _id Proposal id
     * @return Proposal Proposal struct
     */
    function getOneProposal(
        uint _id
    ) external view onlyVoters returns (Proposal memory) {
        return proposalsArray[_id];
    }

    // ::::::::::::: REGISTRATION ::::::::::::: //

    /**
     * @notice Add a voter in 'voters', only owner, emit VoterRegistered.
     * should be called only once for each voter and when workflowStatus is RegisteringVoters
     * @param _addr The Voter address
     */
    function addVoter(address _addr) external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Voters registration is not open yet"
        );
        require(voters[_addr].isRegistered != true, "Already registered");

        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }

    // ::::::::::::: PROPOSAL ::::::::::::: //

    /**
     * @notice Add proposal of 'msg.sender' in 'proposals', only voters, emit ProposalRegistered.
     * should be called only when workflowStatus is  ProposalsRegistrationStarted no empty description allowed
     * @param _desc Proposal description
     */
    function addProposal(string calldata _desc) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Proposals are not allowed yet"
        );
        require(
            keccak256(abi.encode(_desc)) != keccak256(abi.encode("")),
            "Vous ne pouvez pas ne rien proposer"
        );

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length - 1);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    /**
     * @notice Set the vote of 'msg.sender', only voters, emit Voted.
     * should be called only when workflowStatus is VotingSessionStarted
     * should be called only once for each voter and for a registered proposal
     * @param _id Proposal id
     */
    function setVote(uint _id) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        require(voters[msg.sender].hasVoted != true, "You have already voted");
        require(_id < proposalsArray.length, "Proposal not found"); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        if (
            proposalsArray[_id].voteCount >
            proposalsArray[winningProposalID].voteCount
        ) {
            winningProposalID = _id;
        }

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //

    /**
     * @notice Start the proposal registration session
     * should be called only by owner
     * should be called only when status is RegisteringVoters
     *
     * The first proposal is set as GENESIS
     *
     * An event WorkflowStatusChange is emitted when the session has been started
     */
    function startProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Registering proposals cant be started now"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;

        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);

        emit WorkflowStatusChange(
            WorkflowStatus.RegisteringVoters,
            WorkflowStatus.ProposalsRegistrationStarted
        );
    }

    /**
     * @notice Stop the proposal registration session
     * should be called only by owwner
     * should be called only when status is ProposalsRegistrationStarted
     *
     * An event WorkflowStatusChange is emitted when the session has been stopped
     */
    function endProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Registering proposals havent started yet"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationStarted,
            WorkflowStatus.ProposalsRegistrationEnded
        );
    }

    /**
     * @notice Start the voting session
     * should be called only by owner
     * should be called only when status is ProposalsRegistrationEnded
     *
     * An event WorkflowStatusChange is emitted when the session has been started
     */
    function startVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationEnded,
            "Registering proposals phase is not finished"
        );
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationEnded,
            WorkflowStatus.VotingSessionStarted
        );
    }

    /**
     * @notice Stop the voting session
     * should be called only by owner
     * should be called only when status is VotingSessionStarted
     *
     * An event WorkflowStatusChange is emitted when the session has been stopped
     */
    function endVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionStarted,
            WorkflowStatus.VotingSessionEnded
        );
    }

    /**
     * @notice Tally votes
     * should be called only by owner
     *  should be called only when status is VotingSessionEnded
     *
     * An event WorkflowStatusChange is emitted when the tally has been done
     */
    function tallyVotes() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionEnded,
            "Current status is not voting session ended"
        );
        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionEnded,
            WorkflowStatus.VotesTallied
        );
    }

    /**
     * @notice Only to avoid warnings in hardhat console
     */
    receive() external payable {}

    /**
     * @notice Only to avoid warnings in hardhat console
     */
    fallback() external payable {}
}
