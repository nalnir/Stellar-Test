import StellarSdk from 'stellar-sdk';

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var transaction;

export const generateRandomKeypair = (callback) => {
    const pair = StellarSdk.Keypair.random();
    fundTestAccount(pair).then((value)=>{
        callback(value)
    })
};

export const fundTestAccount = async (pair) => {
    try {
        const response = await fetch(
          `https://friendbot.stellar.org?addr=${encodeURIComponent(
            pair.publicKey(),
          )}`,
        );
        const responseJSON = await response.json();
        var encryptedKeyPair = {
            public: pair.publicKey(),
            secret: pair.secret()
        }
        localStorage.setItem('stellar_test_account_encrypted', JSON.stringify(encryptedKeyPair));
        console.log('SUCCESS! You have a new account :)\n', responseJSON);
        return 'success';
      } catch (e) {
        console.error('ERROR!', e);
        return {severity: 'error', message: 'ERROR! Could not create the account.'}
      }
}

export const sendLumens = (sourceKeys, lumenAmount, destinationId, callback) => {
    var sourceKeyFromSecret = StellarSdk.Keypair.fromSecret(
        sourceKeys.secret,
    );
    server
        .loadAccount(destinationId)
        // If the account is not found, surface a nicer error message for logging.
        .catch(function (error) {
            if (error instanceof StellarSdk.NotFoundError) {
                callback({ severity: 'error', message: 'The destination account does not exist!' })
                throw new Error('The destination account does not exist!');
            } else {
                callback({ severity: 'error', message: 'Could not find the account!' })
                return 'error';
            }
        })
        // If there was no error, load up-to-date information on your account.
        .then(function () {
            return server.loadAccount(sourceKeyFromSecret.publicKey());
        })
        .then((sourceAccount) => {
            // Start building the transaction.
            transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET,
            })
            .addOperation(
                StellarSdk.Operation.payment({
                destination: destinationId,
                // Because Stellar allows transaction in many currencies, you must
                // specify the asset type. The special 'native' asset represents Lumens.
                asset: StellarSdk.Asset.native(),
                amount: lumenAmount,
                }),
            )
            // A memo allows you to add your own metadata to a transaction. It's
            // optional and does not affect how Stellar treats the transaction.
            .addMemo(StellarSdk.Memo.text('Test Transaction'))
            // Wait a maximum of three minutes for the transaction
            .setTimeout(180)
            .build();
            // Sign the transaction to prove you are actually the person sending it.
            transaction.sign(sourceKeyFromSecret);
            // And finally, send it off to Stellar!
            return server.submitTransaction(transaction);
        })
        .then((result) => {
            console.log('Success! Results:', result);
            callback({ severity: 'success', message: 'Successfully sent!' })
        })
        .catch((error) => {
            console.error('Something went wrong!', error);
            callback({ severity: 'error', message: 'Something went wrong!' })
            // If the result is unknown (no response body, timeout etc.) we simply resubmit
            // already built transaction:
            // server.submitTransaction(transaction);
        });
};

