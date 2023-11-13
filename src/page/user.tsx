import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export default function User() {

	return (
		<div>
			<Button onClick={() => signIn()}>SingIn</Button>
			<Button onClick={() => signOut()}>SingIn</Button>
			<Button onClick={() => signUp()}>SingIn</Button>
		</div>
	)
}
