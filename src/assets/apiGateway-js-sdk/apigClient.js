/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (invokeUrl, config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    invokeUrl = invokeUrl || 'https://aluffh224i.execute-api.ap-southeast-1.amazonaws.com/Prod';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    var apiPost = function(method, params) {
        var postRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + '/' + method,
            headers: {},
            queryParams: {},
            body: params
        };

        return apiGatewayClient.makeRequest(postRequest, authType, {}, config.apiKey);
    };

    apigClient.addFacetToObject = function addFacetToObject(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.applySchema = function applySchema(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.attachObject = function attachObject(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.attachPolicy = function attachPolicy(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.attachToIndex = function attachToIndex(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.attachTypedLink = function attachTypedLink(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.batchRead = function batchRead(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.batchWrite = function batchWrite(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.createDirectory = function createDirectory(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.createFacet = function createFacet(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.createIndex = function createIndex(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.createObject = function createObject(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.createSchema = function createSchema(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.createTypedLinkFacet = function createTypedLinkFacet(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.deleteDirectory = function deleteDirectory(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.deleteFacet = function deleteFacet(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.deleteObject = function deleteObject(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.deleteSchema = function deleteSchema(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.deleteTypedLinkFacet = function deleteTypedLinkFacet(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.detachFromIndex = function detachFromIndex(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.detachObject = function detachObject(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.detachPolicy = function detachPolicy(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.detachTypedLink = function detachTypedLink(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.disableDirectory = function disableDirectory(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.enableDirectory = function enableDirectory(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.getDirectory = function getDirectory(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.getFacet = function getFacet(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.getObjectInformation = function getObjectInformation(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.getSchemaAsJson = function getSchemaAsJson(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.getTypedLinkFacetInformation = function getTypedLinkFacetInformation(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listAppliedSchemaArns = function listAppliedSchemaArns(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listAttachedIndices = function listAttachedIndices(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listDevelopmentSchemaArns = function listDevelopmentSchemaArns(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listDirectories = function listDirectories(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listFacetAttributes = function listFacetAttributes(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listFacetNames = function listFacetNames(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listIncomingTypedLinks = function listIncomingTypedLinks(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listIndex = function listIndex(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listObjectAttributes = function listObjectAttributes(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listObjectChildren = function listObjectChildren(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listObjectParentPaths = function listObjectParentPaths(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listObjectParents = function listObjectParents(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listObjectPolicies = function listObjectPolicies(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listOutgoingTypedLinks = function listOutgoingTypedLinks(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listPolicyAttachments = function listPolicyAttachments(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listPublishedSchemaArns = function listPublishedSchemaArns(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listTagsForResource = function listTagsForResource(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listTypedLinkFacetAttributes = function listTypedLinkFacetAttributes(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.listTypedLinkFacetNames = function listTypedLinkFacetNames(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.lookupPolicy = function lookupPolicy(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.publishSchema = function publishSchema(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.putSchemaFromJson = function putSchemaFromJson(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.removeFacetFromObject = function removeFacetFromObject(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.tagResource = function tagResource(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.untagResource = function untagResource(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.updateFacet = function updateFacet(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.updateObjectAttributes = function updateObjectAttributes(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.updateSchema = function updateSchema(params) {
        return apiPost(arguments.callee.name, params);
    };

    apigClient.updateTypedLinkFacet = function updateTypedLinkFacet(params) {
        return apiPost(arguments.callee.name, params);
    };

    return apigClient;
};
