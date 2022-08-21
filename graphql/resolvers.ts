import currencyFormatter from "currency-formatter";
import { Resolvers } from "types";
import { findOrCreateCart } from "lib/cart";
const currencyCode = "USD";

const resolvers: Resolvers = {
  Query: {
    cart: async (_, { id }, { prisma }) => {
      const cart = await findOrCreateCart(prisma, id);
      return cart;
    },
  },
  Mutation: {
    addItem: async (_, { input }, { prisma }) => {
      const cart = await findOrCreateCart(prisma, input.cartId);
      const cartItem = await prisma.cartItem.upsert({
        create: {
          cartId: cart.id,
          id: input.id,
          name: input.name,
          description: input.details || "",
          price: 3000,
          quantity: input.quantity || 1,
        },
        where: { id_cartId: { id: input.id, cartId: cart.id } },
        update: {
          quantity: {
            increment: input.quantity || 1,
          },
        },
      });
      console.log({ cart, cartItem });
      return cart;
    },
    removeItem: async (_, { input }, { prisma }) => {
      const { cartId } = await prisma.cartItem.delete({
        where: { id_cartId: { id: input.id, cartId: input.cartId } },
        select: {
          cartId: true,
        },
      });
      return findOrCreateCart(prisma, cartId);
    },
    increaseCartItem: async (_, { input }, { prisma }) => {
      const { cartId, quantity } = await prisma.cartItem.update({
        data: {
          quantity: {
            increment: 1,
          },
        },
        where: { id_cartId: { id: input.id, cartId: input.cartId } },
        select: {
          quantity: true,
          cartId: true,
        },
      });
      return findOrCreateCart(prisma, cartId);
    },
    decreaseCartItem: async (_, { input }, { prisma }) => {
      const { cartId, quantity } = await prisma.cartItem.update({
        data: {
          quantity: {
            decrement: 1,
          },
        },
        where: { id_cartId: { id: input.id, cartId: input.cartId } },
        select: {
          quantity: true,
          cartId: true,
        },
      });

      if (quantity <= 0) {
        await prisma.cartItem.delete({
          where: {
            id_cartId: {
              id: input.id,
              cartId: input.cartId,
            },
          },
        });
      }

      return findOrCreateCart(prisma, cartId);
    },
  },
  Cart: {
    items: async ({ id }, _, { prisma }) => {
      const items = await prisma.cart
        .findUnique({
          where: { id },
        })
        .items();

      return items;
    },
    totalItems: async ({ id }, _, { prisma }) => {
      const items = await prisma.cart
        .findUnique({
          where: { id },
        })
        .items();

      return items.reduce((total, item) => total + item.quantity || 1, 0);
    },
    subTotal: async ({ id }, _, { prisma }) => {
      const items = await prisma.cart
        .findUnique({
          where: { id },
        })
        .items();

      const amount =
        items.reduce((acc, item) => acc + item.price * item.quantity, 0) ?? 0;

      return {
        amount,
        formatted: currencyFormatter.format(amount / 100, {
          code: currencyCode,
        }),
      };
    },
  },
  CartItem: {
    unitTotal: (item) => {
      const amount = item.price;
      return {
        amount,
        formatted: currencyFormatter.format(amount / 100, {
          code: currencyCode,
        }),
      };
    },
    lineTotal: (item) => {
      const amount = item.quantity * item.price;

      return {
        amount,
        formatted: currencyFormatter.format(amount / 100, {
          code: currencyCode,
        }),
      };
    },
  },
};

export { resolvers };
