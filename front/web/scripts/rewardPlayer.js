window.addEventListener('load', async () => {

    if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
        const web3 = new Web3(window.ethereum);

        try {

            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error("El usuario denegó el acceso a la cuenta.");
            return;
        }


        const liquidityContractAddress = '0x8626f1cE9A0f6059Ca191890789522d85F4e1952'; 

        const liquidityContractABI = [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "type": "function"
            }
        ];


        const liquidityContract = new web3.eth.Contract(liquidityContractABI, liquidityContractAddress);

        async function rewardPlayer(playerAddress, tokenAmount) {
            try {

                const data = liquidityContract.methods.transfer(playerAddress, tokenAmount).encodeABI();

                const tx = {
                    to: liquidityContractAddress,
                    gas: 2000000,
                    data: data
                };

                const receipt = await web3.eth.sendTransaction(tx);

                console.log('Transaction receipt:', receipt);
            } catch (error) {
                console.error('Error enviando la transacción:', error);
            }
        }

        document.getElementById('enviarRecompensaButton').addEventListener('click', () => {
            const pillAmount = document.getElementById('pillInput').value;
            const kitAmount = document.getElementById('kitInput').value;
            const playerAddress = ethereum.selectedAddress; 

            if (playerAddress) {
                let promises = [];


                if (pillAmount) {
                    promises.push(rewardPlayer(playerAddress, pillAmount));
                }


                if (kitAmount) {
                    promises.push(rewardPlayer(playerAddress, kitAmount));
                }


                Promise.all(promises)
                    .then(() => {
                        alert('Las recompensas han sido enviadas.');
                    })
                    .catch(error => {
                        console.error('Error en el envío de recompensas:', error);
                    });
            } else {
                alert('Por favor, asegúrate de que estás conectado a MetaMask y de llenar todos los campos correctamente.');
            }
        });

    } else {
        console.error('No se encontró ningún proveedor de web3. Instala MetaMask.');
    }
});
