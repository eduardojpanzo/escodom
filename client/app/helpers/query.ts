import { queryClient } from "~/lib/query";

type InvalidateProps = {
  queryKey: string;
};

export async function invalidateQueries(props: InvalidateProps) {
  await queryClient.invalidateQueries({
    predicate: (query) => query.queryKey.includes(props.queryKey),
  });
}
