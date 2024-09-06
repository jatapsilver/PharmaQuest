if (typeof Web3 !== 'undefined') {
    const web3 = new Web3(window.ethereum);

    function valueToken(number) {
        return number / Math.pow(10, 18);
    }

    async function getTokenBalancePill( walletAddress) {
        
        try {
            const balance = await await web3.eth.getBalance(walletAddress);
            const balancePill = valueToken(balance)
            document.getElementById('saldoTextPill').innerText = `  ${balancePill}`;
        } catch (error) {
            console.error("Error al obtener el balance del token:", error);
            document.getElementById('saldoTextPill').innerText = "Error al obtener el saldo.";
        }
    }

    async function getTokenBalanceKit(contractAddress, walletAddress) {
        
        const tokenABI = [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "name": "balance",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ];

        try {
            const kitContract = new web3.eth.Contract(tokenABI, contractAddress);
            const kitBalance = await kitContract.methods.balanceOf(walletAddress).call();
            const kitBalancePill = valueToken(kitBalance)
            document.getElementById('saldoTextKit').innerText = `Saldo Kit: ${kitBalancePill}`;
        } catch (error) {
            console.error("Error al obtener el balance del kit:", error);
            document.getElementById('saldoTextKit').innerText = "Error al obtener el saldo del kit.";
        }
    }
        
    document.getElementById('solicitudSaldoButton').addEventListener('click', async () => {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const walletAddress = accounts[0];
            const contractAddress = "0xB170f6D3B58a6500A6BC3Ff71AcDAb9F663dbed7"

            getTokenBalancePill(walletAddress);
            getTokenBalanceKit(contractAddress, walletAddress)
        } catch (error) {
            console.error("Error al conectar con la billetera:", error);
            document.getElementById('saldoText').innerText = "Error al conectar con la billetera.";
        }

    });

} else {
    console.error('Web3 no está disponible en este navegador.');
    document.getElementById('saldoText').innerText = "Web3 no está disponible en este navegador.";
}
