import { useEffect } from 'react';

export const useCartLogger = (cart) => {
	useEffect(() => {
		console.log('Cart updated:', cart);
	}, [cart]);
};