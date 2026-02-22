import { FC, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Feed from '../../pages/feed';
import ForgotPasswordPage from '../../pages/forgot-password';
import HomePage from '../../pages/home';
import Login from '../../pages/login';
import Profile from '../../pages/profile';
import ProfileOrders from '../../pages/profile-orders';
import RegisterPage from '../../pages/register';
import ResetPasswordPage from '../../pages/reset-password';
import NotFound404 from '../../pages/not-found-404';

import { getIngredients } from '../../services/actions/ingredients';
import { HIDE_ORDER_MODAL } from '../../services/actions/orderDetails';

import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import OrderList from '../order-list/order-list';
import OrderStats from '../order-stats/order--stats';
import OrderPlaced from '../order-placed/order-placed';
import OrderPlacedDetails from '../../pages/order-placed-details';
import ProfileForm from '../profile-form/profile-form';
import Ingredient from '../../pages/ingredient';

import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';
import { useAppDispatch, useAppSelector } from '../../utils/types';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const orderDetailVisible = useAppSelector(
    (state) => state.orderDetails.orderDetailVisible,
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <AppHeader />

      <Routes location={state?.backgroundLocation || location}>
        {/* Главная */}
        <Route path="/" element={<HomePage />} />

        {/* Лента заказов */}
        <Route
          path="/feed"
          element={
            <Feed>
              <OrderList />
              <OrderStats />
            </Feed>
          }
        />

        {/* Только для НЕавторизованных */}
        <Route
          path="/login"
          element={
            <ProtectedRouteElement onlyUnAuth element={<Login />} />
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRouteElement onlyUnAuth element={<RegisterPage />} />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement onlyUnAuth element={<ForgotPasswordPage />} />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement onlyUnAuth element={<ResetPasswordPage />} />
          }
        />

        {/* Только для авторизованных */}
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement element={<Profile />} />
          }
        >
          <Route index element={<ProfileForm />} />
          <Route path="orders" element={<ProfileOrders />} />
        </Route>

        <Route
          path="/profile/orders/:number"
          element={
            <ProtectedRouteElement
              element={
                <OrderPlaced isAllOrders={false}>
                  <OrderPlacedDetails />
                </OrderPlaced>
              }
            />
          }
        />

        {/* Детали ингредиента */}
        <Route
          path="/ingredients/:id"
          element={
            <Ingredient title="Детали ингредиента">
              <IngredientDetails />
            </Ingredient>
          }
        />

        {/* Детали заказа из ленты */}
        <Route
          path="/feed/:number"
          element={
            <OrderPlaced isAllOrders={true}>
              <OrderPlacedDetails />
            </OrderPlaced>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {/* Модальные роуты */}
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/feed/:number"
            element={
              <Modal close={() => navigate(-1)} title="">
                <OrderPlacedDetails />
              </Modal>
            }
          />

          <Route
            path="/profile/orders/:number"
            element={
              <ProtectedRouteElement
                element={
                  <Modal close={() => navigate(-1)} title="">
                    <OrderPlacedDetails />
                  </Modal>
                }
              />
            }
          />

          <Route
            path="/ingredients/:id"
            element={
              <Modal close={() => navigate(-1)} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {/* Модалка оформления заказа */}
      {orderDetailVisible && (
        <Modal close={() => dispatch({ type: HIDE_ORDER_MODAL })}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default App;