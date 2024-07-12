"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domain1 = void 0;
exports.domain1 = {
    metadata: {
        siteName: 'domain1',
        foo: 'additional data for domain1'
    },
    resolvers: {
        Query: {
            hello: () => 'world from domain1',
        },
    },
};
