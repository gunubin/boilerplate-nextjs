export type Validate = (value: any) => boolean;
export type ValidatorObject = {
  name: string;
  validate: Validate;
};

export type Validator = (ruleValue?: any) => ValidatorObject;
