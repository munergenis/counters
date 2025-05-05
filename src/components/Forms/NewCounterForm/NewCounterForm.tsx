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

import { Counter } from '@/lib/types/counter';
import { FormError } from '../components';
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
          <div className="flex flex-col text-purple-800 bg-purple-200 p-2 font-semibold rounded-sm">
            <label htmlFor="title">Titulo</label>
            <div className="relative">
              <input
                className="bg-purple-50 p-2 rounded-sm"
                id={field.name}
                type="text"
                placeholder={new Date().getFullYear().toString()}
                {...field}
              />
              <span
                className={`absolute inset-y-0 right-0 ${
                  MAX_COUNTER_TITLE_LENGTH - field.value.length < 0 &&
                  'text-red-600'
                }`}
              >
                {MAX_COUNTER_TITLE_LENGTH - field.value.length}/10
              </span>
            </div>
            {errors.title && <FormError>{errors.title.message}</FormError>}
          </div>
        )}
      />

      <Controller
        control={control}
        name="remainingHours"
        render={({ field }) => (
          <div className="flex flex-col text-purple-800 bg-purple-200 p-2 font-semibold rounded-sm">
            <label htmlFor={field.name}>Horas Restantes</label>
            <input
              className="bg-purple-50 p-2 rounded-sm"
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
          </div>
        )}
      />

      <div className="flex flex-col space-y-2 text-purple-800 bg-purple-200 p-2 font-semibold rounded-sm">
        <div className="flex justify-between">
          <label>Turnos</label>
          <div className="flex gap-x-2">
            <button
              className="w-8 h-8 rounded-full flex items-baseline justify-center font-semibold text-xl bg-purple-50 disabled:hidden"
              type="button"
              disabled={substrOpts.length === 1}
              onClick={removeTurn}
            >
              &ndash;
            </button>
            <button
              className="w-8 h-8 rounded-full flex items-baseline justify-center font-semibold text-xl bg-purple-50"
              type="button"
              onClick={addTurn}
            >
              +
            </button>
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
              <>
                <input
                  className="bg-purple-50 p-2 rounded-sm"
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
              </>
            )}
          />
        ))}
      </div>

      <button
        className="bg-purple-400 text-white font-semibold text-2xl py-2 rounded-sm"
        type="submit"
      >
        Añadir
      </button>
    </form>
  );
};
