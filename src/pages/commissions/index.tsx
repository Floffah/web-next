import React, { FC, useRef } from "react";
import CommissionsHeader from "../../components/display/CommissionsHeader/CommissionsHeader";
import NavBar from "../../components/navigation/NavBar/NavBar";
import { useQuery } from "urql";
import gql from "graphql-tag";
import { NexusGenRootTypes } from "../../lib/api/types/typegen";
import CommissionsProsAndCons from "../../components/display/CommissionsProsAndCons/CommissionsProsAndCons";
import { NextSeo } from "next-seo";

const CommissionsPage: FC = () => {
    const [products] = useQuery({
        query: gql`
            query GetProducts {
                products(first: 10) {
                    edges {
                        node {
                            id
                            name
                            cons
                            pros
                        }
                    }
                }
            }
        `,
    });

    const headerRef = useRef<HTMLDivElement>(null);

    const productnodes = products.data
        ? products.data.products.edges.map(
              (edge: NexusGenRootTypes["ProductEdge"]) => edge.node,
          )
        : undefined;

    return (
        <>
            <NextSeo title="Commissions Overview" />
            <NavBar headerRef={headerRef} />
            <CommissionsHeader
                headerRef={headerRef}
                fetching={products.fetching}
                products={productnodes}
            />
            <CommissionsProsAndCons
                fetching={products.fetching}
                products={productnodes}
            />
        </>
    );
};

export default CommissionsPage;
