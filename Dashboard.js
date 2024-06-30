import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import Vesting from '../artifacts/contracts/Vesting.json';

const AdminDashboard = () => {
    const { library } = useWeb3React();
    const [stakeholder, setStakeholder] = useState('');
    const [amount, setAmount] = useState('');
    const [releaseTime, setReleaseTime] = useState('');

    const handleRegisterStakeholder = async () => {
        const signer = library.getSigner();
        const vestingContract = new ethers.Contract('VESTING_CONTRACT_ADDRESS', Vesting.abi, signer);

        await vestingContract.registerStakeholder(stakeholder, ethers.utils.parseUnits(amount, 18), releaseTime);
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <input
                type="text"
                placeholder="Stakeholder Address"
                value={stakeholder}
                onChange={(e) => setStakeholder(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                type="number"
                placeholder="Release Time (Unix Timestamp)"
                value={releaseTime}
                onChange={(e) => setReleaseTime(e.target.value)}
            />
            <button onClick={handleRegisterStakeholder}>Register Stakeholder</button>
        </div>
    );
};

export default AdminDashboard;
