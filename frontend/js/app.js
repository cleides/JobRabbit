App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache-cli
      // this is insecure and not suitable for production
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:8545"
      );
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("JobRabbit.json", function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var JobRabbitArtifact = data;
      App.contracts.JobRabbit = TruffleContract(JobRabbitArtifact);

      // Set the provider for our contract
      App.contracts.JobRabbit.setProvider(App.web3Provider);

      // Use our contract to refresh the UI to reflect contract state
      return App.refreshPageFromContract();
    });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on("click", ".btn-createjob", App.handleCreateJob);
    $(document).on("click", ".btn-createproposal", App.handleCreateProposal);
    $(document).on("click", ".btn-withdraw", App.handleWithdraw);
    $(document).on("click", ".btn-accept", App.handleAccept);
    $(document).on("click", ".btn-reject", App.handleReject);
  },

  refreshPageFromContract: function(adopters, account) {
    var jobRabbitInstance;
    App.contracts.JobRabbit.deployed()
      .then(function(instance) {
        jobRabbitInstance = instance;
        var myaccount = web3.eth.accounts[0];
        $("#currentAddress").html("&nbsp;" + myaccount);
        // how much ether is this account due?
        return jobRabbitInstance.getJobHunterWithdrawalAmount.call();
      })
      .then(function(dueAmount) {
        var dueAmountEther = web3.fromWei(dueAmount, "ether");
        $("#currentAddressWei").text(dueAmountEther);
        // refresh all data fields
        // call getJobDetail for 0 to 19
        return jobRabbitInstance.getJobDetail.call(0);
      })
      .then(function(jobDet0) {
        var jDetails = jobDet0[0];
        var jStatus = jobDet0[1];
        var jOwner = jobDet0[2];
        var jValue = web3.fromWei(jobDet0[3], "ether");
        var sEvidence = jobDet0[4];
        var sOwner = jobDet0[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row0_jobdesc").text(jDetails);
        $("#row0_jobstat").text(jStatusTxt);
        $("#row0_jobvalue").text(jValue);
        $("#row0_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#0accept").prop("disabled", false);
          $("#0reject").prop("disabled", false);
        } else {
          $("#0accept").prop("disabled", true);
          $("#0reject").prop("disabled", true);
        }
        return jobRabbitInstance.getJobDetail.call(1);
      })
      .then(function(jobDet1) {
        var jDetails = jobDet1[0];
        var jStatus = jobDet1[1];
        var jOwner = jobDet1[2];
        var jValue = web3.fromWei(jobDet1[3], "ether");
        var sEvidence = jobDet1[4];
        var sOwner = jobDet1[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row1_jobdesc").text(jDetails);
        $("#row1_jobstat").text(jStatusTxt);
        $("#row1_jobvalue").text(jValue);
        $("#row1_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#1accept").prop("disabled", false);
          $("#1reject").prop("disabled", false);
        } else {
          $("#1accept").prop("disabled", true);
          $("#1reject").prop("disabled", true);
        }
        return jobRabbitInstance.getJobDetail.call(2);
      })
      .then(function(jobDet2) {
        var jDetails = jobDet2[0];
        var jStatus = jobDet2[1];
        var jOwner = jobDet2[2];
        var jValue = web3.fromWei(jobDet2[3], "ether");
        var sEvidence = jobDet2[4];
        var sOwner = jobDet2[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row2_jobdesc").text(jDetails);
        $("#row2_jobstat").text(jStatusTxt);
        $("#row2_jobvalue").text(jValue);
        $("#row2_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#2accept").prop("disabled", false);
          $("#2reject").prop("disabled", false);
        } else {
          $("#2accept").prop("disabled", true);
          $("#2reject").prop("disabled", true);
        }
        return jobRabbitInstance.getJobDetail.call(3);
      })
      .then(function(jobDet3) {
        var jDetails = jobDet3[0];
        var jStatus = jobDet3[1];
        var jOwner = jobDet3[2];
        var jValue = web3.fromWei(jobDet3[3], "ether");
        var sEvidence = jobDet3[4];
        var sOwner = jobDet3[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row3_jobdesc").text(jDetails);
        $("#row3_jobstat").text(jStatusTxt);
        $("#row3_jobvalue").text(jValue);
        $("#row3_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#3accept").prop("disabled", false);
          $("#3reject").prop("disabled", false);
        } else {
          $("#3accept").prop("disabled", true);
          $("#3reject").prop("disabled", true);
        }
        return jobRabbitInstance.getJobDetail.call(4);
      })
      .then(function(jobDet4) {
        var jDetails = jobDet4[0];
        var jStatus = jobDet4[1];
        var jOwner = jobDet4[2];
        var jValue = web3.fromWei(jobDet4[3], "ether");
        var sEvidence = jobDet4[4];
        var sOwner = jobDet4[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row4_jobdesc").text(jDetails);
        $("#row4_jobstat").text(jStatusTxt);
        $("#row4_jobvalue").text(jValue);
        $("#row4_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#4accept").prop("disabled", false);
          $("#4reject").prop("disabled", false);
        } else {
          $("#4accept").prop("disabled", true);
          $("#4reject").prop("disabled", true);
        }
        return jobRabbitInstance.getJobDetail.call(5);
      })
      .then(function(jobDet5) {
        var jDetails = jobDet5[0];
        var jStatus = jobDet5[1];
        var jOwner = jobDet5[2];
        var jValue = web3.fromWei(jobDet5[3], "ether");
        var sEvidence = jobDet5[4];
        var sOwner = jobDet5[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row5_jobdesc").text(jDetails);
        $("#row5_jobstat").text(jStatusTxt);
        $("#row5_jobvalue").text(jValue);
        $("#row5_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#5accept").prop("disabled", false);
          $("#5reject").prop("disabled", false);
        } else {
          $("#5accept").prop("disabled", true);
          $("#5reject").prop("disabled", true);
        }
        return jobRabbitInstance.getJobDetail.call(6);
      })
      .then(function(jobDet6) {
        var jDetails = jobDet6[0];
        var jStatus = jobDet6[1];
        var jOwner = jobDet6[2];
        var jValue = web3.fromWei(jobDet6[3], "ether");
        var sEvidence = jobDet6[4];
        var sOwner = jobDet6[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row6_jobdesc").text(jDetails);
        $("#row6_jobstat").text(jStatusTxt);
        $("#row6_jobvalue").text(jValue);
        $("#row6_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#6accept").prop("disabled", false);
          $("#6reject").prop("disabled", false);
        } else {
          $("#6accept").prop("disabled", true);
          $("#6reject").prop("disabled", true);
        }
        return jobRabbitInstance.getJobDetail.call(7);
      })
      .then(function(jobDet7) {
        var jDetails = jobDet7[0];
        var jStatus = jobDet7[1];
        var jOwner = jobDet7[2];
        var jValue = web3.fromWei(jobDet7[3], "ether");
        var sEvidence = jobDet7[4];
        var sOwner = jobDet7[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row7_jobdesc").text(jDetails);
        $("#row7_jobstat").text(jStatusTxt);
        $("#row7_jobvalue").text(jValue);
        $("#row7_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#7accept").prop("disabled", false);
          $("#7reject").prop("disabled", false);
        } else {
          $("#7accept").prop("disabled", true);
          $("#7reject").prop("disabled", true);
        }
        return jobRabbitInstance.getJobDetail.call(8);
      })
      .then(function(jobDet8) {
        var jDetails = jobDet8[0];
        var jStatus = jobDet8[1];
        var jOwner = jobDet8[2];
        var jValue = web3.fromWei(jobDet8[3], "ether");
        var sEvidence = jobDet8[4];
        var sOwner = jobDet8[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row8_jobdesc").text(jDetails);
        $("#row8_jobstat").text(jStatusTxt);
        $("#row8_jobvalue").text(jValue);
        $("#row8_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#8accept").prop("disabled", false);
          $("#8reject").prop("disabled", false);
        } else {
          $("#8accept").prop("disabled", true);
          $("#8reject").prop("disabled", true);
        }
        return jobRabbitInstance.getJobDetail.call(9);
      })
      .then(function(jobDet9) {
        var jDetails = jobDet9[0];
        var jStatus = jobDet9[1];
        var jOwner = jobDet9[2];
        var jValue = web3.fromWei(jobDet9[3], "ether");
        var sEvidence = jobDet9[4];
        var sOwner = jobDet9[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row9_jobdesc").text(jDetails);
        $("#row9_jobstat").text(jStatusTxt);
        $("#row9_jobvalue").text(jValue);
        $("#row9_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#9accept").prop("disabled", false);
          $("#9reject").prop("disabled", false);
        } else {
          $("#9accept").prop("disabled", true);
          $("#9reject").prop("disabled", true);
        }
        return jobRabbitInstance.getJobDetail.call(9);
      })
      .then(function(jobDet10) {
        var jDetails = jobDet10[0];
        var jStatus = jobDet10[1];
        var jOwner = jobDet10[2];
        var jValue = web3.fromWei(jobDet10[3], "ether");
        var sEvidence = jobDet10[4];
        var sOwner = jobDet10[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row10_jobdesc").text(jDetails);
        $("#row10_jobstat").text(jStatusTxt);
        $("#row10_jobvalue").text(jValue);
        $("#row10_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#10accept").prop("disabled", false);
          $("#10reject").prop("disabled", false);
        } else {
          $("#10accept").prop("disabled", true);
          $("#10reject").prop("disabled", true);
        }
        return jobRabbitInstance.getJobDetail.call(11);
      })
      .then(function(jobDet11) {
        var jDetails = jobDet11[0];
        var jStatus = jobDet11[1];
        var jOwner = jobDet11[2];
        var jValue = web3.fromWei(jobDet11[3], "ether");
        var sEvidence = jobDet11[4];
        var sOwner = jobDet11[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row11_jobdesc").text(jDetails);
        $("#row11_jobstat").text(jStatusTxt);
        $("#row11_jobvalue").text(jValue);
        $("#row11_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#11accept").prop("disabled", false);
          $("#11reject").prop("disabled", false);
        } else {
          $("#11accept").prop("disabled", true);
          $("#11reject").prop("disabled", true);
        }
        return jobRabbitInstance.getJobDetail.call(12);
      })
      .then(function(jobDet12) {
        var jDetails = jobDet12[0];
        var jStatus = jobDet12[1];
        var jOwner = jobDet12[2];
        var jValue = web3.fromWei(jobDet12[3], "ether");
        var sEvidence = jobDet12[4];
        var sOwner = jobDet12[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row12_jobdesc").text(jDetails);
        $("#row12_jobstat").text(jStatusTxt);
        $("#row12_jobvalue").text(jValue);
        $("#row12_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#12accept").prop("disabled", false);
          $("#12reject").prop("disabled", false);
        } else {
          $("#12accept").prop("disabled", true);
          $("#12reject").prop("disabled", true);
        }
        return jobRabbitInstance.getJobDetail.call(13);
      })
      .then(function(jobDet13) {
        var jDetails = jobDet13[0];
        var jStatus = jobDet13[1];
        var jOwner = jobDet13[2];
        var jValue = web3.fromWei(jobDet13[3], "ether");
        var sEvidence = jobDet13[4];
        var sOwner = jobDet13[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row13_jobdesc").text(jDetails);
        $("#row13_jobstat").text(jStatusTxt);
        $("#row13_jobvalue").text(jValue);
        $("#row13_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#13accept").prop("disabled", false);
          $("#13reject").prop("disabled", false);
        } else {
          $("#13accept").prop("disabled", true);
          $("#13reject").prop("disabled", true);
        }
        return jobRabbitInstance.getJobDetail.call(14);
      })
      .then(function(jobDet14) {
        var jDetails = jobDet14[0];
        var jStatus = jobDet14[1];
        var jOwner = jobDet14[2];
        var jValue = web3.fromWei(jobDet14[3], "ether");
        var sEvidence = jobDet14[4];
        var sOwner = jobDet14[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row14_jobdesc").text(jDetails);
        $("#row14_jobstat").text(jStatusTxt);
        $("#row14_jobvalue").text(jValue);
        $("#row14_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#14accept").prop("disabled", false);
          $("#14reject").prop("disabled", false);
        } else {
          $("#14accept").prop("disabled", true);
          $("#14reject").prop("disabled", true);
        }
        return jobRabbitInstance.getJobDetail.call(15);
      })
      .then(function(jobDet15) {
        var jDetails = jobDet15[0];
        var jStatus = jobDet15[1];
        var jOwner = jobDet15[2];
        var jValue = web3.fromWei(jobDet15[3], "ether");
        var sEvidence = jobDet15[4];
        var sOwner = jobDet15[5];
        var jStatusTxt = "Empty Slot";
        if (jStatus == 1) {
          jStatusTxt = "Job Advertised";
        }
        if (jStatus == 2) {
          jStatusTxt = "Work Completed";
        }
        $("#row15_jobdesc").text(jDetails);
        $("#row15_jobstat").text(jStatusTxt);
        $("#row15_jobvalue").text(jValue);
        $("#row15_jobprop").text(sEvidence);
        // only do this if job owner (could be address 0x) != current address
        // thats what tells us what ones are ours, but could also add a badge?
        if (web3.eth.accounts[0] == jOwner && sEvidence !== "") {
          $("#15accept").prop("disabled", false);
          $("#15reject").prop("disabled", false);
        } else {
          $("#15accept").prop("disabled", true);
          $("#15reject").prop("disabled", true);
        }
        // DONE. For more rows repeat pattern as above: return jobRabbitInstance.getJobDetail.call(16);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  handleCreateJob: function(event) {
    event.preventDefault();
    var jobRabbitInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.JobRabbit.deployed()
        .then(function(instance) {
          jobRabbitInstance = instance;
          return jobRabbitInstance.createJob($("#CreateJob").val(), {
            from: account,
            value: web3.toWei($("#CreateJobEther").val(), "ether")
          });
        })
        .then(function(result) {
          return App.refreshPageFromContract();
        })
        .catch(function(err) {
          console.log(err.message);
        });
    });
  },

  handleCreateProposal: function(event) {
    event.preventDefault();
    var jobRabbitInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.JobRabbit.deployed()
        .then(function(instance) {
          jobRabbitInstance = instance;
          return jobRabbitInstance.createSubmission(
            $("#CreateProposalJobId").val(),
            $("#CreateProposalDetails").val(),
            { from: account }
          );
        })
        .then(function(result) {
          return App.refreshPageFromContract();
        })
        .catch(function(err) {
          console.log(err.message);
        });
    });
  },

  handleAccept: function(event) {
    event.preventDefault();
    var jobId = parseInt($(event.target).data("id"));
    var jobRabbitInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.JobRabbit.deployed()
        .then(function(instance) {
          jobRabbitInstance = instance;
          return jobRabbitInstance.acceptSubmission(jobId, {
            from: account
          });
        })
        .then(function(result) {
          return App.refreshPageFromContract();
        })
        .catch(function(err) {
          console.log(err.message);
        });
    });
  },

  handleReject: function(event) {
    event.preventDefault();
    var jobId = parseInt($(event.target).data("id"));
    var jobRabbitInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.JobRabbit.deployed()
        .then(function(instance) {
          jobRabbitInstance = instance;
          return jobRabbitInstance.rejectSubmission(jobId, {
            from: account
          });
        })
        .then(function(result) {
          return App.refreshPageFromContract();
        })
        .catch(function(err) {
          console.log(err.message);
        });
    });
  },

  handleWithdraw: function(event) {
    event.preventDefault();
    var jobRabbitInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.JobRabbit.deployed()
        .then(function(instance) {
          jobRabbitInstance = instance;
          return jobRabbitInstance.jobHunterWithdrawal({
            from: account
          });
        })
        .then(function(result) {
          return App.refreshPageFromContract();
        })
        .catch(function(err) {
          console.log(err.message);
        });
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
