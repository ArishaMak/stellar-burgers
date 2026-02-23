// pages/home/index.tsx
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@utils-types';
import { getIngredients } from '@services/slices/ingredientsSlice';
import { BurgerIngredients } from '@components/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor';

export const ConstructorPage: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <main className="constructor">
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    );
};
