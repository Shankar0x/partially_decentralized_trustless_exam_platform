import { Keypair } from "@solana/web3.js";
import UserModel from "@/models/user";

export async function POST(request) {
    const requestData = await request.json();
    const eno = requestData.eno;

    if (!eno) {
        return new Response(JSON.stringify({ error: "Enrollment number not provided" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        // Check if eno exists in MongoDB
        let user = await UserModel.findOne({ eno: eno });

        if (!user) {
            return new Response(JSON.stringify({ error: "Enrollment number not found in database" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Generate Solana keypair
        const keypair = Keypair.generate();
        const publicKey = keypair.publicKey.toBase58();
        const privateKey = Buffer.from(keypair.secretKey).toString('base64');

        user.pubkey = publicKey;
        await user.save();

        const response = {
            eno: eno,
            publicKey: publicKey,
            privateKey: privateKey,
            message: "Solana keypair generated and stored successfully"
        };

        console.log("Public Key:", publicKey);
        console.log("Private Key:", privateKey);
        console.log("Enrollment Number:", eno);

        return new Response(JSON.stringify(response), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error searching for enrollment number in database or saving pubkey:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
