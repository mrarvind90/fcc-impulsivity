import { Metadata } from 'next';
import { Session, getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@app/api/auth/[...nextauth]/route';

import FormSubmitButton from '@components/client/FormSubmitButton';

import { prisma } from '@lib/db/prisma';

export const metadata: Metadata = {
	title: 'Add Product - Impulsivity',
};

export default async function AddProductPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/api/auth/signin?callbackUrl=/add-product');
	}

	async function addProduct(formData: FormData) {
		'use server';

		const session: Session | null = await getServerSession(authOptions);

		if (!session) {
			redirect('/api/auth/signin?callbackUrl=/add-product');
		}

		const name: string | undefined = formData.get('name')?.toString();
		const description: string | undefined = formData.get('description')?.toString();
		const imageUrl: string | undefined = formData.get('imageUrl')?.toString();
		const price: number = Number(formData.get('price') || 0);

		if (!name || !description || !imageUrl || !price) {
			throw Error('Missing required fields!');
		}

		await prisma.product.create({
			data: {
				name,
				description,
				imageUrl,
				price,
			},
		});

		redirect('/');
	}

	return (
		<div>
			<h1 className="mb-3 text-lg font-bold">Add Product</h1>
			<form action={addProduct}>
				<input
					required
					name="name"
					type="text"
					placeholder="Name"
					className="input input-bordered mb-3 w-full"
				/>
				<textarea
					required
					name="description"
					placeholder="Description"
					className="textarea textarea-bordered mb-3 w-full"
				/>
				<input
					required
					name="imageUrl"
					type="url"
					placeholder="Image URL"
					className="input input-bordered mb-3 w-full"
				/>
				<input
					required
					name="price"
					type="number"
					placeholder="Price"
					className="input input-bordered mb-3 w-full"
				/>
				<FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
			</form>
		</div>
	);
}
