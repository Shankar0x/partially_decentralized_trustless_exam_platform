import { Keypair } from "@solana/web3.js";

export async function GET(request) {
    const keypair = Keypair.generate();

    const response = {
        publicKey: keypair.publicKey.toBase58(),
        privateKey: Buffer.from(keypair.secretKey).toString('base64')
    };

    return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' },
    });
}
