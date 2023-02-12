import {v4 as uuid} from 'uuid';

import {ModalId} from '@/services/app/modal/ModalId';
import {BaseModalPayload} from '@/services/app/modal/types';

export type BlockingIndicatorPayload = BaseModalPayload & {
  type: 'blockingIndicator';
  isShowHeaderNavigation: boolean;
} & {readonly brand: unique symbol};

// eslint-disable-next-line no-redeclare
export const BlockingIndicatorPayload = {
  create: (initialId?: string, isShowHeaderNavigation?: boolean): BlockingIndicatorPayload => {
    const id = initialId ?? ModalId.create(uuid());
    return {
      id,
      isShowHeaderNavigation,
      type: 'blockingIndicator',
    } as BlockingIndicatorPayload;
  },
};
