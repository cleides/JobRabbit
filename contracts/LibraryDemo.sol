pragma solidity ^0.4.24;

// For truffle:
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
// For remix:
// import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";

/// @title LibraryDemo - A demo of using a library
/// @author Cleide Small cleide.small@hotmail.co.uk 
/// @dev Use library for Ownable contracts from https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol
/// This library gives us an owner state variable and allows us to renounce ownership (set owner to address(0)) and transfer ownership (to an address of the owner's choice).
contract LibraryDemo is Ownable
{
    // To test simple contract interactions
    bool private userFlag;
    
    /// @notice Set contract state variable in constructor
    /// @dev test simplest interactions    
    constructor() public
    {
        userFlag = false;
    }
    
    /// @notice Get contract state variable
    /// @dev test simplest interactions
    /// @return the userFlag
    function getUserFlag() public view
    returns(bool)
    {
        return userFlag;
    }
    
    /// @notice Set contract state variable
    /// @dev test simplest interactions    
    function setUserFlagOn() public 
    {
        userFlag = true;
    }
    
    /// @notice Set contract state variable
    /// @dev test simplest interactions    
    function setUserFlagOff() public 
    {
        userFlag = false;
    }
}