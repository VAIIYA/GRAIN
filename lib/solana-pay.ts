import {
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';
import {
    getAssociatedTokenAddress,
    createTransferCheckedInstruction,
    getMint,
    TOKEN_PROGRAM_ID
} from '@solana/spl-token';

// Devnet USDC Mint Address
export const USDC_MINT = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYJJ1qZ6qcSu');
export const PLATFORM_WALLET = new PublicKey('2DmYGqwgbm2Axygs6jHj63kxYT24eE72XoqLaJe4mS9e'); // Correct platform wallet

export async function createUSDCPaymentTransaction(
    connection: Connection,
    sender: PublicKey,
    recipient: PublicKey,
    amount: number
) {
    const mintInfo = await getMint(connection, USDC_MINT);
    const senderATA = await getAssociatedTokenAddress(USDC_MINT, sender);
    const recipientATA = await getAssociatedTokenAddress(USDC_MINT, recipient);

    const transaction = new Transaction().add(
        createTransferCheckedInstruction(
            senderATA,
            USDC_MINT,
            recipientATA,
            sender,
            amount * Math.pow(10, mintInfo.decimals),
            mintInfo.decimals,
            [],
            TOKEN_PROGRAM_ID
        )
    );

    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = sender;

    return transaction;
}
