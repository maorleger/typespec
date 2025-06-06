import { createTypeSpecLibrary, JSONSchemaType, paramMessage } from "@typespec/compiler";
import { CollectionType, resolveCollectionType } from "./interfaces.js";

export interface CSharpServiceEmitterOptions {
  /**Skip formatting of output. Default is false (generated c-sharp files are formatted) */
  "skip-format"?: boolean;
  /** Choose which service artifacts to emit.  Default is 'all'.*/
  "output-type"?: "models" | "all";
  /** Emit mock implementations of business logic, setup code, and project files. Allows the service to respond to requests with mock responses.*/
  "emit-mocks"?: "none" | "mocks-only" | "mocks-and-project-files";
  /** Configure a Swagger UI endpoint in the development configuration. */
  "use-swaggerui"?: boolean;
  /** Use openapi at the given path for generating SwaggerUI endpoints. By default, this will be 'openapi/openapi.yaml' if the 'use-swaggerui' option is enabled. */
  "openapi-path"?: string;
  /** When generating mock files, overwrite any existing files with the same name. */
  overwrite?: boolean;
  /** The generated project name. */
  "project-name"?: string;
  /** The http port number to use when hosting the service locally */
  "http-port"?: number;
  /** The https port number to use when hosting the service locally */
  "https-port"?: number;
  /** Specifies the collection type to use: 'array' or 'enumerable'. The default is 'enumerable'." */
  "collection-type"?: "array" | "enumerable";
}

const EmitterOptionsSchema: JSONSchemaType<CSharpServiceEmitterOptions> = {
  type: "object",
  additionalProperties: false,
  properties: {
    "skip-format": {
      type: "boolean",
      nullable: true,
      description:
        "Skips formatting of generated C# Types.  By default, C# files are formatted using 'dotnet format'.",
    },
    "output-type": {
      type: "string",
      enum: ["models", "all"],
      nullable: true,
      default: "all",
      description:
        "Chooses which service artifacts to emit. choices include 'models' or 'all' artifacts.",
    },
    "emit-mocks": {
      type: "string",
      enum: ["mocks-and-project-files", "mocks-only", "none"],
      nullable: true,
      default: "none",
      description:
        "Emits mock implementations of business logic, setup code, and project files, enabling the service to respond to requests before a real implementation is provided",
    },
    "use-swaggerui": {
      type: "boolean",
      nullable: true,
      default: false,
      description: "Configure a Swagger UI endpoint in the development configuration",
    },
    "openapi-path": {
      type: "string",
      nullable: true,
      default: null,
      description:
        "Use openapi at the given path for generating SwaggerUI endpoints. By default, this will be 'openapi/openapi.yaml' if the 'use-swaggerui' option is enabled. ",
    },
    overwrite: {
      type: "boolean",
      nullable: true,
      default: false,
      description:
        "When generating mock and project files, overwrite any existing files with the same name.",
    },
    "project-name": {
      type: "string",
      nullable: true,
      default: "ServiceProject",
      description: "The name of the generated project.",
    },
    "http-port": {
      type: "number",
      nullable: true,
      description: "The service http port when hosting the project locally.",
    },
    "https-port": {
      type: "number",
      nullable: true,
      description: "The service https port when hosting the project locally.",
    },
    "collection-type": {
      type: "string",
      enum: ["array", "enumerable"],
      nullable: true,
      default: "array",
      description:
        "Specifies the collection type to use: 'array' or 'enumerable'. The default is 'array'.",
    },
  },
  required: [],
};

export const $lib = createTypeSpecLibrary({
  name: "@typespec/http-server-csharp",
  capabilities: {
    dryRun: true,
  },
  diagnostics: {
    "invalid-identifier": {
      severity: "warning",
      messages: {
        default: paramMessage`Invalid identifier '${"identifier"}' in ${"location"}`,
      },
    },
    "anonymous-model": {
      severity: "warning",
      messages: {
        default: paramMessage`Inline models use generated names in emitted code. Consider defining each model with an explicit name.  This model will be named '${"emittedName"}' in emitted code`,
      },
    },
    "missing-type-parent": {
      severity: "warning",
      messages: {
        default: paramMessage`No parent found for ${"type"} ${"name"} `,
      },
    },
    "no-numeric": {
      severity: "warning",
      messages: {
        default: paramMessage`Type '${"sourceType"}' is an imprecise type that does not map directly to a single numeric type, using '${"targetType"}' as the safest c# numeric type.  Please specify a more precise numeric type, like 'int32' or 'float64'`,
      },
    },
    "unrecognized-scalar": {
      severity: "warning",
      messages: {
        default: paramMessage`Scalar type ${"typeName"} is not a recognized scalar type.  Please use or extend a built-in scalar type.`,
      },
    },
    "invalid-intrinsic": {
      severity: "error",
      messages: {
        default: paramMessage`Intrinsic type ${"typeName"} is not valid in this context.  Please use a model, enum, union, scalar, or the unknown type`,
      },
    },
    "invalid-interpolation": {
      severity: "warning",
      messages: {
        default: paramMessage`StringTemplate types should only reference literal-valued constants, enum members, or literal-valued model properties.  The interpolated value will not contain one or more referenced elements in generated code.`,
      },
    },
    "get-request-body": {
      severity: "warning",
      messages: {
        default: paramMessage`Get operations should not have request bodies. Generating an operation and interface without parameters, your business logic will use HttpContext to interpret Request properties.`,
      },
    },
  },
  emitter: {
    options: EmitterOptionsSchema as JSONSchemaType<CSharpServiceEmitterOptions>,
  },
});

export const { reportDiagnostic, createStateSymbol, getTracer } = $lib;

export type CSharpServiceLibrary = typeof $lib;

export class CSharpServiceOptions {
  private static instance: CSharpServiceOptions;
  public collectionType: CollectionType;

  private constructor() {
    this.collectionType = CollectionType.Array;
  }

  public static getInstance(): CSharpServiceOptions {
    if (!CSharpServiceOptions.instance) {
      CSharpServiceOptions.instance = new CSharpServiceOptions();
    }
    return CSharpServiceOptions.instance;
  }

  public initialize(options: { "collection-type"?: string }) {
    this.collectionType = resolveCollectionType(options["collection-type"]);
  }
}
