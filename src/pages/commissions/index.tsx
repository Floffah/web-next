import React, { FC, useRef } from "react";
import CommissionsHeader from "../../components/display/CommissionsHeader/CommissionsHeader";
import NavBar from "../../components/navigation/NavBar/NavBar";
import CommissionsProsAndCons from "../../components/display/CommissionsProsAndCons/CommissionsProsAndCons";
import { NextSeo } from "next-seo";
import { trpc } from "../../lib/hooks/trpc";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "../../lib/api/trpc/router";

const CommissionsPage: FC = () => {
    const products = trpc.useInfiniteQuery(["products.list", { limit: 10 }], {
        getNextPageParam: (last) => last.nextCursor,
    });

    const headerRef = useRef<HTMLDivElement>(null);

    let productnodes:
        | inferProcedureOutput<
              AppRouter["_def"]["queries"]["products.list"]
          >["items"]
        | undefined = undefined;

    if (products.data) {
        for (const page of products.data.pages) {
            for (const part of page.items) {
                if (!productnodes) productnodes = [];
                productnodes.push(part);
            }
        }
    }

    return (
        <>
            <NextSeo title="Commissions Overview" />
            <NavBar headerRef={headerRef} />
            <CommissionsHeader
                headerRef={headerRef}
                fetching={products.isFetching}
                products={productnodes}
            />
            <CommissionsProsAndCons
                fetching={products.isFetching}
                products={productnodes}
            />
        </>
    );
};

export default CommissionsPage;
