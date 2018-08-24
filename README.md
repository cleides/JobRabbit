# JobRabbit
<img src="documentation/jobrabbit.png" align="right"
     title="JobRabbit">
Job Rabbit is a bounty market dApp inspired by TaskRabbit. Written by Cleide (Keira) Small cleide.small@hotmail.co.uk for the ConsenSys Academy 2018 final project.

## Contents
- [Description](#description)
- [How to Install](#how-to-install)
  - [Install Dependencies](#install-dependencies)
  - [Check the Install](#check-the-install)
- [User Stories](#user-stories)
- [Truffle Test](#truffle-test)
  - [Compile](#compile)
  - [Migrate](#migrate)
  - [Test](#test)
- [UI Test](#ui-test)
  - [Check Pre-requisites](#check-pre-requisites)
  - [Start Browser and Configure MetaMask](#start-browser-and-configure-metamask)
  - [Start the dAPP Web UI](#start-the-dapp-web-ui)
  - [Interact with the UI](#interact-with-the-ui)
- [Design](#design)
- [Security](#security)
- [Deployment to Rinkeby](#deployment-to-rinkeby)
- [Use of a Library](#use-of-a-library)

# Description
This is a bounty dApp where job owners can post "TaskRabbit" style small jobs for job hunters to do. The job owner can attach Ether to the job that will later be used to pay the job hunter.

The job hunters then look through the list of posted jobs to find something they'd like to do. They can then do the work and make a submission with evidence that they have done the job. The job owner can then accept or reject a submission.

Submissions that are accepted cause funds to be added to job hunter's due amount. The job hunter can then withdraw the funds.

# How to Install
Download the repository from GitHub. You will see these folders:

| Folder | Description |
| --- | --- |
| contracts | Solidity contract files |
| documentation | Documentation files, images and markdown |
| frontend | Frontend files, JavaScript and HTML for a lite-server UI |
| migrations | Migration definitions |
| test | Solidity test contracts, to test the main contracts |

## Install Dependencies
This project has almost the same dependencies as the [Truffle Pet Shop Tutorial](https://truffleframework.com/tutorials/pet-shop). You need `node` and `truffle` installed. To verify that Truffle is installed properly, type **truffle version** on a terminal:

```
> truffle version
Truffle v4.1.11 (core: 4.1.11)
Solidity v0.4.24 (solc-js)
```
To verify that `npm` is installed properly, type **npm version** on a terminal:
```
> npm version
{ npm: '6.1.0',
  ...etc...}
```
If you see an error with either of the above steps, follow the instructions on the [Truffle site](
https://truffleframework.com/tutorials/pet-shop#setting-up-the-development-environment) before continuing.

Now you will install the node packages that are required for the project.

On a terminal navigate to the root folder of the project (the folder with the `truffle.js` file). Run **npm install**:
```
> npm install
```
The necessary packages will install. It is fine to ignore any warnings.

## Check the Install
To check the install is ok, you should check for a new folder called `node_modules` under the top level project directory:

```
JobRabbit
  + ...
  + node_modules
  + ...
```
You can email me on the email shown at the top of this document if you have any install issues.

# User Stories
These user stories are adapted from the project requirements document:
* As a job poster, I can create a new job.
* I set a job description and include the amount to be paid for a successful submission.
* I am able to view a list of bounties that I have already posted.
* I can see if any bounties have a submission proposed.
* I can accept or reject the submitted work. 
* Accepting proposed work allows the submitter to withdraw the deposited amount.
* As a job hunter, I can submit work for review. If work is accepted I can withdraw Ether.

# Truffle Test
This section describes the automated tests performed using Truffle. To perform the tests follow these steps:
## Compile
First, on a terminal run `ganache-cli`. You should see an output like the below, notice ganache is listening on the default port of 8545:
```
> ganache-cli
Ganache CLI v6.1.3 (ganache-core: 2.1.2)

Available Accounts
==================
(0) 0xd3761dad85fb772a738757adf50cb4431c4ed120
(1) 0xcf22467f6c3aa1586d45c237e749a3e8004b62a5

...etc...

Listening on localhost:8545
```

Then in another terminal run `truffle compile --all`. You should see output like this:

```
> truffle compile --all
Compiling .\contracts\JobRabbit.sol...
Compiling .\contracts\LibraryDemo.sol...
Compiling .\contracts\Migrations.sol...
Compiling openzeppelin-solidity/contracts/ownership/Ownable.sol...
Writing artifacts to .\build\contracts
```

## Migrate
Now run `truffle migrate` to deploy our contracts. You should see output like this:

```
> truffle migrate
Using network 'development'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x4958b83cee539cde0fe267f00f6423e1b0a6c989b15113d0148905a37f090f47
  Migrations: 0xe532001ccd785bf413e0f25b46c56b3f991bfb78
Saving successful migration to network...
  ... 0xd91d21709225bb764e1306c17b37ece9c97209d877ac29fe4a080cd38e507a69
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying JobRabbit...
  ... 0x35ca9166f5c1c120a614bd79c30c50111fa36a26129a82b7678d1272412322d2
  JobRabbit: 0x3a3e8ac81b5b03a44cd7be66adfdeb88d5db3ce4
  Deploying LibraryDemo...
  ... 0xdccc7e3469cc0040f2f8b3999212a0cc94a2f38a1065eee34c5b55fa4e0e849e
  LibraryDemo: 0x8cdafe2b35f80d9b6421a0dae496c76433fa9090
Saving successful migration to network...
  ... 0xa8c3f4713907a332d4a4a1c24bb6a0dec14b4cc012b468578e30cd962075268e
Saving artifacts...
```

## Test
Now we can run the automated tests by running `truffle test`. You should see output like this:
```
> truffle test
Using network 'development'.

Compiling .\contracts\JobRabbit.sol...
Compiling .\contracts\LibraryDemo.sol...
Compiling .\test\TestJobRabbit.sol...
Compiling .\test\TestLibraryDemo.sol...
Compiling openzeppelin-solidity/contracts/ownership/Ownable.sol...
Compiling truffle/Assert.sol...
Compiling truffle/DeployedAddresses.sol...

  TestJobRabbit
    √ testCreateJob1 (156ms)
    √ testCreateSubmission1 (154ms)
    √ testAcceptSubmission1 (123ms)
    √ testCreateJob2 (135ms)
    √ testCreateSubmission2 (159ms)
    √ testRejectSubmission2 (98ms)
    √ testUserCannotAcceptSubmissionBadJob (102ms)
    √ testUserCannotSetPanicMode (92ms)
    √ testUserCannotKillContract (100ms)
    
  TestLibraryDemo
    √ testUserFlagIsOff (100ms)
    √ testUserFlagCanBeSetOn (90ms)
    √ testUserFlagCanBeSetOff (88ms)
    √ testCantRenounce (149ms)
    √ testCantTransfer (107ms)

  14 passing (4s)
```      
The tests are all written in Solidity and are explained in the tables below:

### Test Contract: TestJobRabbit
These tests are for the main contract [JobRabbit.sol](contracts/JobRabbit.sol). We expect some tests to revert (throw), so we use the technique described here https://bit.ly/2MipvxC for those cases (see comments in tests for more details).

| Test Function Name | Test Description |
| --- | --- |
| testCreateJob1() | Test we can create a job ok. Call this jobId 1. This job wehave its submission approved. |
| testCreateSubmission1() | Test we can create a submission ok for jobId 1. |
| testAcceptSubmission1() | Test we can **accept** a submission ok for jobId 1. |
| testCreateJob2() |  Test we can create another job ok. Call this jobId 2. This job will have its submission rejected. |
| testCreateSubmission2() | Test we can create a submission ok for jobId 2. |
| testRejectSubmission2() | Test we can **reject** a submission ok for jobId 2. |
| testUserCannotAcceptSubmissionBadJob()  | Check user cannot accept a submission for a non-existent job. This tests our array bounds check. |
| testUserCannotSetPanicMode() | Check user cannot engage panic mode (the emergency stop). This is because we are a test user, not the user who created the contract. |
| testUserCannotKillContract() | Check user cannot kill contract. |

### Test Contract: TestLibraryDemo
These tests are for the library demo contract [LibraryDemo.sol](contracts/LibraryDemo.sol).

| Test Function Name | Test Description |
| --- | --- |
| testUserFlagIsOff() | Test simple contract interactions. This test doesn't use library yet. |
| testUserFlagCanBeSetOn() | Test simple contract interactions. This test doesn't use library yet. |
| testUserFlagCanBeSetOff() | Test simple contract interactions. This test doesn't use library yet. |
| testCantRenounce() | Now test a library function. Test user cannot renounce contract (because they didn't create it). Notice renounceOwnership() doesn't exist in LibraryDemo.sol, it is from the OpenZeppelin Ownable.sol contract that we use as a library. |
| testCantTransfer() | Test another library function. Test user cannot transfer contract (because they didn't create it). Notice transferOwnership() doesn't exist in LibraryDemo.sol, it is from the OpenZeppelin Ownable.sol contract. |

# UI Test
This section describes how to test the UI. The UI design is modelled on the [Truffle Pet Shop Tutorial](https://truffleframework.com/tutorials/pet-shop) and uses lite-server. Before testing the UI it may be helpful for you to understand the **Job Lifecycle** which is explained in the [Overall Design & Job Lifecycle](/documentation/design_pattern_decisions#overall-design--job-lifecycle) section of the design patterns document.

To test the UI follow the steps below. You can email me on the email shown at the top of this document if you have any install issues.

## Check Pre-requisites
Ensure you have:
* Completed the install steps as described in [Install Dependencies](#install-dependencies).
* Started a `ganache-cli` chain and compiled the contracts as described in [Compile](#compile).
* Migrated the contracts to the ganache chain as described in [Migrate](#migrate).

## Start Browser and Configure MetaMask
Ensure you have your default web browser open and use MetaMask listening to local port 8545. You will need an account with some Ether to completely test the frontend UI. To achieve this:
* Open your browser and if you don't have MetaMask yet, then install it.
* Tell MetaMask to listen to local network port 8545 like this:

![MetaMask](/documentation/MetaMask_Local.jpg "MetaMask")

* To get Ether you can either:
  *  Option 1: Reset your whole MetaMask den with the seed words shown by ganache-cli. You'll see the seed words near the top in the terminal output shown when ganache-cli starts up.
  * Option 2: Import individual accounts into MetaMask using their private key. Again, you'll see the account private keys near the top in the terminal output shown when ganache-cli at start up

If you get stuck, the configuration steps needed are explained well in [a section of the Truffle Pet Shop Tutorial](https://truffleframework.com/tutorials/pet-shop#installing-and-configuring-metamask), with one important difference. In our case we want MetaMask to listen to port **8545** whilst the Truffle Pet Shop example asks to listen to port 7545.

## Start the dAPP Web UI
From a terminal, run `npm run dev`. You should see output like the below and a new page should open in your browser:
```
> npm run dev
> JobRabbit@1.0.0 dev C:\Users\kevin\Dropbox\Work\My Notes\Blockchain\Course Consensys\Final Project\JobRabbit_Draft
> lite-server
** browser-sync config **
{ injectChanges: false,
  files: [ './**/*.{html,htm,css,js}' ],
  watchOptions: { ignored: 'node_modules' },

...etc...

```
The new page you see in your browser is the dApp's web UI. This page is described in the next section.

## Interact with the UI
If at any time a UI change does not appear, then try refreshing the browser page. The web UI looks like this:
![dAppWebUI1](/documentation/ui1.jpg "Initial view of UI")

The top section shows the user's current address and any Ether they are due from the contract. Then there are fields to create a new job and submission. If you scroll down, after all the jobs are listed, there is a withdrawals button:

![dAppWebUI2](/documentation/ui2.jpg "Initial view of UI showing Withdrawal button")

Let's walk through an example of creating and approving a proposal:

### 1. Create Job
Create a job by entering a description and pressing the `Create Job` button. MetaMask should popup asking you to confirm the transaction:

![dAppWebUI3](/documentation/ui3.jpg "Confirming the Create Job transaction in MetaMask")

After the transaction is complete, refresh the browser and you will see a new row showing the job you created (in the screenshot below it is job Id 2):

![dAppWebUI4](/documentation/ui4.jpg "UI showing new job created")

### 2. Create Proposal
Create a proposal by entering the appropriate job ID and a description of the proposal:

![dAppWebUI5](/documentation/ui5.jpg "Ready to create a new work proposal")

Remember that a work proposal is someone saying "I have done the work" and proposing that the job owner accepts it.

MetaMask will popup as before asking for confirmation to make the transaction. Here I have found you have to sometimes increase the default proposed gas limit. If you **make gas limit 300000 always** then things should be fine.

After the proposal transaction is confirmed, refresh the browser. The proposal appears and **notice that the accept/reject buttons have become enabled**. These buttons are enabled because we are the job creator and can now accept or reject the work done:

![dAppWebUI6](/documentation/ui6.jpg "Accept the proposal")

### 3. Accept Proposal
The next step is to accept the proposal. Click the Accept button and confirm the transaction. Note that a **300000 gas limit** may be required instead of the MetaMask default. After the proposal is accepted, you can see that the `Ether Due` field has increased and that the job Id slot number 2 in the table is cleared out and shows status "Empty Slot", ready to receive a new job.

![dAppWebUI7](/documentation/ui7.jpg "After proposal accepted")

You can now continue playing with the UI as desired, creating jobs, proposals, then accepting or rejecting them, withdrawing funds and so on.

# Design
See [design_pattern_decisions.md](documentation/design_pattern_decisions.md) in the documentation folder.

# Security
See [avoiding_common_attacks.md](documentation/avoiding_common_attacks.md) in the documentation folder.

# Deployment to Rinkeby
The JobRabbit contract has been deployed to the `Rinkeby` test network. See [deployed_addresses.txt](documentation/deployed_addresses.txt) in the documentation folder.

# Use of a Library
See the [LibraryDemo.sol](contracts/LibraryDemo.sol) contract in the `contracts` folder. This contract shows how to use the [OpenZeppelin library contract](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol) called `Ownable.sol`.