import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  DEFAULT_REMAINING_HOURS,
  DEFAULT_SUBSTRACTING_OPTIONS,
  DEFAULT_SUBSTRACTING_OPTION_VALUE,
  MAX_COUNTER_TITLE_LENGTH,
} from '@/lib/config/consts';
import {
  NewCounterFormValues,
  newCounterSchema,
} from '@/lib/models/newCounter';

import { ArrayButton } from '../components/ArrayButton';
import { Counter } from '@/lib/types/counter';
import { FormError } from '../components';
import { InputCard } from '../components/InputCard';
import { SubmitButton } from '../components/SubmitButton';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  closeModal: () => void;
  onAddCounter: (counter: Omit<Counter, 'id'>) => void;
}

export const NewCounterForm = ({ closeModal, onAddCounter }: Props) => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm<NewCounterFormValues>({
    mode: 'onTouched',
    resolver: zodResolver(newCounterSchema),
    defaultValues: {
      title: '',
      remainingHours: DEFAULT_REMAINING_HOURS,
      substractingOptions: DEFAULT_SUBSTRACTING_OPTIONS,
    },
  });
  const substrOpts = watch('substractingOptions');

  const addTurn = () => {
    const next = [...substrOpts, DEFAULT_SUBSTRACTING_OPTION_VALUE];
    setValue('substractingOptions', next);
  };
  const removeTurn = () => {
    const next = substrOpts.slice(0, -1);
    setValue('substractingOptions', next);
  };

  const onSubmit: SubmitHandler<NewCounterFormValues> = (data) => {
    onAddCounter({ ...data, additions: [] });
    closeModal();
  };

  return (
    <form
      className="flex flex-col gap-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <InputCard>
            <label
              className="font-bold"
              htmlFor={field.name}
            >
              Títol
            </label>
            <div className="flex justify-between items-center">
              <input
                id={field.name}
                type="text"
                placeholder={new Date().getFullYear().toString()}
                {...field}
              />
              <span
                className={`text-black/70 ${
                  MAX_COUNTER_TITLE_LENGTH - field.value.length < 0 &&
                  'text-error'
                }`}
              >
                {MAX_COUNTER_TITLE_LENGTH - field.value.length}/
                {MAX_COUNTER_TITLE_LENGTH}
              </span>
            </div>
            {errors.title && <FormError>{errors.title.message}</FormError>}
          </InputCard>
        )}
      />

      <Controller
        control={control}
        name="remainingHours"
        render={({ field }) => (
          <InputCard>
            <label
              className="font-bold"
              htmlFor={field.name}
            >
              Dèbit horari
            </label>
            <input
              id={field.name}
              type="number"
              {...field}
              onChange={(e) =>
                field.onChange(
                  isNaN(e.target.valueAsNumber) ? '' : e.target.valueAsNumber
                )
              }
            />
            {errors.remainingHours && (
              <FormError>{errors.remainingHours.message}</FormError>
            )}
          </InputCard>
        )}
      />

      <InputCard className="space-y-2">
        <div className="flex justify-between">
          <label className="font-bold">Torns</label>
          <div className="flex gap-x-2">
            <ArrayButton
              disabled={substrOpts.length === 1}
              onClick={removeTurn}
            >
              &ndash;
            </ArrayButton>
            <ArrayButton onClick={addTurn}>+</ArrayButton>
          </div>
        </div>
        {errors.substractingOptions?.root && (
          <FormError>{errors.substractingOptions.root.message}</FormError>
        )}
        {substrOpts.map((_, i) => (
          <Controller
            key={i}
            control={control}
            name={`substractingOptions.${i}` as const}
            render={({ field }) => (
              <div className="flex flex-col">
                <input
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const val = e.target.valueAsNumber;
                    const next = [...substrOpts];
                    next[i] = isNaN(val) ? 0 : val;
                    field.onChange(isNaN(val) ? '' : val);
                  }}
                />
                {errors.substractingOptions?.[i] && (
                  <FormError>{errors.substractingOptions[i].message}</FormError>
                )}
              </div>
            )}
          />
        ))}
      </InputCard>

      <SubmitButton />
    </form>
  );
};
