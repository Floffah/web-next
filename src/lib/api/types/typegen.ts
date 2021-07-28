/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { QueryContext } from "./context";
import type { connectionPluginCore } from "nexus";

declare global {
    interface NexusGenCustomOutputMethods<TypeName extends string> {
        /**
         * Adds a Relay-style connection to the type, with numerous options for configuration
         *
         * @see https://nexusjs.org/docs/plugins/connection
         */
        connectionField<FieldName extends string>(
            fieldName: FieldName,
            config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>,
        ): void
    }
}


declare global {
    interface NexusGen extends NexusGenTypes {
    }
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
    Permission: "ADMINISTRATOR" | "EDIT_PRODUCTS"
}

export interface NexusGenScalars {
    String: string
    Int: number
    Float: number
    Boolean: boolean
    ID: string
}

export interface NexusGenObjects {
    AccessTokens: { // root type
        access?: string | null; // String
        refresh?: string | null; // String
    }
    Mutation: {};
    PageInfo: { // root type
        endCursor?: string | null; // String
        hasNextPage: boolean; // Boolean!
        hasPreviousPage: boolean; // Boolean!
        startCursor?: string | null; // String
    }
    Product: { // root type
        cons: string[]; // [String!]!
        id: number; // Int!
        name: string; // String!
        pros: string[]; // [String!]!
    }
    ProductConnection: { // root type
        edges?: Array<NexusGenRootTypes["ProductEdge"] | null> | null; // [ProductEdge]
        pageInfo: NexusGenRootTypes["PageInfo"]; // PageInfo!
    }
    ProductEdge: { // root type
        cursor: string; // String!
        node?: NexusGenRootTypes["Product"] | null; // Product
    }
    Query: {};
    Role: { // root type
        id: number; // Int!
        name: string; // String!
        permissions: NexusGenEnums["Permission"][]; // [Permission!]!
    }
    User: { // root type
        discordId: string; // ID!
        id: number; // Int!
        roleId?: number | null; // Int
        username: string; // String!
    }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
    AccessTokens: { // field return type
        access: string | null; // String
        refresh: string | null; // String
    }
    Mutation: { // field return type
        getAccess: NexusGenRootTypes["AccessTokens"] | null; // AccessTokens
        refresh: NexusGenRootTypes["AccessTokens"] | null; // AccessTokens
    }
    PageInfo: { // field return type
        endCursor: string | null; // String
        hasNextPage: boolean; // Boolean!
        hasPreviousPage: boolean; // Boolean!
        startCursor: string | null; // String
    }
    Product: { // field return type
        cons: string[]; // [String!]!
        id: number; // Int!
        name: string; // String!
        pros: string[]; // [String!]!
    }
    ProductConnection: { // field return type
        edges: Array<NexusGenRootTypes["ProductEdge"] | null> | null; // [ProductEdge]
        pageInfo: NexusGenRootTypes["PageInfo"]; // PageInfo!
    }
    ProductEdge: { // field return type
        cursor: string; // String!
        node: NexusGenRootTypes["Product"] | null; // Product
    }
    Query: { // field return type
        getRole: NexusGenRootTypes["Role"] | null; // Role
        me: NexusGenRootTypes["User"] | null; // User
        ping: string | null; // String
        products: NexusGenRootTypes["ProductConnection"] | null; // ProductConnection
    }
    Role: { // field return type
        id: number; // Int!
        name: string; // String!
        permissions: NexusGenEnums["Permission"][]; // [Permission!]!
    }
    User: { // field return type
        discordId: string; // ID!
        id: number; // Int!
        roleId: number | null; // Int
        username: string; // String!
    }
}

export interface NexusGenFieldTypeNames {
    AccessTokens: { // field return type name
        access: "String"
        refresh: "String"
    }
    Mutation: { // field return type name
        getAccess: "AccessTokens"
        refresh: "AccessTokens"
    }
    PageInfo: { // field return type name
        endCursor: "String"
        hasNextPage: "Boolean"
        hasPreviousPage: "Boolean"
        startCursor: "String"
    }
    Product: { // field return type name
        cons: "String"
        id: "Int"
        name: "String"
        pros: "String"
    }
    ProductConnection: { // field return type name
        edges: "ProductEdge"
        pageInfo: "PageInfo"
    }
    ProductEdge: { // field return type name
        cursor: "String"
        node: "Product"
    }
    Query: { // field return type name
        getRole: "Role"
        me: "User"
        ping: "String"
        products: "ProductConnection"
    }
    Role: { // field return type name
        id: "Int"
        name: "String"
        permissions: "Permission"
    }
    User: { // field return type name
        discordId: "ID"
        id: "Int"
        roleId: "Int"
        username: "String"
    }
}

export interface NexusGenArgTypes {
    Mutation: {
        getAccess: { // args
            access_token: string; // String!
        }
        refresh: { // args
            access: string; // String!
            refresh: string; // String!
        }
    }
    Query: {
        getRole: { // args
            id: number; // Int!
        }
        products: { // args
            after?: string | null; // String
            before?: string | null; // String
            first?: number | null; // Int
            last?: number | null; // Int
        }
    }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
    abstractTypeStrategies: {
        isTypeOf: false
        resolveType: true
        __typename: false
    }
}

export interface NexusGenTypes {
    context: QueryContext;
    inputTypes: NexusGenInputs;
    rootTypes: NexusGenRootTypes;
    inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
    argTypes: NexusGenArgTypes;
    fieldTypes: NexusGenFieldTypes;
    fieldTypeNames: NexusGenFieldTypeNames;
    allTypes: NexusGenAllTypes;
    typeInterfaces: NexusGenTypeInterfaces;
    objectNames: NexusGenObjectNames;
    inputNames: NexusGenInputNames;
    enumNames: NexusGenEnumNames;
    interfaceNames: NexusGenInterfaceNames;
    scalarNames: NexusGenScalarNames;
    unionNames: NexusGenUnionNames;
    allInputTypes: NexusGenTypes["inputNames"] | NexusGenTypes["enumNames"] | NexusGenTypes["scalarNames"];
    allOutputTypes: NexusGenTypes["objectNames"] | NexusGenTypes["enumNames"] | NexusGenTypes["unionNames"] | NexusGenTypes["interfaceNames"] | NexusGenTypes["scalarNames"];
    allNamedTypes: NexusGenTypes["allInputTypes"] | NexusGenTypes["allOutputTypes"]
    abstractTypes: NexusGenTypes["interfaceNames"] | NexusGenTypes["unionNames"];
    abstractTypeMembers: NexusGenAbstractTypeMembers;
    objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
    abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
    features: NexusGenFeaturesConfig;
}


declare global {
    interface NexusGenPluginTypeConfig<TypeName extends string> {
    }

    interface NexusGenPluginInputTypeConfig<TypeName extends string> {
    }

    interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {

    }

    interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
    }

    interface NexusGenPluginSchemaConfig {
    }

    interface NexusGenPluginArgConfig {
    }
}
