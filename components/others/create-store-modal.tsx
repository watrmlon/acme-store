"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/shared/modal";
import { useForm } from "react-hook-form";
import { useModalStore } from "@/hooks/use-modal-store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createStoreSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Must be at least 2 or more characters",
    })
    .max(25, { message: "Must be at most 25 or less characters" }),
});

type CreateStoreSchema = z.infer<typeof createStoreSchema>;

export function CreateStoreModal() {
  const _create_store_modal = useModalStore();

  const form = useForm<CreateStoreSchema>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: CreateStoreSchema) {
    console.log(values);
  }

  return (
    <Modal
      title="Create a Store"
      description="Add a new store to manage Products, Categories, Sales, and More."
      isOpen={_create_store_modal.isOpen}
      onClose={_create_store_modal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input placeholder="ex. johndoe's sticker packs" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end gap-x-2">
            <Button
              type="button"
              variant="ghost"
              onClick={_create_store_modal.onClose}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
