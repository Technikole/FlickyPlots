declare const GetAudienceTypes: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "filter.parents.types": {
                    readonly type: "string";
                    readonly enum: readonly ["urn:audience:communities", "urn:audience:global_issues", "urn:audience:hobbies_and_interests", "urn:audience:investing_interests", "urn:audience:leisure", "urn:audience:life_stage", "urn:audience:lifestyle_preferences_beliefs", "urn:audience:political_preferences", "urn:audience:professional_area", "urn:audience:spending_habits"];
                    readonly examples: readonly ["urn:audience:communities", "urn:audience:global_issues"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a comma-separated list of parental entity types.";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [1];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The page number of results to return. This is equivalent to take + offset and is the recommended approach for most use cases.";
                };
                readonly take: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [10];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The number of results to return.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly success: {
                    readonly type: "boolean";
                };
                readonly results: {
                    readonly type: "object";
                    readonly properties: {
                        readonly entities: {
                            readonly type: "array";
                            readonly items: {};
                        };
                        readonly duration: {
                            readonly type: "number";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetAudiences: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "filter.parents.types": {
                    readonly type: "string";
                    readonly enum: readonly ["urn:audience:communities", "urn:audience:global_issues", "urn:audience:hobbies_and_interests", "urn:audience:investing_interests", "urn:audience:leisure", "urn:audience:life_stage", "urn:audience:lifestyle_preferences_beliefs", "urn:audience:political_preferences", "urn:audience:professional_area", "urn:audience:spending_habits"];
                    readonly examples: readonly ["urn:audience:communities", "urn:audience:global_issues"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a comma-separated list of parental entity types.";
                };
                readonly "filter.results.audiences": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["?", "?"];
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a comma-separated list of audience IDs.";
                };
                readonly "filter.audience.types": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["?", "?"];
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a list of audience types.";
                };
                readonly "filter.popularity.min": {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly maximum: 1;
                    readonly examples: readonly [0.5];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the minimum popularity percentile required for a Point of Interest (float, between 0 and 1; closer to 1 indicates higher popularity, e.g., 0.98 for the 98th percentile).";
                };
                readonly "filter.popularity.max": {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly maximum: 1;
                    readonly examples: readonly [0.98];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the maximum popularity percentile a Point of Interest must have (float, between 0 and 1; closer to 1 indicates higher popularity, e.g., 0.98 for the 98th percentile).";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [1];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The page number of results to return. This is equivalent to take + offset and is the recommended approach for most use cases.";
                };
                readonly take: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [10];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The number of results to return.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly success: {
                    readonly type: "boolean";
                };
                readonly results: {
                    readonly type: "object";
                    readonly properties: {
                        readonly entities: {
                            readonly type: "array";
                            readonly items: {};
                        };
                        readonly duration: {
                            readonly type: "number";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetInsights: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "filter.type": {
                    readonly type: "string";
                    readonly enum: readonly ["urn:entity:artist", "urn:entity:book", "urn:entity:brand", "urn:entity:destination", "urn:entity:movie", "urn:entity:person", "urn:entity:place", "urn:entity:podcast", "urn:entity:tv_show", "urn:entity:videogame", "urn:heatmap"];
                    readonly examples: readonly ["urn:entity:book"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the category of entity to return (urn:entity:place).";
                };
                readonly "bias.trends": {
                    readonly type: "string";
                    readonly enum: readonly ["off", "low", "medium", "high"];
                    readonly examples: readonly ["low"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The level of impact a trending entity has on the results. Supported by select categories only.";
                };
                readonly "diversify.by": {
                    readonly type: "string";
                    readonly examples: readonly ["properties.geocode.city"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Limits results to a set number of high-affinity entities per city. Set this to \"properties.geocode.city\" to enable city-based diversification. Cities are ranked based on the highest-affinity entity within them, and entities within each city are ordered by their individual affinities.\n";
                };
                readonly "diversify.take": {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [5];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Sets the maximum number of results to return per city when using \"diversify.by\": \"properties.geocode.city\". For example, if set to 5, the response will include up to 5 entities with the highest affinities in each city.\n";
                };
                readonly "feature.explainability": {
                    readonly type: "boolean";
                    readonly examples: readonly [true, false];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "When set to `true`, the response includes explainability metadata for each recommendation and for the overall result set. Default is set to `false`.\n\n**Per-recommendation**: Each result includes a `query.explainability` section showing which input entities (e.g. `signal.interests.entities`) contributed to the recommendation and by how much. Scores are normalized between 0–1. Entities with scores ≥ 0.1 are always included; those below may be omitted to reduce response size.\n\n**Aggregate impact**: The top-level `query.explainability` object shows average influence of each input entity across top-N result subsets (e.g. top 3, 5, 10, all).\n\n**Note**: If explainability cannot be computed for the request, a warning is included under `query.explainability.warning`, but results still return normally.\n";
                };
                readonly "filter.address": {
                    readonly type: "string";
                    readonly examples: readonly ["123 Main St"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by address using a partial string query.";
                };
                readonly "filter.content_rating": {
                    readonly type: "string";
                    readonly enum: readonly ["G", "PG", "PG-13", "R", "NC-17"];
                    readonly examples: readonly ["PG"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a comma-separated list of content ratings based on the MPAA film rating system, which determines suitability for various audiences.";
                };
                readonly "filter.date_of_birth.max": {
                    readonly type: "string";
                    readonly format: "date";
                    readonly examples: readonly ["2004-01-01"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the most recent date of birth desired for the queried person.";
                };
                readonly "filter.date_of_birth.min": {
                    readonly type: "string";
                    readonly format: "date";
                    readonly examples: readonly ["1996-01-01"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the earliest date of birth desired for the queried person.";
                };
                readonly "filter.date_of_death.max": {
                    readonly type: "string";
                    readonly format: "date";
                    readonly examples: readonly ["2004-01-01"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the most recent date of death desired for the queried person.";
                };
                readonly "filter.date_of_death.min": {
                    readonly type: "string";
                    readonly format: "date";
                    readonly examples: readonly ["1985-01-01"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the earliest date of death desired for the queried person.";
                };
                readonly "filter.exclude.tags": {
                    readonly type: "string";
                    readonly examples: readonly ["urn:tag:genre:media:mystery,urn:tag:genre:media:drama"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Exclude entities associated with a comma-separated list of tags.";
                };
                readonly "operator.exclude.tags": {
                    readonly type: "string";
                    readonly enum: readonly ["union", "intersection"];
                    readonly examples: readonly ["union"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies how multiple `filter.exclude.tags` values are combined in the query. Use \"union\" (equivalent to a logical \"or\") to exclude results that contain at least one of the specified tags, or \"intersection\" (equivalent to a logical \"and\") to exclude only results that contain all specified tags. The default is \"union\".";
                };
                readonly "filter.exists": {
                    readonly type: "string";
                    readonly examples: readonly ["properties.image"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter results to include only entities that have one or more specified properties. Use `properties.image` to return only entities that include an image URL.\n";
                };
                readonly "filter.external.exists": {
                    readonly type: "string";
                    readonly examples: readonly ["resy,michelin"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a comma-separated list of external keys. (`resy`\\|`michelin`\\|`tablet`).";
                };
                readonly "operator.filter.external.exists": {
                    readonly type: "string";
                    readonly enum: readonly ["union", "intersection"];
                    readonly examples: readonly ["union"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies how multiple `filter.external.exists` values are combined in the query. Use \"union\" (equivalent to a logical \"or\") to return results that match at least one of the specified external keys (e.g., resy, michelin, or tablet), or \"intersection\" (equivalent to a logical \"and\") to return only results that match all specified external keys. The default is \"union\".";
                };
                readonly "filter.external.resy.count.max": {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly examples: readonly [200];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter places to include only those with a Resy rating count less than or equal to the specified maximum.   Applies only to entities with `filter.type` of `urn:entity:place`.\n";
                };
                readonly "filter.external.resy.count.min": {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly examples: readonly [20];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter places to include only those with a Resy rating count greater than or equal to the specified minimum.   Applies only to entities with `filter.type` of `urn:entity:place`.\n";
                };
                readonly "filter.external.resy.party_size.max": {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [10];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the maximum supported party size required for a Point of Interest.";
                };
                readonly "filter.external.resy.party_size.min": {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [2];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the minimum supported party size required for a Point of Interest.";
                };
                readonly "filter.external.resy.rating.max": {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly maximum: 5;
                    readonly examples: readonly [4.5];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter places to include only those with a Resy rating less than or equal to the specified maximum (1–5 scale). Applies only to entities with `filter.type` of `urn:entity:place`.";
                };
                readonly "filter.external.resy.rating.min": {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly maximum: 5;
                    readonly examples: readonly [3.5];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter places to include only those with a Resy rating greater than or equal to the specified minimum (1–5 scale). Applies only to entities with `filter.type` of `urn:entity:place`.";
                };
                readonly "filter.external.tripadvisor.rating.count.min": {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly examples: readonly [50];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter places to include only those with a Tripadvisor review count greater than or equal to the specified minimum. This filter only applies to entities with `filter.type` of `urn:entity:place`.\n";
                };
                readonly "filter.external.tripadvisor.rating.count.max": {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly examples: readonly [500];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter places to include only those with a Tripadvisor review count less than or equal to the specified maximum. This filter only applies to entities with `filter.type` of `urn:entity:place`.\n";
                };
                readonly "filter.external.tripadvisor.rating.max": {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly maximum: 5;
                    readonly examples: readonly [4];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter places to include only those with a Tripadvisor rating less than or equal to the specified maximum. This filter only applies to entities with `filter.type` of `urn:entity:place`.\n";
                };
                readonly "filter.external.tripadvisor.rating.min": {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly maximum: 5;
                    readonly examples: readonly [3];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter places to include only those with a Tripadvisor rating greater than or equal to the specified minimum. This filter only applies to entities with `filter.type` of `urn:entity:place`.\n";
                };
                readonly "filter.finale_year.max": {
                    readonly type: "integer";
                    readonly examples: readonly [2021];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the latest desired year for the final season of a TV show.";
                };
                readonly "filter.finale_year.min": {
                    readonly type: "integer";
                    readonly examples: readonly [2014];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the earliest desired year for the final season of a TV show.";
                };
                readonly "filter.gender": {
                    readonly type: "string";
                    readonly examples: readonly ["female"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter results to align with a specific gender identity. Used to personalize output based on known or inferred gender preferences.\n";
                };
                readonly "filter.geocode.admin1_region": {
                    readonly type: "string";
                    readonly examples: readonly ["NY"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by `properties.geocode.admin1_region`. Exact match (usually state).";
                };
                readonly "filter.geocode.admin2_region": {
                    readonly type: "string";
                    readonly examples: readonly ["New York County"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by `properties.geocode.admin2_region`. Exact match (often county or borough).";
                };
                readonly "filter.geocode.country_code": {
                    readonly type: "string";
                    readonly examples: readonly ["US"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by `properties.geocode.country_code`. Exact match (two-letter country code).";
                };
                readonly "filter.geocode.name": {
                    readonly type: "string";
                    readonly examples: readonly ["New York"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by `properties.geocode.name`. Exact match (usually city or town name).";
                };
                readonly "filter.hotel_class.max": {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 5;
                    readonly examples: readonly [5];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the maximum desired hotel class (1-5, inclusive).";
                };
                readonly "filter.hotel_class.min": {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 5;
                    readonly examples: readonly [3];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the minimum desired hotel class (1-5, inclusive).";
                };
                readonly "filter.hours": {
                    readonly type: "string";
                    readonly enum: readonly ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
                    readonly examples: readonly ["monday"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the day of the week the Point of Interest must be open (Monday, Tuesday, etc.).";
                };
                readonly "filter.latest_known_year.max": {
                    readonly type: "integer";
                    readonly examples: readonly [2023];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a certain maximum year that shows were released or updated.";
                };
                readonly "filter.latest_known_year.min": {
                    readonly type: "integer";
                    readonly examples: readonly [2014];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a certain minimum year that shows were released or updated.";
                };
                readonly "filter.location": {
                    readonly type: "string";
                    readonly examples: readonly ["POINT(-73.99823 40.722668)"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Used to filter by a WKT `POINT`, `POLYGON`, `MULTIPOLYGON` or a single Qloo ID for a named `urn:entity:locality`. WKT is formatted as X then Y, therefore longitude is first (`POINT(-73.99823 40.722668)`). If a Qloo ID or WKT `POLYGON` is passed, `filter.location.radius` will create a fuzzy boundary when set to a value > 0.";
                };
                readonly "filter.exclude.location": {
                    readonly type: "string";
                    readonly examples: readonly ["POINT(-73.99823 40.722668)"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Exclude results that fall within a specific location, defined by either a WKT `POINT`, `POLYGON`, `MULTIPOLYGON`, or a Qloo ID for a named `urn:entity:locality`.   WKT is formatted with longitude first (e.g., `POINT(-73.99823 40.722668)`).   When using a locality ID or a WKT `POLYGON`, setting `filter.location.radius` to a value > 0 creates a fuzzy exclusion boundary.\n";
                };
                readonly "filter.location.query": {
                    readonly oneOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    }];
                    readonly examples: readonly ["New York City", "Miami"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A query used to search for one or more named `urn:entity:locality` Qloo IDs for filtering requests, equivalent to passing the same Locality Qloo ID(s) into `filter.location`.\n  - For **GET requests**: Provide a single locality query as a string.\n  - For **POST requests**:\n    - You can still send a single locality as a string.\n    - Or you can send an array of locality names to query multiple localities at once. When multiple localities are provided, their geographic shapes are merged, and the system returns results with the highest affinities across the combined area.\n\nLocality queries are fuzzy-matched and case-insensitive. Examples include `New York City`, `Garden City`, `New York`, `Los Angeles`, `Lower East Side`, and AKAs like `The Big Apple`. When a single locality is supplied, the response JSON includes `query.locality.signal` with the matched Qloo entity. If multiple are supplied, this field is omitted. By default, the API includes a tuning that also captures nearby entities just outside the official boundaries of the locality. To turn this off and limit results strictly to within the locality, set `filter.location.radius=0`. If no localities are found, the API returns a 400 error.\n";
                };
                readonly "filter.exclude.location.query": {
                    readonly oneOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    }];
                    readonly examples: readonly ["Williamsburg", "Chelsea"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A query used to exclude results based on one or more named `urn:entity:locality` Qloo IDs, resolved from fuzzy-matched locality names.   This is equivalent to passing the resolved Locality Qloo ID(s) into `filter.exclude.location`.\n- For **GET requests**: Provide a single locality query as a string. - For **POST requests**:\n  - You can still send a single locality as a string.\n  - Or send an array of locality names to exclude multiple areas at once. When multiple localities are provided, their geographic shapes are merged, and the system excludes results from across the combined area.\n\nLocality queries are case-insensitive and support common AKAs (e.g., `The Big Apple` for New York).   When a single locality is supplied, the response includes `query.locality.exclude.signal` with the matched Qloo entity.   If multiple are supplied, this field is omitted. If no localities are matched, the API returns a 400 error.\n";
                };
                readonly "filter.location.geohash": {
                    readonly type: "string";
                    readonly examples: readonly ["dr5rsjk4sr2w"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a geohash. Geohashes are generated using the Python package pygeohash with a precision of 12 characters. This parameter returns all POIs that start with the specified geohash. For example, supplying `dr5rs` would allow returning the geohash `dr5rsjk4sr2w`.";
                };
                readonly "filter.exclude.location.geohash": {
                    readonly type: "string";
                    readonly examples: readonly ["dr5rs"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Exclude all entities whose geohash starts with the specified prefix.   Geohashes are generated using the Python package `pygeohash` with a precision of 12 characters.   For example, supplying `dr5rs` would exclude any result whose geohash begins with `dr5rs`, such as `dr5rsjk4sr2w`.\n";
                };
                readonly "filter.location.radius": {
                    readonly type: "integer";
                    readonly examples: readonly [10000, 0];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the radius (in meters) when also supplying `filter.location` or `filter.location.query`.\nWhen this parameter is **not provided**, the API applies a default tuning that slightly expands the locality boundary to include nearby entities outside its official shape.\nTo **disable** this behavior and strictly limit results to entities inside the defined locality boundary, set `filter.location.radius=0`.\n";
                };
                readonly "filter.parents.types": {
                    readonly type: "string";
                    readonly enum: readonly ["urn:audience:communities", "urn:audience:global_issues", "urn:audience:hobbies_and_interests", "urn:audience:investing_interests", "urn:audience:leisure", "urn:audience:life_stage", "urn:audience:lifestyle_preferences_beliefs", "urn:audience:political_preferences", "urn:audience:professional_area", "urn:audience:spending_habits"];
                    readonly examples: readonly ["urn:audience:communities", "urn:audience:global_issues"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a comma-separated list of parental entity types.";
                };
                readonly "filter.popularity.max": {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly maximum: 1;
                    readonly examples: readonly [0.98];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the maximum popularity percentile a Point of Interest must have (float, between 0 and 1; closer to 1 indicates higher popularity, e.g., 0.98 for the 98th percentile).";
                };
                readonly "filter.popularity.min": {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly maximum: 1;
                    readonly examples: readonly [0.5];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the minimum popularity percentile required for a Point of Interest (float, between 0 and 1; closer to 1 indicates higher popularity, e.g., 0.98 for the 98th percentile).";
                };
                readonly "filter.price_level.max": {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 4;
                    readonly examples: readonly [3];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the maximum price level a Point of Interest can have (1|2|3|4, similar to dollar signs).";
                };
                readonly "filter.price_level.min": {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 4;
                    readonly examples: readonly [1];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the minimum price level a Point of Interest can have (1|2|3|4, similar to dollar signs).";
                };
                readonly "filter.price_range.from": {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly maximum: 1000000;
                    readonly examples: readonly [200];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter places by a minimum price level, representing the lowest price in the desired range. Accepts an integer value between 0 and 1,000,000.";
                };
                readonly "filter.price_range.to": {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly maximum: 1000000;
                    readonly examples: readonly [200];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter places by a maximum price level, representing the highest price in the desired range. Accepts an integer value between 0 and 1,000,000. Only applies to places.";
                };
                readonly "filter.price.max": {
                    readonly type: "number";
                    readonly format: "float";
                    readonly examples: readonly [200];
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "maximum price";
                };
                readonly "filter.price.min": {
                    readonly type: "number";
                    readonly format: "float";
                    readonly examples: readonly [1];
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "minimum price";
                };
                readonly "filter.properties.business_rating.max": {
                    readonly type: "number";
                    readonly format: "float";
                    readonly enum: readonly [1, 2, 3, 4, 5];
                    readonly examples: readonly [3];
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the highest desired business rating.";
                };
                readonly "filter.properties.business_rating.min": {
                    readonly type: "number";
                    readonly format: "float";
                    readonly enum: readonly [1, 2, 3, 4, 5];
                    readonly examples: readonly [3];
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the lowest desired business rating.";
                };
                readonly "filter.publication_year.max": {
                    readonly type: "number";
                    readonly examples: readonly [2021];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the latest desired year of initial publication for the work.";
                };
                readonly "filter.publication_year.min": {
                    readonly type: "number";
                    readonly examples: readonly [1985];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the earliest desired year of initial publication for the work.";
                };
                readonly "filter.rating.max": {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly maximum: 5;
                    readonly examples: readonly [4.5];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the maximum Qloo rating a Point of Interest must have (float, between 0 and 5).";
                };
                readonly "filter.rating.min": {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly maximum: 5;
                    readonly examples: readonly [3.5];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the minimum Qloo rating a Point of Interest must have (float, between 0 and 5).";
                };
                readonly "filter.references_brand": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly examples: readonly ["636E1B95-6232-43E1-BDFE-37CD209C2CE3,7D2B1DFF-9D5D-44DE-970E-46B80C76CFA6"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a comma-separated list of brand entity IDs. Use this to narrow down place recommendations to specific brands. For example, to include only Walmart stores, pass the Walmart brand ID. Each ID must match exactly.";
                };
                readonly "filter.release_country": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly examples: readonly ["United States", "France"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a list of countries where a movie or TV show was originally released.";
                };
                readonly "operator.filter.release_country": {
                    readonly type: "string";
                    readonly enum: readonly ["intersection", "union"];
                    readonly examples: readonly ["union"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies how multiple `filter.release_country`` values are combined in the query. Use \"union\" (equivalent to a logical \"or\") to return results that match at least one of the specified countries, or \"intersection\" (equivalent to a logical \"and\") to return only results that match all specified countries. The default is \"union\".";
                };
                readonly "filter.release_date.max": {
                    readonly type: "string";
                    readonly format: "date";
                    readonly examples: readonly ["2024-01-01"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the latest desired release date.";
                };
                readonly "filter.release_date.min": {
                    readonly type: "string";
                    readonly format: "date";
                    readonly examples: readonly ["2021-01-01"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the earliest desired release date.";
                };
                readonly "filter.release_year.max": {
                    readonly type: "integer";
                    readonly examples: readonly [2024];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the latest desired release year.";
                };
                readonly "filter.release_year.min": {
                    readonly type: "integer";
                    readonly examples: readonly [1996];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the earliest desired release year.";
                };
                readonly "filter.results.entities": {
                    readonly type: "string";
                    readonly examples: readonly ["636E1B95-6232-43E1-BDFE-37CD209C2CE3,7D2B1DFF-9D5D-44DE-970E-46B80C76CFA6"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a comma-separated list of entity IDs. Often used to assess the affinity of an entity towards input.";
                };
                readonly "filter.results.entities.query": {
                    readonly oneOf: readonly [{
                        readonly type: "string";
                    }, {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    }];
                    readonly examples: readonly ["Balthazar", "Balthazar"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Search for one or more entities by name to use as filters.   - For **GET requests**: Provide a single entity name as a string. - For **POST requests**: You can provide a single name or an array of names.\n";
                };
                readonly "filter.exclude.entities": {
                    readonly type: "string";
                    readonly examples: readonly ["39458DC0-F91D-4591-80A8-E254E66F84A2,B315A4B4-6756-4CF3-8297-75FD94CC8CF2"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A comma-separated list of entity IDs to remove from the results.";
                };
                readonly "filter.exclude.entities.query": {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Balthazar"];
                                };
                                readonly address: {
                                    readonly type: "string";
                                    readonly examples: readonly ["80 Spring St, New York"];
                                };
                            };
                        }, {
                            readonly type: "string";
                            readonly examples: readonly ["Balthazar"];
                        }];
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "This parameter can only be supplied when using POST HTTP method, since it requires JSON encoded body. The value for `filter.exclude.entities.query` is a JSON array with objects containing the `name` and `address` properties. For a fuzzier search, just include an array of strings. When supplied, it overwrites the `filter.exclude.entities` object with resolved entity IDs. The response will contain a path `query.entities.exclude`, with partial Qloo entities that were matched by the query. If no entities are found, the API will throw a `400` error.";
                };
                readonly "filter.results.tags": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["?", "?"];
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a comma-separated list of tag IDs. Often used to assess the affinity of a tag towards input.";
                };
                readonly "filter.tags": {
                    readonly type: "string";
                    readonly examples: readonly ["urn:tag:genre:restaurant:Italian"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a comma-separated list of tag IDs (urn:tag:genre:restaurant:Italian).";
                };
                readonly "operator.filter.tags": {
                    readonly type: "string";
                    readonly enum: readonly ["union", "intersection"];
                    readonly examples: readonly ["union"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies how multiple `filter.tags` values are combined in the query. Use \"union\" (equivalent to a logical \"or\") to return results that match at least one of the specified tags, or \"intersection\" (equivalent to a logical \"and\") to return only results that match all specified tags. The default is \"union\".";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly examples: readonly [5];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The number of results to skip, starting from 0. Allows arbitrary offsets but is less commonly used than `page`.";
                };
                readonly "output.heatmap.boundary": {
                    readonly type: "string";
                    readonly examples: readonly ["urn:entity:locality"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Indicates the type of heatmap output desired: The default is geohashes. The other options are a city or a neighborhood.";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [1];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The page number of results to return. This is equivalent to take + offset and is the recommended approach for most use cases.";
                };
                readonly "signal.demographics.age": {
                    readonly type: "string";
                    readonly enum: readonly ["35_and_younger", "36_to_55", "55_and_older"];
                    readonly examples: readonly ["36_to_55"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A comma-separated list of age ranges that influence the affinity score.(35_and_younger\\|36_to_55\\|55_and_older).";
                };
                readonly "signal.demographics.age.weight": {
                    readonly oneOf: readonly [{
                        readonly type: "number";
                        readonly minimum: 0;
                    }, {
                        readonly type: "string";
                        readonly enum: readonly ["very_low", "low", "mid", "medium", "high", "very_high"];
                    }];
                    readonly examples: readonly ["medium"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies the extent to which results should be influenced by age-based demographic signals. Higher values increase the influence of age data; lower values reduce its impact.";
                };
                readonly "signal.demographics.audiences.weight": {
                    readonly oneOf: readonly [{
                        readonly type: "number";
                        readonly minimum: 0;
                    }, {
                        readonly type: "string";
                        readonly enum: readonly ["very_low", "low", "mid", "medium", "high", "very_high"];
                    }];
                    readonly examples: readonly ["medium"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies the extent to which results should be influenced by the preferences of the selected audience. Higher values increase the influence of audience preferences; lower values reduce their impact.";
                };
                readonly "signal.demographics.audiences": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["‘urn:audience:artist’", "‘urn:audience:brand’"];
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A comma-separated list of audiences that influence the affinity score. Audience IDs can be retrieved via the v2/audiences search route.";
                };
                readonly "signal.demographics.gender": {
                    readonly type: "string";
                    readonly enum: readonly ["male", "female"];
                    readonly examples: readonly ["male"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Influence the affinity score based on gender (male\\|female).";
                };
                readonly "signal.demographics.gender.weight": {
                    readonly oneOf: readonly [{
                        readonly type: "number";
                        readonly minimum: 0;
                    }, {
                        readonly type: "string";
                        readonly enum: readonly ["very_low", "low", "mid", "medium", "high", "very_high"];
                    }];
                    readonly examples: readonly ["medium"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies the extent to which results should be influenced by gender-based demographic signals. Higher values increase the influence of gender data; lower values reduce its impact.";
                };
                readonly "signal.interests.entities": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly examples: readonly ["636E1B95-6232-43E1-BDFE-37CD209C2CE3,7D2B1DFF-9D5D-44DE-970E-46B80C76CFA6"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Allows you to supply a list of entities to influence affinity scores.For GET requests, provide a comma-separated list of entity IDs.  \n";
                };
                readonly "signal.interests.entities.query": {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Balthazar"];
                                };
                                readonly address: {
                                    readonly type: "string";
                                    readonly examples: readonly ["80 Spring St, New York"];
                                };
                            };
                        }, {
                            readonly type: "string";
                            readonly examples: readonly ["Balthazar"];
                        }];
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "This parameter can only be supplied when using POST HTTP method, which requires a JSON-encoded body. The value should be a JSON array of objects with 'name' and 'address' properties; supports 'resolve_to' for specifying resolution to place, brand, or both.";
                };
                readonly "signal.interests.entities.weight": {
                    readonly oneOf: readonly [{
                        readonly type: "number";
                        readonly minimum: 0;
                    }, {
                        readonly type: "string";
                        readonly enum: readonly ["very_low", "low", "mid", "medium", "high", "very_high"];
                    }];
                    readonly examples: readonly ["medium"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies the extent to which results should be influenced by the relevance of entities (in-domain or cross-domain). Higher values increase the influence of entities; lower values reduce their impact.";
                };
                readonly "signal.interests.tags": {
                    readonly oneOf: readonly [{
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    }, {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly tag: {
                                    readonly type: "string";
                                };
                                readonly weight: {
                                    readonly type: "integer";
                                };
                            };
                        };
                    }];
                    readonly examples: readonly ["urn:tag:genre:restaurant:Italian"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Allows you to supply a list of tags to influence affinity scores. You can also include a `weight` property that will indicate the strength of influence for each tag in your list.\n  - For GET requests: Provide a comma-separated list of tag IDs. \n  - For POST requests, you can either:\n    - Send the same string of comma-separated values.\n    - Send an array of objects with \"tag\" and \"weight\" properties, such as:\n      [\n        { \"tag\": \"urn:tag:genre:media:horror\", \"weight\": 7 },\n        { \"tag\": \"urn:tag:genre:media:thriller\", \"weight\": 20 }\n      ]\nWeights must be greater than 0 and are relative. So, a weight of 20 means that tag will more heavily influence affinity scores than a weight of 7.\n";
                };
                readonly "signal.interests.tags.weight": {
                    readonly oneOf: readonly [{
                        readonly type: "number";
                        readonly minimum: 0;
                    }, {
                        readonly type: "string";
                        readonly enum: readonly ["very_low", "low", "mid", "medium", "high", "very_high"];
                    }];
                    readonly examples: readonly ["medium"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies the extent to which results should be influenced by the presence of tags (taste analysis). Higher values increase the influence of tags; lower values reduce their impact.";
                };
                readonly "signal.location": {
                    readonly type: "string";
                    readonly examples: readonly ["POINT(-73.99823 40.722668)"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The geolocation to use for geospatial results. The value will be a WKT POINT, POLYGON or a single Qloo ID for a named urn:entity:locality to filter by. WKT is formatted as X then Y, therefore longitude is first (POINT(-73.99823 40.722668)). Unlike filter.location.radius, signal.location.radius is ignored if a Qloo ID or WKT POLYGON is passed.";
                };
                readonly "signal.location.radius": {
                    readonly type: "integer";
                    readonly examples: readonly [5000];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The optional radius (in meters), used when providing a WKT POINT. We generally recommend avoiding this parameter, as it overrides dynamic density discovery.";
                };
                readonly "signal.location.query": {
                    readonly type: "string";
                    readonly examples: readonly ["New York City"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A string query used to search for a named urn:entity:locality Qloo ID for geospatial results, effectively equivalent to passing the same Locality Qloo ID into signal.location. Examples of locality queries include New York City, Garden City, New York, Los Angeles, Lower East Side, and AKAs like The Big Apple. These queries are fuzzy-matched and case-insensitive. When filter.location.query is supplied, the response JSON will include query.locality.signal, which contains the partially matched Qloo entity. If no locality is found, the API will return a 400 error.";
                };
                readonly "signal.location.weight": {
                    readonly oneOf: readonly [{
                        readonly type: "number";
                        readonly minimum: 0;
                    }, {
                        readonly type: "string";
                        readonly enum: readonly ["very_low", "low", "mid", "medium", "high", "very_high"];
                    }];
                    readonly examples: readonly ["medium"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Specifies the extent to which results should be influenced by location-based signals (geospatial). Higher values increase the influence of location; lower values reduce its impact.";
                };
                readonly sort_by: {
                    readonly type: "string";
                    readonly enum: readonly ["affinity", "distance"];
                    readonly examples: readonly ["affinity"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "This parameter modifies the results sorting algorithm (affinity\\|distance). The distance option can only be used when `filter.location`` is supplied.";
                };
                readonly take: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [10];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The number of results to return.";
                };
            };
            readonly required: readonly ["filter.type"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly success: {
                    readonly type: "boolean";
                };
                readonly results: {
                    readonly type: "object";
                    readonly properties: {
                        readonly entities: {
                            readonly type: "array";
                            readonly items: {};
                        };
                        readonly duration: {
                            readonly type: "number";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetTagTypes: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "filter.parents.types": {
                    readonly type: "string";
                    readonly enum: readonly ["urn:audience:communities", "urn:audience:global_issues", "urn:audience:hobbies_and_interests", "urn:audience:investing_interests", "urn:audience:leisure", "urn:audience:life_stage", "urn:audience:lifestyle_preferences_beliefs", "urn:audience:political_preferences", "urn:audience:professional_area", "urn:audience:spending_habits"];
                    readonly examples: readonly ["urn:audience:communities", "urn:audience:global_issues"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a comma-separated list of parental entity types.";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [1];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The page number of results to return. This is equivalent to take + offset and is the recommended approach for most use cases.";
                };
                readonly take: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [10];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The number of results to return.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly success: {
                    readonly type: "boolean";
                };
                readonly results: {
                    readonly type: "object";
                    readonly properties: {
                        readonly entities: {
                            readonly type: "array";
                            readonly items: {};
                        };
                        readonly duration: {
                            readonly type: "number";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetTags: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "feature.typo_tolerance": {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly examples: readonly [true, false];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "When set to true, allows tolerance for typos in the `filter.query parameter`. For example, a query for “Mediterranaen” would return tags with the word “Mediterranean” in their titles. Default is false.";
                };
                readonly "filter.results.tags": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["?", "?"];
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a comma-separated list of tag IDs. Often used to assess the affinity of a tag towards input.";
                };
                readonly "filter.parents.types": {
                    readonly type: "string";
                    readonly enum: readonly ["urn:audience:communities", "urn:audience:global_issues", "urn:audience:hobbies_and_interests", "urn:audience:investing_interests", "urn:audience:leisure", "urn:audience:life_stage", "urn:audience:lifestyle_preferences_beliefs", "urn:audience:political_preferences", "urn:audience:professional_area", "urn:audience:spending_habits"];
                    readonly examples: readonly ["urn:audience:communities", "urn:audience:global_issues"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a comma-separated list of parental entity types.";
                };
                readonly "filter.popularity.min": {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly maximum: 1;
                    readonly examples: readonly [0.5];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the minimum popularity percentile required for a Point of Interest (float, between 0 and 1; closer to 1 indicates higher popularity, e.g., 0.98 for the 98th percentile).";
                };
                readonly "filter.popularity.max": {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly maximum: 1;
                    readonly examples: readonly [0.98];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the maximum popularity percentile a Point of Interest must have (float, between 0 and 1; closer to 1 indicates higher popularity, e.g., 0.98 for the 98th percentile).";
                };
                readonly "filter.query": {
                    readonly type: "string";
                    readonly examples: readonly ["vegan"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "A partial string search on the audience or tag name.";
                };
                readonly "filter.tag.types": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["urn:audience:brand:genre", "?"];
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by a comma-separated list of tag types. Each tag type requires an exact match. You can retrieve a list of tag types supported by each entity type via the Tag Types API.";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [1];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The page number of results to return. This is equivalent to take + offset and is the recommended approach for most use cases.";
                };
                readonly take: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [10];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The number of results to return.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly duration: {
                    readonly type: "number";
                };
                readonly success: {
                    readonly type: "boolean";
                };
                readonly results: {
                    readonly type: "object";
                    readonly properties: {
                        readonly tags: {
                            readonly type: "array";
                            readonly items: {};
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetTrending: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "signal.interests.entities": {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly examples: readonly ["636E1B95-6232-43E1-BDFE-37CD209C2CE3,7D2B1DFF-9D5D-44DE-970E-46B80C76CFA6"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Allows you to supply a list of entities to influence affinity scores.For GET requests, provide a comma-separated list of entity IDs.  \n";
                };
                readonly "filter.type": {
                    readonly type: "string";
                    readonly enum: readonly ["urn:entity:artist", "urn:entity:book", "urn:entity:brand", "urn:entity:destination", "urn:entity:movie", "urn:entity:person", "urn:entity:place", "urn:entity:podcast", "urn:entity:tv_show", "urn:entity:videogame", "urn:heatmap"];
                    readonly examples: readonly ["urn:entity:book"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filter by the category of entity to return (urn:entity:place).";
                };
                readonly "filter.start_date": {
                    readonly type: "string";
                    readonly format: "date";
                    readonly examples: readonly ["2025-01-03"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Start date for the trending analysis period in ISO 8601 format (YYYY-MM-DD).\n";
                };
                readonly "filter.end_date": {
                    readonly type: "string";
                    readonly format: "date";
                    readonly examples: readonly ["2025-07-03"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "End date for the trending analysis period in ISO 8601 format (YYYY-MM-DD).\n";
                };
                readonly take: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [10];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The number of results to return.";
                };
                readonly offset: {
                    readonly type: "integer";
                    readonly examples: readonly [5];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The number of results to skip, starting from 0. Allows arbitrary offsets but is less commonly used than `page`.";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [1];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "The page number of results to return. This is equivalent to take + offset and is the recommended approach for most use cases.";
                };
            };
            readonly required: readonly ["filter.type", "filter.start_date", "filter.end_date"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly success: {
                    readonly type: "boolean";
                    readonly examples: readonly [true];
                };
                readonly duration: {
                    readonly type: "number";
                    readonly examples: readonly [123];
                };
                readonly results: {
                    readonly type: "object";
                    readonly properties: {
                        readonly trending: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly date: {
                                        readonly type: "string";
                                        readonly format: "date";
                                        readonly examples: readonly ["2025-01-03"];
                                    };
                                    readonly population_percentile: {
                                        readonly type: "number";
                                        readonly examples: readonly [85.2];
                                    };
                                    readonly population_rank: {
                                        readonly type: "integer";
                                        readonly examples: readonly [150];
                                    };
                                    readonly population_rank_velocity: {
                                        readonly type: "integer";
                                        readonly examples: readonly [5];
                                    };
                                    readonly velocity_fold_change: {
                                        readonly type: "number";
                                        readonly examples: readonly [1.15];
                                    };
                                    readonly population_percent_delta: {
                                        readonly type: "number";
                                        readonly examples: readonly [1.15];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { GetAudienceTypes, GetAudiences, GetInsights, GetTagTypes, GetTags, GetTrending };
