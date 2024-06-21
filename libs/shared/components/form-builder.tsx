"use client";

import { useRequest } from "ahooks";
import { capitalCase } from "change-case";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import { IComponentBaseProps, ISafeAny } from "../types";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../ui";
import { cn, mp } from "../utils";

type _IFormBuilderItem<
  TValues extends FieldValues,
  TName extends Path<TValues> = Path<TValues>,
> =
  TName extends Path<TValues>
    ? {
        name: TName;
        label?: string;
        renderControl?: (
          field: ControllerRenderProps<TValues, TName>
        ) => JSX.Element;
        description?: string;
        required?: boolean;
        disabled?: boolean;
      }
    : never;

export type IFormBuilderItem<TValues extends FieldValues> =
  _IFormBuilderItem<TValues>;

export type IFormBuilderItems<TValues extends FieldValues> =
  IFormBuilderItem<TValues>[];

export type IFormBuilderPropsOnSubmit<TValues extends FieldValues> = (
  values: TValues
) => void | Promise<void>;

export interface IFormBuilderProps<TValues extends FieldValues>
  extends IComponentBaseProps {
  items: IFormBuilderItem<TValues>[];
  form: UseFormReturn<TValues, ISafeAny, ISafeAny>;
  onSubmit?: IFormBuilderPropsOnSubmit<TValues>;
  getSubmitText?: (loading: boolean) => React.ReactNode;
  /**
   * @default 'left'
   */
  submitAlign?: "left" | "right";
  extra?: React.ReactNode;
}

export const FormBuilder = <TValues extends FieldValues>(
  props: IFormBuilderProps<TValues>
) => {
  const {
    items,
    form,
    onSubmit,
    getSubmitText = getDefaultSubmitText,
    submitAlign = "left",
    extra,
  } = props;
  const { run, loading } = useRequest(
    async (values: TValues) => onSubmit?.(values),
    { manual: true }
  );

  return (
    <Form {...form}>
      {mp(
        props,
        <form
          className="flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(run)}
        >
          {items.map(
            ({
              name,
              description,
              label,
              renderControl = defaultRenderControl,
              required,
              disabled,
            }) => (
              <FormField
                key={name}
                control={form.control}
                disabled={disabled === true}
                name={name}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      {label && capitalCase(label)}
                      {required && <span className="text-primary-500">*</span>}
                    </FormLabel>

                    <FormControl className="mt-3.5">
                      {renderControl(field as ISafeAny)}
                    </FormControl>
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      {description}
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            )
          )}

          <div className="flex flex-wrap gap-4">
            <Button
              className={cn(submitAlign === "right" && "ml-auto")}
              disabled={loading}
              variant="primary-gradient"
            >
              {getSubmitText(loading)}
            </Button>
            {extra}
          </div>
        </form>
      )}
    </Form>
  );
};

const getDefaultSubmitText = (loading: boolean) => {
  return loading ? "Submitting..." : "Submit";
};

const defaultRenderControl = (
  field: ControllerRenderProps<ISafeAny, string>
) => <Input {...field} />;