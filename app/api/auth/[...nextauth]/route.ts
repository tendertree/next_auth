import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

import { createClient } from '@supabase/supabase-js'
import { compare } from "bcrypt";
import supabase from "@/src/provide/supabase";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({

	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				console.log(credentials);

				try {
					console.log("email find");
					console.log(credentials?.email);


					const { data, error: queryError } = await supabase
						.from('users')
						.select()
						.eq("email", credentials?.email);
					if (queryError) {
						console.error('Error checking for existing user:', queryError);
						throw new Error('Query Error Server Error');
					}
					if (data[0] && data.length > 0) {

						console.log(data);
						console.log(credentials);



						const validPassword = await compare(credentials?.password, data[0].password);

						if (!validPassword) {
							console.log("invalid password");
							return null
						}
						console.log("login succesd");

						return {
							id: data[0].id,
							email: data[0].email,
						};
					};
					console.log("user dosen't exist");
					return null;


				} catch (error) {
					console.error('error happend', error);
					return null;
				}
			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",

		}),
	],
	session: {
		strategy: "jwt",
	},
	secret:
		"3cc80b75056bd4ab892c977d6b9f7bd2bab0d52e487254463522a09e6f116c1b69a1d8f31ea5100e2efbffc2840f43d1",
	pages: {
		// I want users to be directed here with error passed in query string as ?error=
		error: "/error",
		signIn: "/signin"
	},

})

export { handler as GET, handler as POST }

