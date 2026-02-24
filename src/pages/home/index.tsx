import { FC, useEffect } from 'react';
import { useAppDispatch } from '../../services/store'; // Импорт из стора
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { BurgerIngredients } from '../../components/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor';

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

export default ConstructorPage;