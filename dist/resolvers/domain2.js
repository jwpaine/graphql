"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domain2 = void 0;
exports.domain2 = {
    metadata: {
        siteName: 'domain2'
    },
    resolvers: {
        Query: {
            hello: () => 'world from domain2',
        },
    },
};
