import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { RootState, AppDispatch } from '../../services/store';
import { selectIngredientsLoading } from '../../services/slices/ingredientsSlice';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor';
import { Preloader } from '../../components/ui';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.ingredient.loading);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (loading) {
    return (
      <main className={styles.containerMain}>
        <Preloader />
      </main>
    );
  }

  return (
    <main className={styles.containerMain}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
