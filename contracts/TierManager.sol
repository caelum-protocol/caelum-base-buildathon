// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IBurnTracker {
    function getBurned(address user) external view returns (uint256);
}

contract TierManager is Ownable {
    enum Tier {
        Seeker,
        Inscriber,
        Forger,
        Soulwright,
        Ascendant,
        Guardian
    }

    IERC20 public caelumToken;
    IBurnTracker public burnTracker;

    mapping(address => uint256) public stakedAmount;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);

    constructor(address _caelumToken, address _burnTracker) Ownable(msg.sender) {
        caelumToken = IERC20(_caelumToken);
        burnTracker = IBurnTracker(_burnTracker);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be > 0");
        require(caelumToken.transferFrom(msg.sender, address(this), amount), "Stake failed");

        stakedAmount[msg.sender] += amount;
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(amount > 0, "Amount must be > 0");
        require(stakedAmount[msg.sender] >= amount, "Insufficient stake");

        stakedAmount[msg.sender] -= amount;
        require(caelumToken.transfer(msg.sender, amount), "Unstake failed");
        emit Unstaked(msg.sender, amount);
    }

    function getTier(address user) public view returns (Tier) {
        uint256 staked = stakedAmount[user];
        uint256 burned = burnTracker.getBurned(user);

        if (staked >= 10000 ether && burned >= 10000 ether) {
            return Tier.Guardian;
        } else if (staked >= 5000 ether && burned >= 6000 ether) {
            return Tier.Ascendant;
        } else if (staked >= 2000 ether && burned >= 3000 ether) {
            return Tier.Soulwright;
        } else if (staked >= 1000 ether || burned >= 1500 ether) {
            return Tier.Forger;
        } else if (staked >= 500 ether || burned >= 750 ether) {
            return Tier.Inscriber;
        } else {
            return Tier.Seeker;
        }
    }


    function getStaked(address user) external view returns (uint256) {
        return stakedAmount[user];
    }

    function withdrawTokens(address to, uint256 amount) external onlyOwner {
        caelumToken.transfer(to, amount);
    }
}
