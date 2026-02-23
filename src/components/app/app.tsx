import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
// Используем типизированный dispatch из стора
import { useAppDispatch } from '@store';
import { getIngredients } from '@slices/ingredientsSlice';
import { useEffect } from 'react';
import { getUser } from '@slices/userSlice';
import { CenteringComponent } from '../centering-component';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Получаем фоновую локацию для модалок
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);

  // Функция для закрытия модалок
  const handleModalClose = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />

      {/* Основные маршруты */}
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />

        <Route
          path='/ingredients/:id'
          element={
            <CenteringComponent title={'Детали ингредиента'}>
              <IngredientDetails />
            </CenteringComponent>
          }
        />

        <Route path='/feed' element={<Feed />} />

        <Route
          path='/feed/:number'
          element={
            <CenteringComponent title={`#${location.pathname.match(/\d+/)?.[0] || ''}`}>
              <OrderInfo />
            </CenteringComponent>
          }
        />

        {/* Роуты только для неавторизованных */}
        <Route element={<ProtectedRoute onlyUnAuth />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>

        {/* Защищенные роуты профиля */}
        <Route element={<ProtectedRoute onlyUnAuth={false} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route
            path='/profile/orders/:number'
            element={
              <CenteringComponent title={`#${location.pathname.match(/\d+/)?.[0] || ''}`}>
                <OrderInfo />
              </CenteringComponent>
            }
          />
        </Route>

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные маршруты (рисуются поверх background) */}
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${location.pathname.match(/\d+/)?.[0] || ''}`}
                onClose={handleModalClose}
              >
                <OrderInfo />
              </Modal>
            }
          />

          <Route element={<ProtectedRoute onlyUnAuth={false} />}>
            <Route
              path='/profile/orders/:number'
              element={
                <Modal
                  title={`#${location.pathname.match(/\d+/)?.[0] || ''}`}
                  onClose={handleModalClose}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;