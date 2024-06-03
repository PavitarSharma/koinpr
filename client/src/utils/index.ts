import { ICart } from "../types";

export const formatPrice = (price: number, currency = "USD") => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price)
}

export const calculateCartTotals = (carts: ICart[]) => {
    let total = 0;
    let subTotal = 0;
    let totalDiscount = 0;

    carts?.forEach((cart: ICart) => {
        const { contentOffering: { mediaKitPrice, discountPrice }, quantity } = cart;
        subTotal += mediaKitPrice * quantity;
        if (discountPrice) {
            totalDiscount += discountPrice * quantity;
        }
    });

    total = subTotal - totalDiscount;

    return {
        subTotal: formatPrice(subTotal),
        totalDiscount: formatPrice(totalDiscount),
        total: formatPrice(total),
        totalPrice: total
    }

}

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateQueryParams = (filters: Record<string, any>) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
        const value = filters[key];
        if (Array.isArray(value)) {
            value.forEach(item => params.append(key, item));
        } else if (value) {
            params.append(key, value);
        }
    });
    return params.toString();
};