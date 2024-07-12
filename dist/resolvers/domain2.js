"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// resolvers metadata and 
exports.default = {
    metadata: {
        vid: '123456789',
        siteName: 'domain2',
        title: 'Domain 2 store',
    },
    theme: {
        colors: {
            primary: '#FF5733',
            secondary: '#33FF57',
        },
    },
    pages: {
        home: {
            title: 'Welcome to Domain 2',
            hero: {
                image: 'https://ik.imagekit.io/geigercp/123456789/mountains.jpg',
            },
            Query: {
                ping: () => 'pong for domain2 home page',
            },
        },
        custom: {
            title: 'Custom Orders',
            foo: "bar",
        }
    }
};
