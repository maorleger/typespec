// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System;
using Microsoft.TypeSpec.Generator.Expressions;
using Microsoft.TypeSpec.Generator.Snippets;
using NUnit.Framework;

namespace Microsoft.TypeSpec.Generator.Tests.Snippets
{
    public class ConvertSnippetsTests
    {

        public ConvertSnippetsTests()
        {
            MockHelpers.LoadMockGenerator();
        }

        [Test]
        public void InvokeToDouble()
        {
            var arg = Snippet.Literal("2.0");
            InvokeMethodExpression result = ConvertSnippets.InvokeToDouble(arg);

            Assert.AreEqual(nameof(Convert.ToDouble), result.MethodName);
            using CodeWriter writer = new CodeWriter();
            result.Write(writer);
            Assert.AreEqual("global::System.Convert.ToDouble(\"2.0\")", writer.ToString(false));
        }

        [Test]
        public void InvokeToInt32()
        {
            var arg = Snippet.Literal("2");
            InvokeMethodExpression result = ConvertSnippets.InvokeToInt32(arg);

            Assert.AreEqual(nameof(Convert.ToInt32), result.MethodName);
            using CodeWriter writer = new CodeWriter();
            result.Write(writer);
            Assert.AreEqual("global::System.Convert.ToInt32(\"2\")", writer.ToString(false));
        }
    }
}
