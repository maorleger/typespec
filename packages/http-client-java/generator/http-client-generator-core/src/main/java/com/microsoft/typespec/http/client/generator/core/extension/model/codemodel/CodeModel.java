// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

package com.microsoft.typespec.http.client.generator.core.extension.model.codemodel;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents a code model.
 * <p>
 * A code model contains all the information required to generate a service API.
 */
public class CodeModel extends Client {
    private Info info;
    private Schemas schemas;
    private List<Client> clients = new ArrayList<>();
    private TestModel testModel;

    /**
     * Creates a new instance of the CodeModel class.
     */
    public CodeModel() {
        super();
    }

    /**
     * Gets the code model information. (Required)
     *
     * @return The code model information.
     */
    public Info getInfo() {
        return info;
    }

    /**
     * Sets the code model information. (Required)
     *
     * @param info The code model information.
     */
    public void setInfo(Info info) {
        this.info = info;
    }

    /**
     * Gets the full set of schemas for a given service, categorized into convenient collections. (Required)
     *
     * @return The full set of schemas for a given service, categorized into convenient collections.
     */
    public Schemas getSchemas() {
        return schemas;
    }

    /**
     * Sets the full set of schemas for a given service, categorized into convenient collections. (Required)
     *
     * @param schemas The full set of schemas for a given service, categorized into convenient collections.
     */
    public void setSchemas(Schemas schemas) {
        this.schemas = schemas;
    }

    /**
     * Gets the clients of the code model.
     *
     * @return The clients of the code model.
     */
    public List<Client> getClients() {
        return clients;
    }

    /**
     * Sets the clients of the code model.
     *
     * @param clients The clients of the code model.
     */
    public void setClients(List<Client> clients) {
        this.clients = clients;
    }

    /**
     * Gets the test model definition.
     *
     * @return The test model definition.
     */
    public TestModel getTestModel() {
        return testModel;
    }

    /**
     * Sets the test model definition.
     *
     * @param testModel The test model definition.
     */
    public void setTestModel(TestModel testModel) {
        this.testModel = testModel;
    }
}
