import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  orderBurger,
  resetModal
} from '../../services/slices/constructorSlice';

import { TConstructorIngredient } from '../../utils/utils-types';

import { BurgerConstructorUI } from '@ui';

import { RootState, AppDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { constructorItems, orderRequest, orderModalData } = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (ing: TConstructorIngredient) => ing._id
      ),
      constructorItems.bun._id
    ];

    dispatch(orderBurger(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(resetModal());
  };

  const price = useMemo(() => {
    if (!constructorItems.bun) return 0;

    const bunPrice = constructorItems.bun.price;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum: number, ing: TConstructorIngredient) => sum + ing.price,
      0
    );

    return bunPrice * 2 + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
