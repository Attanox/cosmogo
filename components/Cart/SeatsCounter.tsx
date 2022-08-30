import React from "react";
import { debounce } from "ts-debounce";

import { GetCartDocument, useUpdateCartMutation } from "types/appTypes";
import type { Dragon } from "types/spaceXTypes";

const SeatsCounter = (props: {
  dragons: Dragon[];
  cartId: string;
  itemId: string;
}) => {
  const { dragons, cartId, itemId } = props;

  const [selectedDragonId, setSelectedDragonId] = React.useState<string>(
    dragons[0].id as string
  );
  const [seats, setSeats] = React.useState<number>(1);

  const [updateCartItem, { loading: updatingCart }] = useUpdateCartMutation({
    refetchQueries: [GetCartDocument],
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSeatsChange = React.useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const seats = e.target.valueAsNumber;
      updateCartItem({
        variables: {
          input: {
            cartId,
            id: itemId,
            quantity: seats,
          },
        },
      });
    }, 500),
    []
  );

  const onCapsuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dragonId = e.target.value;
    setSelectedDragonId(dragonId);
    updateCartItem({
      variables: {
        input: {
          cartId,
          id: itemId,
          quantity: 1,
        },
      },
    });
    setSeats(1);
  };

  const selectedDragonCapacity =
    dragons.find((d) => d.id === selectedDragonId)?.crew_capacity || 0;

  return (
    <>
      <td>
        <select
          onChange={onCapsuleChange}
          className="select select-bordered w-full"
        >
          {dragons.map((dragon) => {
            return (
              <option key={dragon.id} value={dragon.id as string}>
                {dragon.name}
              </option>
            );
          })}
        </select>
      </td>
      <td>
        <input
          type="range"
          min={1}
          max={selectedDragonCapacity}
          value={seats}
          className="range range-xs range-accent"
          step={1}
          onChange={(e) => {
            onSeatsChange(e);
            setSeats(e.target.valueAsNumber);
          }}
          disabled={updatingCart}
        />
        <div className="w-full flex justify-between text-xs px-2">
          {[...Array(selectedDragonCapacity)].map((_, idx) => {
            return <span key={idx}>{idx + 1}</span>;
          })}
        </div>
      </td>
    </>
  );
};

export default SeatsCounter;
