import dotenv from "dotenv";
dotenv.config()
import * as web3 from "@solana/web3.js";
import * as web3Helper from "@solana-developers/helpers";

/**
 * TODO:
 * Go ahead and create a script from scratch that will allow you 
 * to transfer SOL from one account to another on Devnet. 
 * Be sure to print out the transaction signature so you can 
 * look at it on Solana Explorer.
 */

const keyPair = web3Helper.getKeypairFromEnvironment("SECRET_KEY"); // keypair of sender
if (!process.argv[2]) {
    console.error("Recipient public key not provided!");
    process.exit(1);
}

const recipientPubKey = process.argv[2];
const toPubKey = new web3.PublicKey(recipientPubKey);

const totalSolToTransfer = 1 * web3.LAMPORTS_PER_SOL;

const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");


// Create a system program instruction.
const transferInstruction = web3.SystemProgram.transfer({
    fromPubkey: keyPair.publicKey,
    toPubkey: toPubKey,
    lamports: totalSolToTransfer
});

const transaction = new web3.Transaction().add(transferInstruction);

const signature = await web3.sendAndConfirmTransaction(connection, transaction, [
        keyPair
]);


console.log(`Confirmed transfer of ${totalSolToTransfer / web3.LAMPORTS_PER_SOL} SOL, got signature ${signature}`);