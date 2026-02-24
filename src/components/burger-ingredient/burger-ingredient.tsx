import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { addIngredient } from '../../services/slices/constructorSlice';
import { TIngredient } from '../../utils/utils-types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    // Обращаемся к стейту конструктора
    const constructorState = useAppSelector((state) => state.burgerConstructor);

    const count = useMemo(() => {
      // 1. Проверяем булку (учитываем, что в стейте она может быть объектом или null)
      if (ingredient.type === 'bun') {
        return constructorState.constructorItems.bun?._id === ingredient._id ? 2 : 0;
      }

      // 2. Проверяем остальные ингредиенты (в массиве constructorItems.ingredients)
      return constructorState.constructorItems.ingredients.filter(
        (item: TIngredient) => item._id === ingredient._id
      ).length;
    }, [constructorState.constructorItems, ingredient]);

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);