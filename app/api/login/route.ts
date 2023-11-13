import supabase from "@/src/provide/supabase";
import { NextResponse } from "next/server";
import { compare } from "bcrypt"
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email, password } = body;
		// Check if the username or email already exists
		const { data, error: queryError } = await supabase
			.from('users')
			.select()
			.eq("email", email);

		if (queryError) {
			console.error('Error checking for existing user:', queryError);
			throw new Error('Query Error Server Error');
		}


		if (data && data.length > 0) {

			const validPassword = await compare(password, data.password);
			if (!validPassword) {
				return NextResponse.json({ success: false, error: 'invalid password' })
			}
			return NextResponse.json({ success: true, user: data });
		};
		throw new Error('User doesnt exist');


	} catch (error) {
		console.error('Unhandled error:', error);
		return NextResponse.json({ success: false, error: 'Internal Server Error' });
	}
}
