import { useEffect, useMemo, useState } from "react";

export const useLookup = ({
  key,
  id,
  lookupKey,
  route,
  invalidate,
}: {
  key: string;
  id: string;
  lookupKey: string;
  route: any;
  invalidate: any;
}) => {
  const rawData = route.all.useQuery({
    filter: { column: key, value: id, eq: true },
    sort: [],
  });
  const deleteRow = route.delete.useMutation();
  const { mutateAsync, error } = route.create.useMutation({});

  const defaultValues = useMemo(
    () =>
      rawData.isLoading || !rawData.data
        ? []
        : rawData.data.map((value: any) => value[lookupKey] ?? value.id),
    [rawData.data, rawData.isLoading],
  );

  const [lookupData, setLookupData] = useState(defaultValues);

  useEffect(() => {
    setLookupData(defaultValues);
  }, [defaultValues]);

  const onSaveLookupLinks = async () => {
    const data = lookupData;
    const toDelete = defaultValues.filter(
      (value: any) => !data.includes(value),
    );
    const toInsert = data.filter(
      (value: any) => !defaultValues.includes(value),
    );

    if (toDelete.length > 0) {
      toDelete.forEach(async (value: number) => {
        await deleteRow.mutateAsync(value);
      });
    }

    if (toInsert.length > 0) {
      toInsert.forEach(async (value: number) => {
        await mutateAsync({ [key]: parseInt(id), [lookupKey]: value });
      });
    }

    if (toDelete.length > 0 || toInsert.length > 0) {
      await invalidate();
    }
  };

  return { defaultValues, onSaveLookupLinks, lookupData, setLookupData };
};
