import { NextPage } from "next";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export function withQuery(Component: NextPage) {
    const queryClient = new QueryClient();

    const ComponentWrapper = props => {
        return (
            <QueryClientProvider client={queryClient}>
                <Component {...props} queryClient={queryClient} />
                {/* <ReactQueryDevtools /> */}
            </QueryClientProvider>
        )
    }

    return ComponentWrapper
}