"use client";

import { type } from "os";
import { useCallback, useEffect, useMemo } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";

import { auth } from "@media/db";

import type { IFeield } from "~/app/_components/FormView/FormView.types";
import { InputTypes } from "~/app/_components/FormView/FormView.types";
import { FormViewItem } from "~/app/_components/FormViewItem";
import { Checkbox } from "~/app/_components/ui/checkbox";
import { Form, FormField } from "~/app/_components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/_components/ui/table";
import { api } from "~/utils/api";

export default function Page() {
  const pathname = usePathname();
  const Router = useRouter();
  interface formType {
    media_read: boolean;
    media_write: boolean;
    media_delete: boolean;
    branding_read: boolean;
    branding_write: boolean;
    branding_delete: boolean;
    cast_read: boolean;
    cast_write: boolean;
    cast_delete: boolean;
    screens_read: boolean;
    screens_write: boolean;
    screens_delete: boolean;
    dictionary_read: boolean;
    dictionary_write: boolean;
    dictionary_delete: boolean;
    menu_read: boolean;
    menu_write: boolean;
    menu_delete: boolean;
    purcchase_read: boolean;
    purcchase_write: boolean;
    purcchase_delete: boolean;
  }

  const privileges = {
    media_read: true,
    media_write: true,
    media_delete: true,
    branding_read: true,
    branding_write: true,
    branding_delete: true,
    cast_read: true,
    cast_write: true,
    cast_delete: true,
    screens_read: true,
    screens_write: true,
    screens_delete: true,
    dictionary_read: true,
    dictionary_write: true,
    dictionary_delete: true,
    menu_read: true,
    menu_write: true,
    menu_delete: true,
    purcchase_read: true,
    purcchase_write: true,
    purcchase_delete: true,
  };

  const privilagesHeaders = [
    "media",
    "branding",
    "cast",
    "screens",
    "dictionary",
    "menu",
    "purcchase",
  ];

  const utils = api.useUtils();

  const schema = auth.privilages;
  const userRoute = api.user;
  const privilageRoute = api.userPrivilege;
  const util = utils.user;

  const invalidate = util.all.invalidate;
  type insertType = typeof schema;
  const routeParams = useParams<{ id: string }>();
  const id = useMemo(() => routeParams.id, [routeParams.id]);
  const rawData = userRoute.byId.useQuery({ id });

  const form = useForm<formType>({});

  useEffect(() => {
    // TODO: parse ints to booleans
    // if (rawData.data) form.reset(rawData.data);
  }, [rawData.data]);

  const { mutateAsync, error } = privilageRoute.update.useMutation({
    async onSuccess() {
      await invalidate();
    },
  });

  const goBack = useCallback(() => {
    const desiredPath = pathname.split("/edit")[0]!;
    Router.push(desiredPath);
  }, [pathname, Router]);

  const onBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const onSubmit = async (values: formType) => {
    // TODO: parse booleans to ints
    // const result = await mutateAsync(values);
    await invalidate();
    // return result;
  };

  const onValidSubmit = useCallback(
    async (data: any) => {
      data.updatedAt = new Date();
      data.updatedBy = "1";
      data.isDeleted = false;

      if (onSubmit) {
        try {
          const result = await onSubmit(data);
          goBack();
        } catch (error) {
          alert("Error submitting data.");
        }
      } else {
        goBack();
      }
    },
    [onSubmit, type, goBack],
  );

  return (
    <>
      <Form {...form}>
        <div className="mb-4 flex items-center justify-evenly">
          <Button className=" ml-6" onClick={onBack}>
            <ArrowLeft />
            Back
          </Button>
          <h2 className="mt-6 scroll-m-20 border-b pb-2 text-center text-3xl font-semibold tracking-tight first:mt-0">
            Privileges for user
          </h2>
        </div>
        <form onSubmit={form.handleSubmit(onValidSubmit)} className="space-y-8">
          <Table>
            <TableHeader>
              <TableRow key="privilage_header">
                <TableHead key="header_privilageName">Privilege Name</TableHead>
                <TableHead className="text-center" key="header_read">
                  read
                </TableHead>
                <TableHead className="text-center" key="header_write">
                  write
                </TableHead>
                <TableHead className="text-center" key="header_delete">
                  delete
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {privilagesHeaders.map((key) => (
                <TableRow key={key}>
                  <TableCell key={`${key}_name`}>{key}</TableCell>
                  <TableCell key={`${key}_read`}>
                    {/* <Checkbox id={`${key}_read`} /> */}

                    <FormField
                      {...(typeof form !== "undefined"
                        ? { control: form.control }
                        : {})}
                      name={`${key}_read` as keyof formType}
                      render={({ field }) => {
                        return FormViewItem({
                          isLabelVisible: false,
                          field: field as unknown as IFeield,
                          classes: "",
                          type: InputTypes.checkbox,
                          register: form?.register,
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell key={`${key}_write`}>
                    <FormField
                      {...(typeof form !== "undefined"
                        ? { control: form.control }
                        : {})}
                      name={`${key}_write` as keyof formType}
                      render={({ field }) => {
                        return FormViewItem({
                          isLabelVisible: false,
                          field: field as unknown as IFeield,
                          classes: "",
                          type: InputTypes.checkbox,
                          register: form?.register,
                        });
                      }}
                    />
                  </TableCell>
                  <TableCell key={`${key}_delete`}>
                    <FormField
                      {...(typeof form !== "undefined"
                        ? { control: form.control }
                        : {})}
                      name={`${key}_delete` as keyof formType}
                      render={({ field }) => {
                        return FormViewItem({
                          isLabelVisible: false,
                          field: field as unknown as IFeield,
                          classes: "",
                          type: InputTypes.checkbox,
                          register: form?.register,
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
