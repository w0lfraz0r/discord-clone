"use client";

import { useForm } from "react-hook-form"
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../ui/form";
import { Button } from "../ui/button";
import FileUpload from "../file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import React from "react";

const formSchema = z.object({
  fileUrl: z.string().min(1, { message: 'Attachment is required' }),
});

const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "messageFile";
  const { apiUrl, query } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    }
  })

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      })
      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      });
      form.reset();
      router.refresh();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent
        className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 p-6">
          <DialogTitle className="text-2xl text-center">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            send a file as a message.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => {
                    return <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  }}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-6">
              <Button
                variant="primary"
                disabled={isLoading}>
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;
