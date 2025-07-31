"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'qloo/2.0.0 (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Returns taste-based insights based on the input parameters you provide.
     *
     * @summary Insights API Deep Dive
     */
    SDK.prototype.getInsights = function (metadata) {
        return this.core.fetch('/insights', 'get', metadata);
    };
    /**
     * The Find Audiences API retrieves a list of audience IDs that can be used for filtering
     * results and refining targeting in recommendations. You can use the returned audience IDs
     * as values for `signal.demographics.audiences` to filter Insights API query results by
     * specific audiences.
     *
     * @summary Find Audiences
     */
    SDK.prototype.getAudiences = function (metadata) {
        return this.core.fetch('/audiences', 'get', metadata);
    };
    /**
     * The Get Audience Types API returns all available audience type IDs, representing
     * different audience categories. You can use this API to explore audience classifications
     * and refine searches in the Find Audiences API.
     *
     * @summary Get Audience Types
     */
    SDK.prototype.getAudienceTypes = function (metadata) {
        return this.core.fetch('/audiences/types', 'get', metadata);
    };
    /**
     * Search for tags that are supported by the `filter.tags`, `exclude.tags`, and
     * `signal.interests.tags parameters`.
     *
     * @summary Tags Search
     */
    SDK.prototype.getTags = function (metadata) {
        return this.core.fetch('/tags', 'get', metadata);
    };
    /**
     * Returns a list of tag types supported by each entity type. You can leverage this data
     * with the Tags API to filter results by specific tag types.
     *
     * @summary Tag Types
     */
    SDK.prototype.getTagTypes = function (metadata) {
        return this.core.fetch('/tags/types', 'get', metadata);
    };
    /**
     * The Trending API provides time-series data showing the popularity trends of a specific
     * entity over a given time period. It returns weekly trending statistics including
     * population percentile, rank, velocity, and acceleration metrics for the specified
     * entity. Results are ordered by date in descending order. Use this endpoint to monitor
     * how an entity's popularity evolves over time.
     *
     * @summary Get Trending Data
     */
    SDK.prototype.getTrending = function (metadata) {
        return this.core.fetch('/trending', 'get', metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
