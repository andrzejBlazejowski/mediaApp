"use client";

import { type } from "os";
import { useCallback, useEffect, useMemo } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button, Table, TableHeader } from "@radix-ui/themes";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";

import { auth } from "@media/db";

import type { IFeield } from "~/app/_components/FormView/FormView.types";
import { InputTypes } from "~/app/_components/FormView/FormView.types";
import { FormViewItem } from "~/app/_components/FormViewItem";
import { Form, FormField } from "~/app/_components/ui/form";
import { api } from "~/utils/api";
import {
  getAccessIntValue,
  isDeleteAccess,
  isReadAccess,
  isWriteAccess,
  privilagesHeaders,
} from "./utils";

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
    purchase_read: boolean;
    purchase_write: boolean;
    purchase_delete: boolean;
  }

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
    if (rawData.data) {
      const parsedData = {
        media_read: isReadAccess(rawData.data.privilage?.media),
        media_write: isWriteAccess(rawData.data.privilage?.media),
        media_delete: isDeleteAccess(rawData.data.privilage?.media),
        branding_read: isReadAccess(rawData.data.privilage?.branding),
        branding_write: isWriteAccess(rawData.data.privilage?.branding),
        branding_delete: isDeleteAccess(rawData.data.privilage?.branding),
        cast_read: isReadAccess(rawData.data.privilage?.cast),
        cast_write: isWriteAccess(rawData.data.privilage?.cast),
        cast_delete: isDeleteAccess(rawData.data.privilage?.cast),
        screens_read: isReadAccess(rawData.data.privilage?.screens),
        screens_write: isWriteAccess(rawData.data.privilage?.screens),
        screens_delete: isDeleteAccess(rawData.data.privilage?.screens),
        dictionary_read: isReadAccess(rawData.data.privilage?.dictionary),
        dictionary_write: isWriteAccess(rawData.data.privilage?.dictionary),
        dictionary_delete: isDeleteAccess(rawData.data.privilage?.dictionary),
        menu_read: isReadAccess(rawData.data.privilage?.menu),
        menu_write: isWriteAccess(rawData.data.privilage?.menu),
        menu_delete: isDeleteAccess(rawData.data.privilage?.menu),
        purchase_read: isReadAccess(rawData.data.privilage?.purcchase),
        purchase_write: isWriteAccess(rawData.data.privilage?.purcchase),
        purchase_delete: isDeleteAccess(rawData.data.privilage?.purcchase),
      };
      form.reset(parsedData);
    }
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
    const result = await mutateAsync({
      media: getAccessIntValue({
        read: values.media_read,
        write: values.media_write,
        deleteAcc: values.media_delete,
      }),
      branding: getAccessIntValue({
        read: values.branding_read,
        write: values.branding_write,
        deleteAcc: values.branding_delete,
      }),
      cast: getAccessIntValue({
        read: values.cast_read,
        write: values.cast_write,
        deleteAcc: values.cast_delete,
      }),
      screens: getAccessIntValue({
        read: values.screens_read,
        write: values.screens_write,
        deleteAcc: values.screens_delete,
      }),
      dictionary: getAccessIntValue({
        read: values.dictionary_read,
        write: values.dictionary_write,
        deleteAcc: values.dictionary_delete,
      }),
      menu: getAccessIntValue({
        read: values.menu_read,
        write: values.menu_write,
        deleteAcc: values.menu_delete,
      }),
      purcchase: getAccessIntValue({
        read: values.purchase_read,
        write: values.purchase_write,
        deleteAcc: values.purchase_delete,
      }),
      userId: id,
      id: id,
    });
    await invalidate();
    return result;
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
          <Table.Root>
            <Table.Header>
              <Table.Row key="privilage_header">
                <TableHeader key="header_privilageName">
                  Privilege Name
                </TableHeader>
                <TableHeader className="text-center" key="header_read">
                  read
                </TableHeader>
                <TableHeader className="text-center" key="header_write">
                  write
                </TableHeader>
                <TableHeader className="text-center" key="header_delete">
                  delete
                </TableHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {privilagesHeaders.map((key) => (
                <Table.Row key={key}>
                  <Table.Cell key={`${key}_name`}>{key}</Table.Cell>
                  <Table.Cell key={`${key}_read`}>
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
                  </Table.Cell>
                  <Table.Cell key={`${key}_write`}>
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
                  </Table.Cell>
                  <Table.Cell key={`${key}_delete`}>
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
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          <div className="flex justify-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
