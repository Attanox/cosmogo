import currencyFormatter from "currency-formatter";
import { Resolvers } from "types/appTypes";
import { findOrCreateCart } from "lib/cart";
const currencyCode = "USD";

const TICKET_PRICE = 3000;

const resolvers: Resolvers = {
  Query: {
    cart: async (_, { id }, { prisma }) => {
      const cart = await findOrCreateCart(prisma, id);
      return cart;
    },
    launches: async (_, args, { prisma }) => {
      const {
        orderBy = "launch_date_utc",
        orderDirection = "desc",
        skip = 0,
        take = 10,
      } = args;

      let orderByConfig: { [x: string]: string | { [y: string]: string } } = {
        [orderBy]: orderDirection,
      };

      if (orderBy === "site_name_long") {
        orderByConfig = {
          launch_site: {
            site_name_long: orderDirection,
          },
        };
      }

      const launches = await prisma.launch.findMany({
        include: {
          rocket: true,
          launch_site: true,
          links: true,
        },
        orderBy: orderByConfig,
        skip,
        take,
      });

      return launches;
    },
    dragons: async (_, _args, { prisma }) => {
      const dragons = await prisma.dragon.findMany();
      return dragons;
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
          price: TICKET_PRICE,
          quantity: input.quantity || 1,
        },
        where: { id_cartId: { id: input.id, cartId: cart.id } },
        update: {
          quantity: {
            increment: input.quantity || 1,
          },
        },
      });
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
    updateCartItem: async (_, { input }, { prisma }) => {
      const { cartId, quantity } = await prisma.cartItem.update({
        data: {
          quantity: input.quantity,
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
    deleteCart: async (_, { input }, { prisma }) => {
      return await prisma.cart.delete({ where: { id: input.id } });
    },
    changeSuit: async (_, { input }, { prisma }) => {
      if (input.baseColor) {
        await prisma.suit.update({
          data: {
            baseColor: input.baseColor,
          },
          where: {
            cartId: input.cartId,
          },
        });
      }
      if (input.detailsColor) {
        await prisma.suit.update({
          data: {
            detailsColor: input.detailsColor,
          },
          where: {
            cartId: input.cartId,
          },
        });
      }

      return await prisma.cart.findFirst({ where: { id: input.cartId } });
    },
  },
  Cart: {
    items: async ({ id }, _, { prisma }) => {
      const items = await prisma.cartItem.findMany({
        where: { cartId: id },
        orderBy: {
          createdAt: "asc",
        },
      });

      return items;
    },
    totalItems: async ({ id }, _, { prisma }) => {
      const items = await prisma.cart
        .findUnique({
          where: { id },
        })
        .items();

      return (items || []).reduce(
        (total, item) => total + item.quantity || 1,
        0
      );
    },
    subTotal: async ({ id }, _, { prisma }) => {
      const items = await prisma.cart
        .findUnique({
          where: { id },
        })
        .items();

      const amount =
        (items || []).reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ) ?? 0;

      return {
        amount,
        formatted: currencyFormatter.format(amount / 100, {
          code: currencyCode,
        }),
      };
    },
    suit: async ({ id }, _, { prisma }) => {
      const cart = await prisma.cart.findFirst({ where: { id } });
      if (!cart) return null;

      let suit = await prisma.suit.findFirst({ where: { cartId: id } });
      if (!suit) {
        suit = await prisma.suit.create({
          data: {
            cartId: id,
            baseColor: "#ffffff",
            detailsColor: "#ffffff",
          },
        });
      }
      return suit;
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
