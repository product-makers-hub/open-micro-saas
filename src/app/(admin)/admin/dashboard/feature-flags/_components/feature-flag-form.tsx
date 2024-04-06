"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { createFeatureFlagAction } from "../actions";
import { featureFlagSchema } from "../schemas";

interface FeatureFlagFormProps {
  onSuccess: () => void;
}

export const FeatureFlagForm = ({ onSuccess }: FeatureFlagFormProps) => {
  const form = useForm<z.infer<typeof featureFlagSchema>>({
    resolver: zodResolver(featureFlagSchema),
    defaultValues: {
      name: "",
      isEnabled: true,
    },
  });

  async function handleSubmit(values: z.infer<typeof featureFlagSchema>) {
    const { name, isEnabled } = values;
    const result = await createFeatureFlagAction(name, isEnabled);

    if (result.success) {
      form.reset();
      onSuccess();
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        id="create_feature_flag"
        className="space-y-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  style={{ textTransform: "uppercase" }}
                  placeholder="my_feature_flag"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Use only uppercase letters, numbers, and underscores.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isEnabled"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Is enabled</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row-reverse">
          <Button disabled={isSubmitting} type="submit">
            Save feature flag
          </Button>
        </div>
      </form>
    </Form>
  );
};
