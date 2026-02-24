import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import { BurgerIngredients } from '../../components/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor';
import { Preloader } from '../../components/ui/preloader';

export const ConstructorPage: FC = () => {
  // Используем useAppSelector и селектор из стора
  const isIngredientsLoading = useAppSelector((state) => state.ingredient.loading);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className='constructor'>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      )}
    </>
  );
};