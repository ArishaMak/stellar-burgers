import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  orderBurger,
  resetModal,
  selectConstructor
} from '../../services/constructorSlice'; // Относительный путь
import { TConstructorIngredient } from '../../utils-types'; // Относительный путь
import { BurgerConstructorUI } from '@ui';
import { RootState, AppDispatch } from '../../services/store'; // Импорт типов напрямую

export const BurgerConstructor: FC = () => {
  // Типизированные хуки напрямую из store
  const dispatch = useDispatch<AppDispatch>();
  const { constructorItems, orderRequest, orderModalData } = useSelector(
    selectConstructor as (state: RootState) => any
  );

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
