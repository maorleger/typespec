// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System;
using System.Collections.Generic;

namespace Microsoft.TypeSpec.Generator.Input
{
    /// <summary>
    /// Represents an input operation.
    /// </summary>
    public class InputOperation
    {
        public InputOperation(
            string name,
            string? resourceName,
            string? summary,
            string? doc,
            string? deprecated,
            string? accessibility,
            IReadOnlyList<InputParameter> parameters,
            IReadOnlyList<InputOperationResponse> responses,
            string httpMethod,
            string uri,
            string path,
            string? externalDocsUrl,
            IReadOnlyList<string>? requestMediaTypes,
            bool bufferResponse,
            bool generateProtocolMethod,
            bool generateConvenienceMethod,
            string crossLanguageDefinitionId)
        {
            Name = name;
            ResourceName = resourceName;
            Summary = summary;
            Doc = doc;
            Deprecated = deprecated;
            Accessibility = accessibility;
            Parameters = parameters;
            Responses = responses;
            HttpMethod = httpMethod;
            Uri = uri;
            Path = path;
            ExternalDocsUrl = externalDocsUrl;
            RequestMediaTypes = requestMediaTypes;
            BufferResponse = bufferResponse;
            GenerateProtocolMethod = generateProtocolMethod;
            GenerateConvenienceMethod = generateConvenienceMethod;
            CrossLanguageDefinitionId = crossLanguageDefinitionId;
        }

        public InputOperation() : this(
            name: string.Empty,
            resourceName: null,
            summary: string.Empty,
            doc: string.Empty,
            deprecated: null,
            accessibility: null,
            parameters: Array.Empty<InputParameter>(),
            responses: Array.Empty<InputOperationResponse>(),
            httpMethod: string.Empty,
            uri: string.Empty,
            path: string.Empty,
            externalDocsUrl: null,
            requestMediaTypes: Array.Empty<string>(),
            bufferResponse: false,
            generateProtocolMethod: true,
            generateConvenienceMethod: false,
            crossLanguageDefinitionId: string.Empty)
        { }

        public string Name { get; internal set; }
        public string? ResourceName { get; internal set; }
        public string? Summary { get; internal set; }
        public string? Doc { get; internal set; }
        public string? Deprecated { get; internal set; }
        public string? Accessibility { get; internal set; }
        public IReadOnlyList<InputParameter> Parameters { get; internal set; }
        public IReadOnlyList<InputOperationResponse> Responses { get; internal set; }
        public string HttpMethod { get; internal set; }
        public string Uri { get; internal set; }
        public string Path { get; internal set; }
        public string? ExternalDocsUrl { get; internal set; }
        public IReadOnlyList<string>? RequestMediaTypes { get; internal set; }
        public bool BufferResponse { get; internal set; }
        public bool GenerateProtocolMethod { get; internal set; }
        public bool GenerateConvenienceMethod { get; internal set; }
        public string CrossLanguageDefinitionId { get; internal set; }
        public IReadOnlyList<InputDecoratorInfo> Decorators { get; internal set; } = new List<InputDecoratorInfo>();

        private IReadOnlyDictionary<string, InputOperationExample>? _examples;
        internal IReadOnlyDictionary<string, InputOperationExample> Examples => _examples ??= EnsureExamples();

        private IReadOnlyDictionary<string, InputOperationExample> EnsureExamples()
        {
            return new Dictionary<string, InputOperationExample>()
            {
                [ExampleMockValueBuilder.ShortVersionMockExampleKey] = ExampleMockValueBuilder.BuildOperationExample(this, false),
                [ExampleMockValueBuilder.MockExampleAllParameterKey] = ExampleMockValueBuilder.BuildOperationExample(this, true)
            };
        }

        private bool? _isMultipartFormData;
        public bool IsMultipartFormData => _isMultipartFormData ??= RequestMediaTypes is not null && RequestMediaTypes.Count == 1 && RequestMediaTypes[0] == "multipart/form-data";
    }
}
