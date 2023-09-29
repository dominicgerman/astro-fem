import { computed, map } from 'nanostores';

export const $cart = map<Record<number, CartItem>>({});

export function addItemToCart(item: ShopItem) {
	const cartItem = $cart.get()[item.id];
	const quantity = cartItem ? cartItem.quantity : 0;

	$cart.setKey(item.id, {
		item,
		quantity: quantity + 1,
	});
}

export function removeItemFromCart(itemId: number) {
	const cartItem = $cart.get()[itemId].item;
	const quantity = $cart.get()[itemId].quantity;
	if (quantity > 1) {
		$cart.setKey(itemId, {
			item: cartItem,
			quantity: quantity - 1,
		});
	} else {
		// @ts-ignore
		$cart.setKey(itemId, undefined);
	}
}

export const subtotal = computed($cart, (entries) => {
	let subtotal = 0;
	Object.values(entries).forEach((entry) => {
		if (!entry) {
			return;
		}

		subtotal += entry.quantity * entry.item.price;
	});
	return subtotal;
});
