pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/LibraryDemo.sol";

/// @title Tests for the Library Demo Contract
contract TestLibraryDemo
{
    LibraryDemo libraryDemo = LibraryDemo(DeployedAddresses.LibraryDemo());

    /// @dev Test simple contract interactions (doesnt use library yet)
    function testUserFlagIsOff() public
    {        
        bool actualUserFlag;
        bool expectedUserFlag = false;
        actualUserFlag = libraryDemo.getUserFlag();
        
        // Do the test Assertion, compare actual and expected values
        Assert.equal(actualUserFlag, expectedUserFlag, "testUserFlagIsOff() test failed");
    }

    /// @dev Test simple contract interactions (doesnt use library yet)
    function testUserFlagCanBeSetOn() public
    {    
        libraryDemo.setUserFlagOn();    
        
        bool actualUserFlag;
        bool expectedUserFlag = true;
        actualUserFlag = libraryDemo.getUserFlag();
        
        // Do the test Assertion, compare actual and expected values
        Assert.equal(actualUserFlag, expectedUserFlag, "testUserFlagCanBeSetOn() test failed");
    }        

    /// @dev Test simple contract interactions (doesnt use library yet)
    function testUserFlagCanBeSetOff() public
    {    
        libraryDemo.setUserFlagOff();    
        
        bool actualUserFlag;
        bool expectedUserFlag = false;
        actualUserFlag = libraryDemo.getUserFlag();
        
        // Do the test Assertion, compare actual and expected values
        Assert.equal(actualUserFlag, expectedUserFlag, "testUserFlagCanBeSetOff() test failed");
    }  
             
    /// @dev Now test a library function. Test user cannot renounce contract (they didnt create it)
    /// notice renounceOwnership() doesn't exist in LibraryDemo.sol, it is from the OpenZeppelin Ownable.sol contract.
    function testCantRenounce() public
    {        
        ThrowProxyLibDemo throwproxy = new ThrowProxyLibDemo(address(libraryDemo)); 
        LibraryDemo(address(throwproxy)).renounceOwnership();
        bool r = throwproxy.execute.gas(200000)(); 
        Assert.isFalse(r, "Should be false because it should throw!");
        //Assert.isTrue(r, "Should be true because it should NOT throw!");        
    }
    
    /// @dev Test user cannot transfer contract (they didnt create it)
    /// notice transferOwnership() doesn't exist in LibraryDemo.sol, it is from the OpenZeppelin Ownable.sol contract.
    function testCantTransfer() public
    {        
        ThrowProxyLibDemo throwproxy = new ThrowProxyLibDemo(address(libraryDemo)); 
        LibraryDemo(address(throwproxy)).transferOwnership(address(0));
        bool r = throwproxy.execute.gas(200000)(); 
        Assert.isFalse(r, "Should be false because it should throw!");
        //Assert.isTrue(r, "Should be true because it should NOT throw!");        
    }
    
}

/// @title Contract proxy for tests that throw
/// @dev see https://bit.ly/2MipvxC
contract ThrowProxyLibDemo
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
