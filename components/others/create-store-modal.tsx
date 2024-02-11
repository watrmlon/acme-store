"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import { Modal } from "@/components/shared/modal";
import React from "react";
import axios from "axios";
import { toast } from "sonner";
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
    .max(52, { message: "Must be at most 52 or less characters" }),
});

type CreateStoreSchema = z.infer<typeof createStoreSchema>;

export function CreateStoreModal() {
  const _create_store_modal = useModalStore();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<CreateStoreSchema>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: CreateStoreSchema) {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/stores/v1", values);
      toast.success("Store created🎉.", {
        description: `Store ${values.name} was created successfully.`,
      });
    } catch (error) {
      toast.error("Failed to create store.", {
        description: `Could not create store ${values.name}, please try again later.`,
      });
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
              onClick={_create_store_modal.onClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />
              ) : null}
              Create
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
