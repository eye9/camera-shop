import {MouseEventHandler} from 'react';

export type PaginatorButtonProps = {
  onClick: () => MouseEventHandler | undefined;
  linkPage: number;
};
