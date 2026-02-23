import { FC, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@utils-types';
import {
  orderBurger,
  resetModal,
  selectConstructor
} from '@services/constructorSlice';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();

  // Берем данные ИЗ REDUX STORE
  const { constructorItems, orderRequest, orderModalData } = useAppSelector(selectConstructor);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    // Формируем массив _id для API
    const ingredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient: TConstructorIngredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(orderBurger(ingredients));
  };

  const closeOrderModal = () => {
    dispatch(resetModal());
  };

  const price = useMemo(() => {
    if (!constructorItems.bun) return 0;
    return (
      constructorItems.bun.price * 2 +
      constructorItems.ingredients.reduce(
        (sum: number, ingredient: TConstructorIngredient) => sum + ingredient.price,
        0
      )
    );
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
