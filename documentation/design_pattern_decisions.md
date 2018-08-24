# Design Pattern Decisions
This documents lists common design patterns and explains why they were, or were not, used in this dApp.

Before looking at common design patterns it is helpful to get a high level understanding of how the contract works.

# Overall Design & Job Lifecycle
This project was inspired by TaskRabbit, a site to allow small household jobs to be done. **Job owners** post up requests for work, and **job hunters** submit evidence that they have done it. The job hunters then wait for approval to allow them to take payment.

The first design principle is that job hunter submissions for work done are *blocking*. This means that a work submission requires the job owner to accept or reject them before a new submission can happen. The reasoning is that e.g. if the job is "paint my house" you don't want two people doing it at once. For this reason each job can have only one submission open at a time.

The job lifecycle is controlled by the `JobStatus` enum. This is shown in the diagram below:

![sequence](/documentation/sequence.png "Job Lifecycle")

A job begins as a record with status = `EmptySlot` in the `jobs[]` array. This means that the entry is ready to use.

The job owner then creates a job and the status changes to `JobAdvertised`. Now job hunters can post submissions. Once a submission is received, the job status changes to `WorkCompleted`.

Now the job is blocked until the job owner makes a decision:

* If the job owner accepts the work, then the job hunter's "owed money" amount is increased in the `pendingWithdrawals` mapping, and the job is set to status `EmptySlot` ready to be re-used again. This job's lifecycle is complete. Note The payment process is separate from the job lifecycle. The job hunter can withdraw money using the pull design pattern at any later time (or not at all).
* If the job owner rejects the work, then the job is set to status `JobAdvertised` again, and the job can receive a new proposal.

# Emergency Stop / Circuit Breaker
This design pattern was implemented, based on code from the [OpenZeppelin contract website](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/lifecycle/Pausable.sol) although in order to retain complete control I chose not to import this as a library. 

The solution does not add complexity, and allows critical functions to be halted in crisis situations.

It works as follows. The contract owner has two functions that only they can run, called `panicOff()` and `panicOn()`. These functions toggle the `panicMode` boolean that indicates if the contract is in "panic mode" or not. If we are in panic mode then the function to withdraw money will not withdraw money.

This means that if a very serious bug is found, for exmaple a bug that allowed funds to somehow be stolen, then the contract can be switched to panic mode and the contract's funds are kept safe.

# Speed Bump
The speed bump design pattern allows transaction call frequency to be deliberately throttled. This allows usage of the contract to be "slowed down" and permits time for the developers to investigate a potential problem without ceasing operations completely (as is the case with the emergency stop pattern). This was not implemented in the JobRabbit contract because it would add quite a lot of complexity and for a relatively simple contract it is not needed. The emergency stop is sufficient.

# Restricting Access
You cannot prevent people or computer programs from reading your contracts’ state. The state is publicly available information. This is not a concern in this contract, but where approporiate I have made state variables and functions private to prevent other contracts reading them.

# Off-Chain Computation
I appreciate that Ethereum has limitations on performance and that where possible it is a good idea to do computation off-chain. In the case of JobRabbit there were no scenarios where I needed to do a lot of off-chain computation.

# Commit-Reveal
A commit reveal design pattern is useful in situations where a user must commit to a value (perhaps a bid) and only later reveal it. This design pattern is not necessary in this contract.

# Fail Early, Fail Loud
This design pattern has been used. As far as possible, checks are done at the start of a function, and uses `revert()` to check for essential things.

# Auto Deprecation
Auto deprecation is a useful strategy for closing contracts that should expire after a certain amount of time. This can be useful when running alpha or beta testing for smart contracts. This design pattern is not necessary in this contract.

# Mortal
A Self Destruct function has been implemented to allow removal of the contract and the return of funds to the contract creator. This adds little complexity and allows us to remove the contract entirely if a very bad bug is found.

# Pull Payments / Withdrawal Pattern
I used the pull pattern for payments as per http://solidity.readthedocs.io/en/v0.4.24/common-patterns.html.

# Comments
All comments follow the NatSpec standard as outlined here: https://github.com/ethereum/wiki/wiki/Ethereum-Natural-Specification-Format and in general I have followed the suggestions on file layout here: https://solidity.readthedocs.io/en/v0.4.14/layout-of-source-files.html.

# Upgradability
Upgrading contracts is a useful feature for long lived and complex contracts. There is no "one size fits all" solution to contract upgradability and [all the solutions I looked at](https://blog.indorse.io/ethereum-upgradeable-smart-contract-strategies-456350d0557c) added significant complexity. I have chosen not to make the JobRabbit contract upgradable for this small project.