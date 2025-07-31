import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
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
    auth(...values: string[] | number[]): this;
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
    server(url: string, variables?: {}): void;
    /**
     * Returns taste-based insights based on the input parameters you provide.
     *
     * @summary Insights API Deep Dive
     */
    getInsights(metadata: types.GetInsightsMetadataParam): Promise<FetchResponse<200, types.GetInsightsResponse200>>;
    /**
     * The Find Audiences API retrieves a list of audience IDs that can be used for filtering
     * results and refining targeting in recommendations. You can use the returned audience IDs
     * as values for `signal.demographics.audiences` to filter Insights API query results by
     * specific audiences.
     *
     * @summary Find Audiences
     */
    getAudiences(metadata?: types.GetAudiencesMetadataParam): Promise<FetchResponse<200, types.GetAudiencesResponse200>>;
    /**
     * The Get Audience Types API returns all available audience type IDs, representing
     * different audience categories. You can use this API to explore audience classifications
     * and refine searches in the Find Audiences API.
     *
     * @summary Get Audience Types
     */
    getAudienceTypes(metadata?: types.GetAudienceTypesMetadataParam): Promise<FetchResponse<200, types.GetAudienceTypesResponse200>>;
    /**
     * Search for tags that are supported by the `filter.tags`, `exclude.tags`, and
     * `signal.interests.tags parameters`.
     *
     * @summary Tags Search
     */
    getTags(metadata?: types.GetTagsMetadataParam): Promise<FetchResponse<200, types.GetTagsResponse200>>;
    /**
     * Returns a list of tag types supported by each entity type. You can leverage this data
     * with the Tags API to filter results by specific tag types.
     *
     * @summary Tag Types
     */
    getTagTypes(metadata?: types.GetTagTypesMetadataParam): Promise<FetchResponse<200, types.GetTagTypesResponse200>>;
    /**
     * The Trending API provides time-series data showing the popularity trends of a specific
     * entity over a given time period. It returns weekly trending statistics including
     * population percentile, rank, velocity, and acceleration metrics for the specified
     * entity. Results are ordered by date in descending order. Use this endpoint to monitor
     * how an entity's popularity evolves over time.
     *
     * @summary Get Trending Data
     */
    getTrending(metadata: types.GetTrendingMetadataParam): Promise<FetchResponse<200, types.GetTrendingResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
