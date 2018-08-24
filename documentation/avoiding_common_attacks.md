# Avoiding Common Attacks
This document examines the risks and common attacks that smart contract developments can be subjected to. This material was covered in the course:
* Module 9 Lesson 3 "Safety Checklist".
* Module 10 Lesson 7 "Exploits and Dangers".

Each risk or common attack is covered in the sections below, along with an explanation of what has been done to mitigate the risk (if it is applicable).

## Logic Bugs
To mitigate against logic bugs, best practice it to ensure comprehensive automated unit testing. This has been done, there are many tests in the `test` folder.

## Coding Standards and Best Practices
Attacks are harder if the code is simpler. Complex code invites more risk, as more security holes are possible. Best practice is to avoid complexity which I have done, see details in the [design pattern decisions](./design_pattern_decisions.md) document.

## No Recursion
Recursion has not been used in any functions.

## Over-flow / Under-flow of Integers
Throughout the code `uint` is used. The data type `uint` (short for `uint256`) has a very large domain and is definitely sufficient for all eventualities. There is no risk of integer over-flow or under-flow.

## Use Libraries 
Best practice suggests I use libraries containing proven code. In this small project I did not find any good use cases for a library. I modelled the emergency stop pattern and the withdrawal pattern on existing best practices articles, but wrote my own code to do so (the code was fairly simple and I wanted complete control). By doing this, I was following this best practice advice:

> Use battle tested design patterns and learn from other people’s mistakes and heed their advice

By not relying heavily on external contracts, I also mitigate the security risk of external contracts not behaving as I expect. By writing my own code, inspired by the libaries, I retain complete control.

## Exposed Functions
Most functions are necessarily public. There is no attack risk here.

## Exposed Secrets
The public nature of the job marketplace may give some people cause for concern, for example giving out their physical address and contact details publically. This could be mitigated (to an extent) by incorporating identity management features and only revealing physical work location details to successful job hunters. This would make the dApp much more complex, as work proposals could only happen *before* any work is done, and only then would the job poster reveal physical address details.

If I were to implement more identifty management, I would use uPort. The uPort project is designed to handle identity management. However, the contract would still be open to bad actors *pretending* to be job posters just to find someone's physical address. That is a risk with *any* similar application, distributed or not, including Task Rabbit itself (the "real" non-distributed project that inspired this dApp). This is an accepted risk with the dApp.

## Poisoned User Input
All array accesses are checked to ensure the requested id is within the array bounds. There is an accepted risk of a bad actor entering extremely long strings to cause out of gas problems.

This is mitigated partly by the UI only allowing shorter strings, and partly by the gas limit itself, which will fail any transaction that tries to use a very long string, and cost the attacker Ether.

## Timestamp vulnerabilities
This contract does not use timestamps. So miners manipulating timestamps is not an concern.

## The tx.origin Problem
This contract does not use tx.origin. So this is not a concern.

## Powerful Administrators
The contract creator is powerful and must be trusted. It is they who can self-destruct the contract and withdraw the Ether. This risk could be mitigated by requiring multiple addresses to all approve the self-destruct of a contract and distributing the Ether amongst them all. This is still open to abuse if many bad actors collude. This is linked to the risk below, and is an accepted risk. 

## Good Security Practices Off Chain
I recognise the importance of following security best practices when off chain. Passwords should not be written down. Ideally no one person should hold all the power. This is linked to the risk above, and is an accepted risk.

## Cross Chain Replay Attacks
If Ethereum were to hard fork again, then this dApp could be subject to cross chain replay attacks. This is hard to prevent. I believe one mitigation in this case could be for a contract admin to wipe all jobs in the jobs array right after the hard fork happened. This would ensure that both chain forks are effectively starting from fresh again.

## Reentrancy Attacks
The risk to think about here is:
> If multiple contract functions are called, what happens?

I follow best practice with a withdrawal design pattern (see the [design pattern decisions](./design_pattern_decisions.md) document) and making calls that might fail always happen at the end of a function. This follows the best practice advice:
> It is generally a good idea to handle your internal contract state changes before calling external contracts, such as in the withdrawal design pattern. 

## Force Sending Ether
This contract does not make assumptions about Ether available. So people force sending Ether is not a concern.

## Transaction-Ordering Dependence (TOD) / Front Running
I do not believe this is a risk. If multiple transactions are made and re-ordered before a block is mined, I do not see any risk.

## Denial of Service Attacks
I use fixed length arrays to ensure gas limits are not exceeded. There are no cases where a failing external function can block the whole contract (for example, by using the withdrawal design pattern, only a single address can be prevented from recieving funds, not every address).