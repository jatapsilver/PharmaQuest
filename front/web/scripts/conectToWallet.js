if (window.avalanche) {
    console.log('Avalanche Core Wallet está instalada');
} else {
    console.log('Avalanche Core Wallet no está instalada. Por favor, instálala para continuar.');
}

async function connectCoreWallet() {
    // Verifica si la wallet Core de Avalanche está instalada
    if (window.avalanche || window.ethereum) {
        try {
            // Solicita al usuario que conecte su wallet
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            
            // Obtiene la primera cuenta (dirección de la wallet)
            const account = accounts[0];
            
            // Formatea la dirección para mostrar los primeros y últimos 4 caracteres
            const formattedAccount = `${account.slice(0, 4)}...${account.slice(-4)}`;
            
            // Actualiza el texto del botón con la dirección formateada
            const connectButton = document.getElementById('connectButton');
            connectButton.innerText = `Connected: ${formattedAccount}`;
            
            // Opcional: Guarda la dirección en una variable o estado global si necesitas usarla en otras partes de la aplicación
            console.log('Connected account:', account);
        } catch (error) {
            console.error('User rejected the request:', error);
        }
    } else {
        alert('Please install the Avalanche Core Wallet to use this feature.');
    }
}
