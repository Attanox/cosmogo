import { GraphQLResolveInfo } from 'graphql';
import { Cart as CartModel, CartItem as CartItemModel, Suit as SuitModel } from '@prisma/client';
import { GraphQLContext } from '../pages/api/index';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddToCartInput = {
  capsule: DragonInput;
  cartId: Scalars['ID'];
  details?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  quantity?: InputMaybe<Scalars['Int']>;
};

export type Cart = {
  __typename?: 'Cart';
  id: Scalars['ID'];
  items: Array<CartItem>;
  subTotal: Money;
  suit?: Maybe<Suit>;
  totalItems: Scalars['Int'];
};

export type CartItem = {
  __typename?: 'CartItem';
  capsule: Dragon;
  details?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lineTotal: Money;
  name: Scalars['String'];
  quantity: Scalars['Int'];
  unitTotal: Money;
};

export type ChangeSuitInput = {
  baseColor?: InputMaybe<Scalars['String']>;
  cartId: Scalars['ID'];
  detailsColor?: InputMaybe<Scalars['String']>;
};

export type DecreaseCartItemInput = {
  cartId: Scalars['ID'];
  id: Scalars['ID'];
};

export type DeleteCartInput = {
  id: Scalars['ID'];
};

export type Dragon = {
  __typename?: 'Dragon';
  crew_capacity: Scalars['Int'];
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type DragonInput = {
  crew_capacity: Scalars['Int'];
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type IncreaseCartItemInput = {
  cartId: Scalars['ID'];
  id: Scalars['ID'];
};

export type Money = {
  __typename?: 'Money';
  amount: Scalars['Int'];
  formatted: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addItem?: Maybe<Cart>;
  changeSuit?: Maybe<Cart>;
  decreaseCartItem?: Maybe<Cart>;
  deleteCart?: Maybe<Cart>;
  increaseCartItem?: Maybe<Cart>;
  removeItem?: Maybe<Cart>;
  updateCartItem?: Maybe<Cart>;
};


export type MutationAddItemArgs = {
  input: AddToCartInput;
};


export type MutationChangeSuitArgs = {
  input: ChangeSuitInput;
};


export type MutationDecreaseCartItemArgs = {
  input: DecreaseCartItemInput;
};


export type MutationDeleteCartArgs = {
  input: DeleteCartInput;
};


export type MutationIncreaseCartItemArgs = {
  input: IncreaseCartItemInput;
};


export type MutationRemoveItemArgs = {
  input: RemoveFromCartInput;
};


export type MutationUpdateCartItemArgs = {
  input: UpdateCartItemInput;
};

export type Query = {
  __typename?: 'Query';
  cart?: Maybe<Cart>;
};


export type QueryCartArgs = {
  id: Scalars['ID'];
};

export type RemoveFromCartInput = {
  cartId: Scalars['ID'];
  id: Scalars['ID'];
};

export type Suit = {
  __typename?: 'Suit';
  baseColor: Scalars['String'];
  detailsColor: Scalars['String'];
  id: Scalars['ID'];
};

export type UpdateCartItemInput = {
  cartId: Scalars['ID'];
  id: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type AddToCartMutationVariables = Exact<{
  input: AddToCartInput;
}>;


export type AddToCartMutation = { __typename?: 'Mutation', addItem?: { __typename?: 'Cart', id: string, totalItems: number, subTotal: { __typename?: 'Money', formatted: string }, items: Array<{ __typename?: 'CartItem', id: string, name: string, details?: string | null, quantity: number, unitTotal: { __typename?: 'Money', formatted: string, amount: number }, lineTotal: { __typename?: 'Money', formatted: string, amount: number } }>, suit?: { __typename?: 'Suit', id: string, baseColor: string, detailsColor: string } | null } | null };

export type CartFragment = { __typename?: 'Cart', id: string, totalItems: number, subTotal: { __typename?: 'Money', formatted: string }, items: Array<{ __typename?: 'CartItem', id: string, name: string, details?: string | null, quantity: number, unitTotal: { __typename?: 'Money', formatted: string, amount: number }, lineTotal: { __typename?: 'Money', formatted: string, amount: number } }>, suit?: { __typename?: 'Suit', id: string, baseColor: string, detailsColor: string } | null };

export type ChangeSuitMutationVariables = Exact<{
  input: ChangeSuitInput;
}>;


export type ChangeSuitMutation = { __typename?: 'Mutation', changeSuit?: { __typename?: 'Cart', id: string, totalItems: number, subTotal: { __typename?: 'Money', formatted: string }, items: Array<{ __typename?: 'CartItem', id: string, name: string, details?: string | null, quantity: number, unitTotal: { __typename?: 'Money', formatted: string, amount: number }, lineTotal: { __typename?: 'Money', formatted: string, amount: number } }>, suit?: { __typename?: 'Suit', id: string, baseColor: string, detailsColor: string } | null } | null };

export type DeleteCartMutationVariables = Exact<{
  input: DeleteCartInput;
}>;


export type DeleteCartMutation = { __typename?: 'Mutation', deleteCart?: { __typename?: 'Cart', id: string, totalItems: number, subTotal: { __typename?: 'Money', formatted: string }, items: Array<{ __typename?: 'CartItem', id: string, name: string, details?: string | null, quantity: number, unitTotal: { __typename?: 'Money', formatted: string, amount: number }, lineTotal: { __typename?: 'Money', formatted: string, amount: number } }>, suit?: { __typename?: 'Suit', id: string, baseColor: string, detailsColor: string } | null } | null };

export type GetCartQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCartQuery = { __typename?: 'Query', cart?: { __typename?: 'Cart', id: string, totalItems: number, subTotal: { __typename?: 'Money', formatted: string }, items: Array<{ __typename?: 'CartItem', id: string, name: string, details?: string | null, quantity: number, unitTotal: { __typename?: 'Money', formatted: string, amount: number }, lineTotal: { __typename?: 'Money', formatted: string, amount: number } }>, suit?: { __typename?: 'Suit', id: string, baseColor: string, detailsColor: string } | null } | null };

export type RemoveFromCartMutationVariables = Exact<{
  input: RemoveFromCartInput;
}>;


export type RemoveFromCartMutation = { __typename?: 'Mutation', removeItem?: { __typename?: 'Cart', id: string, totalItems: number, subTotal: { __typename?: 'Money', formatted: string }, items: Array<{ __typename?: 'CartItem', id: string, name: string, details?: string | null, quantity: number, unitTotal: { __typename?: 'Money', formatted: string, amount: number }, lineTotal: { __typename?: 'Money', formatted: string, amount: number } }>, suit?: { __typename?: 'Suit', id: string, baseColor: string, detailsColor: string } | null } | null };

export type UpdateCartMutationVariables = Exact<{
  input: UpdateCartItemInput;
}>;


export type UpdateCartMutation = { __typename?: 'Mutation', updateCartItem?: { __typename?: 'Cart', id: string, totalItems: number, subTotal: { __typename?: 'Money', formatted: string }, items: Array<{ __typename?: 'CartItem', id: string, name: string, details?: string | null, quantity: number, unitTotal: { __typename?: 'Money', formatted: string, amount: number }, lineTotal: { __typename?: 'Money', formatted: string, amount: number } }>, suit?: { __typename?: 'Suit', id: string, baseColor: string, detailsColor: string } | null } | null };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddToCartInput: AddToCartInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Cart: ResolverTypeWrapper<CartModel>;
  CartItem: ResolverTypeWrapper<CartItemModel>;
  ChangeSuitInput: ChangeSuitInput;
  DecreaseCartItemInput: DecreaseCartItemInput;
  DeleteCartInput: DeleteCartInput;
  Dragon: ResolverTypeWrapper<Dragon>;
  DragonInput: DragonInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IncreaseCartItemInput: IncreaseCartItemInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Money: ResolverTypeWrapper<Money>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RemoveFromCartInput: RemoveFromCartInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Suit: ResolverTypeWrapper<SuitModel>;
  UpdateCartItemInput: UpdateCartItemInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddToCartInput: AddToCartInput;
  Boolean: Scalars['Boolean'];
  Cart: CartModel;
  CartItem: CartItemModel;
  ChangeSuitInput: ChangeSuitInput;
  DecreaseCartItemInput: DecreaseCartItemInput;
  DeleteCartInput: DeleteCartInput;
  Dragon: Dragon;
  DragonInput: DragonInput;
  ID: Scalars['ID'];
  IncreaseCartItemInput: IncreaseCartItemInput;
  Int: Scalars['Int'];
  Money: Money;
  Mutation: {};
  Query: {};
  RemoveFromCartInput: RemoveFromCartInput;
  String: Scalars['String'];
  Suit: SuitModel;
  UpdateCartItemInput: UpdateCartItemInput;
};

export type CartResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Cart'] = ResolversParentTypes['Cart']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['CartItem']>, ParentType, ContextType>;
  subTotal?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  suit?: Resolver<Maybe<ResolversTypes['Suit']>, ParentType, ContextType>;
  totalItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartItemResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CartItem'] = ResolversParentTypes['CartItem']> = {
  capsule?: Resolver<ResolversTypes['Dragon'], ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineTotal?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  unitTotal?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DragonResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Dragon'] = ResolversParentTypes['Dragon']> = {
  crew_capacity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoneyResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Money'] = ResolversParentTypes['Money']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  formatted?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addItem?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType, RequireFields<MutationAddItemArgs, 'input'>>;
  changeSuit?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType, RequireFields<MutationChangeSuitArgs, 'input'>>;
  decreaseCartItem?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType, RequireFields<MutationDecreaseCartItemArgs, 'input'>>;
  deleteCart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType, RequireFields<MutationDeleteCartArgs, 'input'>>;
  increaseCartItem?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType, RequireFields<MutationIncreaseCartItemArgs, 'input'>>;
  removeItem?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType, RequireFields<MutationRemoveItemArgs, 'input'>>;
  updateCartItem?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType, RequireFields<MutationUpdateCartItemArgs, 'input'>>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType, RequireFields<QueryCartArgs, 'id'>>;
};

export type SuitResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Suit'] = ResolversParentTypes['Suit']> = {
  baseColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  detailsColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Cart?: CartResolvers<ContextType>;
  CartItem?: CartItemResolvers<ContextType>;
  Dragon?: DragonResolvers<ContextType>;
  Money?: MoneyResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Suit?: SuitResolvers<ContextType>;
};


export const CartFragmentDoc = gql`
    fragment Cart on Cart {
  id
  totalItems
  subTotal {
    formatted
  }
  items {
    id
    name
    details
    quantity
    unitTotal {
      formatted
      amount
    }
    lineTotal {
      formatted
      amount
    }
  }
  suit {
    id
    baseColor
    detailsColor
  }
}
    `;
export const AddToCartDocument = gql`
    mutation addToCart($input: AddToCartInput!) {
  addItem(input: $input) {
    ...Cart
  }
}
    ${CartFragmentDoc}`;
export type AddToCartMutationFn = Apollo.MutationFunction<AddToCartMutation, AddToCartMutationVariables>;

/**
 * __useAddToCartMutation__
 *
 * To run a mutation, you first call `useAddToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCartMutation, { data, loading, error }] = useAddToCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddToCartMutation, AddToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToCartMutation, AddToCartMutationVariables>(AddToCartDocument, options);
      }
export type AddToCartMutationHookResult = ReturnType<typeof useAddToCartMutation>;
export type AddToCartMutationResult = Apollo.MutationResult<AddToCartMutation>;
export type AddToCartMutationOptions = Apollo.BaseMutationOptions<AddToCartMutation, AddToCartMutationVariables>;
export const ChangeSuitDocument = gql`
    mutation ChangeSuit($input: ChangeSuitInput!) {
  changeSuit(input: $input) {
    ...Cart
  }
}
    ${CartFragmentDoc}`;
export type ChangeSuitMutationFn = Apollo.MutationFunction<ChangeSuitMutation, ChangeSuitMutationVariables>;

/**
 * __useChangeSuitMutation__
 *
 * To run a mutation, you first call `useChangeSuitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeSuitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeSuitMutation, { data, loading, error }] = useChangeSuitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeSuitMutation(baseOptions?: Apollo.MutationHookOptions<ChangeSuitMutation, ChangeSuitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeSuitMutation, ChangeSuitMutationVariables>(ChangeSuitDocument, options);
      }
export type ChangeSuitMutationHookResult = ReturnType<typeof useChangeSuitMutation>;
export type ChangeSuitMutationResult = Apollo.MutationResult<ChangeSuitMutation>;
export type ChangeSuitMutationOptions = Apollo.BaseMutationOptions<ChangeSuitMutation, ChangeSuitMutationVariables>;
export const DeleteCartDocument = gql`
    mutation DeleteCart($input: DeleteCartInput!) {
  deleteCart(input: $input) {
    ...Cart
  }
}
    ${CartFragmentDoc}`;
export type DeleteCartMutationFn = Apollo.MutationFunction<DeleteCartMutation, DeleteCartMutationVariables>;

/**
 * __useDeleteCartMutation__
 *
 * To run a mutation, you first call `useDeleteCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCartMutation, { data, loading, error }] = useDeleteCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCartMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCartMutation, DeleteCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCartMutation, DeleteCartMutationVariables>(DeleteCartDocument, options);
      }
export type DeleteCartMutationHookResult = ReturnType<typeof useDeleteCartMutation>;
export type DeleteCartMutationResult = Apollo.MutationResult<DeleteCartMutation>;
export type DeleteCartMutationOptions = Apollo.BaseMutationOptions<DeleteCartMutation, DeleteCartMutationVariables>;
export const GetCartDocument = gql`
    query GetCart($id: ID!) {
  cart(id: $id) {
    ...Cart
  }
}
    ${CartFragmentDoc}`;

/**
 * __useGetCartQuery__
 *
 * To run a query within a React component, call `useGetCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCartQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCartQuery(baseOptions: Apollo.QueryHookOptions<GetCartQuery, GetCartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCartQuery, GetCartQueryVariables>(GetCartDocument, options);
      }
export function useGetCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCartQuery, GetCartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCartQuery, GetCartQueryVariables>(GetCartDocument, options);
        }
export type GetCartQueryHookResult = ReturnType<typeof useGetCartQuery>;
export type GetCartLazyQueryHookResult = ReturnType<typeof useGetCartLazyQuery>;
export type GetCartQueryResult = Apollo.QueryResult<GetCartQuery, GetCartQueryVariables>;
export const RemoveFromCartDocument = gql`
    mutation RemoveFromCart($input: RemoveFromCartInput!) {
  removeItem(input: $input) {
    ...Cart
  }
}
    ${CartFragmentDoc}`;
export type RemoveFromCartMutationFn = Apollo.MutationFunction<RemoveFromCartMutation, RemoveFromCartMutationVariables>;

/**
 * __useRemoveFromCartMutation__
 *
 * To run a mutation, you first call `useRemoveFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromCartMutation, { data, loading, error }] = useRemoveFromCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveFromCartMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromCartMutation, RemoveFromCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFromCartMutation, RemoveFromCartMutationVariables>(RemoveFromCartDocument, options);
      }
export type RemoveFromCartMutationHookResult = ReturnType<typeof useRemoveFromCartMutation>;
export type RemoveFromCartMutationResult = Apollo.MutationResult<RemoveFromCartMutation>;
export type RemoveFromCartMutationOptions = Apollo.BaseMutationOptions<RemoveFromCartMutation, RemoveFromCartMutationVariables>;
export const UpdateCartDocument = gql`
    mutation UpdateCart($input: UpdateCartItemInput!) {
  updateCartItem(input: $input) {
    ...Cart
  }
}
    ${CartFragmentDoc}`;
export type UpdateCartMutationFn = Apollo.MutationFunction<UpdateCartMutation, UpdateCartMutationVariables>;

/**
 * __useUpdateCartMutation__
 *
 * To run a mutation, you first call `useUpdateCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartMutation, { data, loading, error }] = useUpdateCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCartMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartMutation, UpdateCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCartMutation, UpdateCartMutationVariables>(UpdateCartDocument, options);
      }
export type UpdateCartMutationHookResult = ReturnType<typeof useUpdateCartMutation>;
export type UpdateCartMutationResult = Apollo.MutationResult<UpdateCartMutation>;
export type UpdateCartMutationOptions = Apollo.BaseMutationOptions<UpdateCartMutation, UpdateCartMutationVariables>;