import {Rule, ValueObject} from '@/domain/lib/types';

export const defineValueObject = <TCreate extends (val: any) => any, TRules extends Rule<any>[]>({
  rules,
  create,
}: {
  create: TCreate;
  rules: TRules;
}): ValueObject<ReturnType<TCreate>, TRules> => {
  return {
    create,
    rules,
  };
};
