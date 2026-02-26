import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeeds } from '../../services/slices/feedSlice';
import { RootState, AppDispatch } from '../../services/store';
import { TOrder } from '../../utils/utils-types';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // @ts-ignore
  const { orders, loading } = useSelector((state: RootState) => state.feed);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
