import { Session, getServerSession } from 'next-auth';
import { cookies } from 'next/headers';

import { Cart, CartItem, Prisma } from '@prisma/client';

import { authOptions } from '@app/api/auth/[...nextauth]/route';

import { prisma } from '@lib/db/prisma';

export type CartWithProducts = Prisma.CartGetPayload<{
	include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
	include: { product: true };
}>;

export type ShoppingCart = CartWithProducts & {
	size: number;
	subTotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
	const session: Session | null = await getServerSession(authOptions);

	let cart: CartWithProducts | null;

	if (session) {
		cart = await prisma.cart.findFirst({
			where: { userId: session.user.id },
			include: { items: { include: { product: true } } },
		});
	} else {
		const localCartId: string | undefined = cookies().get('localCartId')?.value;
		cart = localCartId
			? await prisma.cart.findUnique({
					where: { id: localCartId },
					include: { items: { include: { product: true } } },
				})
			: null;
	}

	if (!cart) {
		return null;
	}

	return {
		...cart,
		size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
		subTotal: cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
	};
}

export async function createCart(): Promise<ShoppingCart> {
	const session: Session | null = await getServerSession(authOptions);

	let newCart: Cart;

	if (session) {
		newCart = await prisma.cart.create({
			data: { userId: session.user.id },
		});
	} else {
		newCart = await prisma.cart.create({
			data: {},
		});

		// NOTE: In production, we need to ensure that we encrypt the localCartId
		cookies().set('localCartId', newCart.id);
	}

	return {
		...newCart,
		items: [],
		size: 0,
		subTotal: 0,
	};
}

export async function mergeAnonymousCartIntoUserCart(userId: string) {
	const localCartId: string | undefined = cookies().get('localCartId')?.value;
	const localCart = localCartId
		? await prisma.cart.findUnique({
				where: { id: localCartId },
				include: { items: true },
			})
		: null;

	if (!localCart) return;

	const userCart = await prisma.cart.findFirst({
		where: { userId },
		include: { items: true },
	});

	await prisma.$transaction(async (tx) => {
		if (userCart) {
			const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

			await tx.cartItem.deleteMany({
				where: { cartId: userCart.id },
			});

			await tx.cart.update({
				where: { id: userCart.id },
				data: {
					items: {
						createMany: {
							data: mergedCartItems.map((item) => ({
								productId: item.productId,
								quantity: item.quantity,
							})),
						},
					},
				},
			});
		} else {
			await tx.cart.create({
				data: {
					userId,
					items: {
						createMany: {
							data: localCart.items.map((item) => ({
								productId: item.productId,
								quantity: item.quantity,
							})),
						},
					},
				},
			});
		}

		await tx.cart.delete({
			where: { id: localCart.id },
		});

		cookies().set('localCartId', '');
	});
}

function mergeCartItems(...cartItems: CartItem[][]) {
	return cartItems.reduce((acc, items) => {
		items.forEach((item) => {
			const existingItem = acc.find((i) => i.productId === item.productId);

			if (existingItem) {
				existingItem.quantity += item.quantity;
			} else {
				acc.push(item);
			}
		});

		return acc;
	}, [] as CartItem[]);
}
