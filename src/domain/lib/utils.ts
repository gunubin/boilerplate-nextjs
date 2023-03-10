import {Rule, ValueObject} from '@/domain/lib/types';

// MEMO: 命名悩み defineValueObjectCreator的な
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
