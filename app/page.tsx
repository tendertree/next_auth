"use client"
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			This is home page
			<Button onClick={() => signIn()} > singin</Button>
		</main >
	)
}
