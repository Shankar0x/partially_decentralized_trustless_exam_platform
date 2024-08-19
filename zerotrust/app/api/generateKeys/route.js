import { User, Questions } from '@/models/user';

export async function POST(request) {
    const requestData = await request.json();
    const { eno, publicKey } = requestData;

    if (!eno || !publicKey) {
        return new Response(JSON.stringify({ error: "Enrollment number or public key not provided" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        let user = await User.findOne({ eno: eno });

        if (!user) {
            return new Response(JSON.stringify({ error: "Enrollment number not found in database" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        user.pubkey = publicKey;
        await user.save();

        const response = {
            eno: eno,
            publicKey: publicKey,
            message: "Public key stored successfully"
        };

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
