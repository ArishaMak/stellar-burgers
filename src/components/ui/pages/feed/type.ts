import { TOrder } from 'src/utils/utils-types';

export type FeedUIProps = {
  orders: TOrder[];
  handleGetFeeds: () => void;
};
