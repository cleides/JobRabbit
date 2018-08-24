pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/JobRabbit.sol";

/// @title Tests for the Job Rabbit Contract
/// @dev Tests that need to catch thrown exceptions use technique here https://bit.ly/2MipvxC
contract TestJobRabbit
{
    JobRabbit jobRabbit = JobRabbit(DeployedAddresses.JobRabbit());
    
    // Ids for jobs created by tests
    uint jobId1;   
    uint jobId2;   
    
    /// @dev Test the createJob() function
    function testCreateJob1() public
    {
        // Create new job and get its id
        string memory jDetailsExpected = "Find me a good theatre show in Ethertown. I will go sometime next month.";
        jobId1 = jobRabbit.createJob(jDetailsExpected);

        // Now get job details from contract
        string memory jDetailsActual;
        JobRabbit.JobStatus jStatus;
        address jOwner;
        uint jValue;
        string memory sEvidence;
        address sOwner;
        (jDetailsActual, jStatus, jOwner, jValue, sEvidence, sOwner) = jobRabbit.getJobDetail(jobId1);
        
        // Do the test, compare actual and expected values
        Assert.equal(jDetailsActual, jDetailsExpected, "createJob1() test failed, job details are wrong");
    }

    /// @dev Test the createSubmission() function for the job just created
    function testCreateSubmission1() public
    {
        // Create new submission for job id 1 created earlier
        string memory jSubmissionExpected = "The show called Vitalik is popular, I have booked you tickets call me 12345 678900.";
        jobRabbit.createSubmission(jobId1, jSubmissionExpected);

        // Now get submission details back from contract
        string memory jDetails;
        JobRabbit.JobStatus jStatus;
        address jOwner;
        uint jValue;
        string memory sEvidenceActual;
        address sOwner;
        (jDetails, jStatus, jOwner, jValue, sEvidenceActual, sOwner) = jobRabbit.getJobDetail(jobId1);
        
        // Do the test, compare actual and expected values
        Assert.equal(sEvidenceActual, jSubmissionExpected, "createSubmission1() test failed, submission details are wrong");
    }
    
    /// @dev Test acceptSubmission() function for the job id 1 just created
    function testAcceptSubmission1() public
    {
        // Accept the submission we just added to the job id 1 we created
        jobRabbit.acceptSubmission(jobId1);

        // Now get submission details back from contract
        string memory jDetails;
        JobRabbit.JobStatus jStatusActual;
        address jOwner;
        uint jValue;
        string memory sEvidenceActual;
        address sOwner;
        (jDetails, jStatusActual, jOwner, jValue, sEvidenceActual, sOwner) = jobRabbit.getJobDetail(jobId1);
        
        // Accepting a submission causes the job slot to be "reset" and so we are expecting a job status of EmptySlot
        // (see code in acceptSubmission() in main contract).
        JobRabbit.JobStatus jStatusExpected = JobRabbit.JobStatus.EmptySlot;
        
        // Have to cast before Assert, because Assert does not of course know about JobStatus enum type
        uint jStatusExpectedUint = uint(jStatusExpected);
        uint jStatusActualUint = uint(jStatusActual);        
        
        // Do the test, compare actual and expected values
        Assert.equal(jStatusActualUint, jStatusExpectedUint, "testApproveSubmission1() test failed, job is not in correct status");
    }
    
    /// @dev Test the createJob() function for job id 2
    function testCreateJob2() public
    {
        // Create new job and get its id
        string memory jDetailsExpected = "Find me a good hairdresser, I want to go this afternoon.";
        jobId2 = jobRabbit.createJob(jDetailsExpected);

        // Now get job details from contract
        string memory jDetailsActual;
        JobRabbit.JobStatus jStatus;
        address jOwner;
        uint jValue;
        string memory sEvidence;
        address sOwner;
        (jDetailsActual, jStatus, jOwner, jValue, sEvidence, sOwner) = jobRabbit.getJobDetail(jobId2);
        
        // Do the test, compare actual and expected values
        Assert.equal(jDetailsActual, jDetailsExpected, "createJob2() test failed, job details are wrong");
    }

    /// @dev Test the createSubmission() function for the job just created
    function testCreateSubmission2() public
    {
        // Create new submission for job id created earlier
        string memory jSubmissionExpected = "The Curl Up and Dye hairdresser is good, you are booked for 4pm call me 12345 678900.";
        jobRabbit.createSubmission(jobId2, jSubmissionExpected);

        // Now get submission details back from contract
        string memory jDetails;
        JobRabbit.JobStatus jStatus;
        address jOwner;
        uint jValue;
        string memory sEvidenceActual;
        address sOwner;
        (jDetails, jStatus, jOwner, jValue, sEvidenceActual, sOwner) = jobRabbit.getJobDetail(jobId1);
        
        // Do the test, compare actual and expected values
        Assert.equal(sEvidenceActual, jSubmissionExpected, "createSubmission2() test failed, submission details are wrong");
    }
    
    /// @dev Test rejectSubmission() function for the job id 2 just created
    function testRejectSubmission2() public
    {
        // Reject the submission we just added to the job id 2 we created
        jobRabbit.rejectSubmission(jobId2);

        // Now get submission details back from contract
        string memory jDetails;
        JobRabbit.JobStatus jStatusActual;
        address jOwner;
        uint jValue;
        string memory sEvidenceActual;
        address sOwner;
        (jDetails, jStatusActual, jOwner, jValue, sEvidenceActual, sOwner) = jobRabbit.getJobDetail(jobId2);
        
        // Rejecting a submission causes the job to be set to status JobAdvertised so more submissions can happen.
        // (see code in rejectSubmission() in main contract).
        JobRabbit.JobStatus jStatusExpected = JobRabbit.JobStatus.JobAdvertised;
        
        // Have to cast before Assert, because Assert does not of course know about JobStatus enum type
        uint jStatusExpectedUint = uint(jStatusExpected);
        uint jStatusActualUint = uint(jStatusActual);        
        
        // Do the test, compare actual and expected values
        Assert.equal(jStatusActualUint, jStatusExpectedUint, "testRejectSubmission2() test failed, job is not in correct status");
    }
    
    /// @dev Check user cannot accept a submission for a non-existent job (job id outside our bounds check).
    /// We expect this transaction to revert (throw), so we use the technique described here https://bit.ly/2MipvxC.
    function testUserCannotAcceptSubmissionBadJob() public
    {        
        ThrowProxy throwproxy = new ThrowProxy(address(jobRabbit)); 
        JobRabbit(address(throwproxy)).acceptSubmission(100);
        bool r = throwproxy.execute.gas(300000)(); 
        Assert.isFalse(r, "User should not be able to accept this submission. Should be false because it should throw!");
        //Assert.isTrue(r, "Should be true because it should NOT throw!");
    }
          
    /// @dev Check user cannot engage panic mode (the emergency stop)
    /// We expect this transaction to revert (throw), so we use the technique described here https://bit.ly/2MipvxC.
    function testUserCannotSetPanicMode() public
    {        
        ThrowProxy throwproxy = new ThrowProxy(address(jobRabbit)); 
        JobRabbit(address(throwproxy)).panicOn();
        bool r = throwproxy.execute.gas(300000)(); 
        Assert.isFalse(r, "User should not be able to set panic mode. Should be false because is should throw!");
        //Assert.isTrue(r, "Should be true because is should NOT throw!");
    }
    
    /// @dev Check user cannot kill contract
    /// We expect this transaction to revert (throw), so we use the technique described here https://bit.ly/2MipvxC.
    function testUserCannotKillContract() public
    {        
        ThrowProxy throwproxy = new ThrowProxy(address(jobRabbit)); 
        JobRabbit(address(throwproxy)).kill();
        bool r = throwproxy.execute.gas(300000)(); 
        Assert.isFalse(r, "User should not be able to kill contract. Should be false because is should throw!");
        //Assert.isTrue(r, "Should be true because is should NOT throw!");
    }
}

/// @title Contract proxy for tests that throw (see https://bit.ly/2MipvxC)
contract ThrowProxy
{
    address public target;
    bytes data;

    constructor(address _target) public
    {
        target = _target;
    }

    // Prime the data using the fallback function.
    function() public
    {
        data = msg.data;
    }

    function execute() public returns (bool)
    {
        return target.call(data);
    }
}