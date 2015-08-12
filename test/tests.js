var mapper = require('../mapper.js'),
    assert = require('assert');

describe('String map', function () {
    it('#simple', function () {
        var object = {
            key: {
                data: 'value'
            }
        };

        assert.equal(mapper('key.data', object), 'value', 'Mapper returned right value');
    });

    it('#with array', function () {
        var object = [
            {
                id: 'ID 1'
            },
            {
                id: 'ID 2'
            },
            {
                id: 'ID 3'
            }
        ];

        assert.equal(mapper('[1].id', object), 'ID 2', 'Mapper returned right value');
    });

    it('#with array 2', function () {
        var object = [
            {
                id: 'ID 1'
            },
            {
                id: 'ID 2'
            },
            {
                id: 'ID 3'
            }
        ];

        assert.deepEqual(mapper('id', object), ['ID 1', 'ID 2', 'ID 3']
            , 'Mapper returned right value');
    });



    it('#with array 3', function () {
        var object = {
            items: [
                {
                    id: 1,
                    datas: [
                        {
                            title: 'TITLE 1'
                        },
                        {
                            title: 'TITLE 2'
                        },
                        {
                            title: 'TITLE 3'
                        }
                    ]
                },
                {
                    id: 2,
                    datas: [
                        {
                            title: 'TITLE 4'
                        },
                        {
                            title: 'TITLE 5'
                        }
                    ]
                }
            ]
        };

        assert.deepEqual(mapper('items.datas[0].title', object)
            , ['TITLE 1', 'TITLE 4']
            , 'Mapper returned right value');
    });

    it('#with multiple arrays', function () {
        var object = [
            {
                user: {
                    name: {
                        first: 'firstname1',
                        last: 'lastname1'
                    },
                    posts: [
                        {
                            id: 11,
                            title: 'Post title 11'
                        },
                        {
                            id: 12,
                            title: 'Post title 12'
                        },
                        {
                            id: 13,
                            title: 'Post title 13'
                        }
                    ]
                },
                name: '0name'
            },
            {
                user: {
                    name: {
                        first: 'firstname2',
                        last: 'lastname2'
                    },
                    posts: [
                        {
                            id: 11,
                            title: 'Post title 21'
                        },
                        {
                            id: 12,
                            title: 'Post title 22'
                        },
                        {
                            id: 13,
                            title: 'Post title 23'
                        }
                    ]
                },
                name: '1name'
            },
            {
                user: {
                    name: {
                        first: 'firstname3',
                        last: 'lastname3'
                    },
                    posts: [
                        {
                            id: 31,
                            title: 'Post title 31'
                        },
                        {
                            id: 32,
                            title: 'Post title 32'
                        },
                        {
                            id: 33,
                            title: 'Post title 33'
                        }
                    ]
                },
                name: '2name'
            }
        ];

        assert.deepEqual(mapper('user.posts.title', object)
                , [['Post title 11', 'Post title 12', 'Post title 13'],
                    ['Post title 21', 'Post title 22', 'Post title 23'],
                    ['Post title 31', 'Post title 32', 'Post title 33']]
                , 'Mapper returned right value');
    });

    it('#invalid path', function () {
        var object = {
            key: {
                data: 'value'
            }
        };

        assert.equal(typeof mapper('key.data2', object), 'undefined', 'Mapper returned right value');
    });
});

describe('Array mapping', function () {
    it('#return array', function () {
        var object = {
            items: [
                {
                    id: 1,
                    datas: [
                        {
                            title: 'TITLE 1'
                        },
                        {
                            title: 'TITLE 2'
                        },
                        {
                            title: 'TITLE 3'
                        }
                    ]
                },
                {
                    id: 2,
                    datas: [
                        {
                            title: 'TITLE 4'
                        },
                        {
                            title: 'TITLE 5'
                        }
                    ]
                }
            ]
        };

        assert.deepEqual(
                mapper(['items[0].datas[1].title', 'items[0].datas[2].title'
                        , 'items[1].datas[0].title'], object)
                , ['TITLE 2', 'TITLE 3', 'TITLE 4']
                , 'Mapper returned right value');
    });

    it('#trying to get index of non array', function () {
        var object = {
            key: {
                data: 'value'
            }
        };

        assert.equal(typeof mapper('key[0].data', object), 'undefined', 'Mapper returned right value');
    });
});

describe('Object mapping', function () {
    it('#simple object', function () {
        var object = {
            items: [
                {
                    id: 1,
                    datas: [
                        {
                            title: 'TITLE 1'
                        },
                        {
                            title: 'TITLE 2'
                        },
                        {
                            title: 'TITLE 3'
                        }
                    ]
                },
                {
                    id: 2,
                    datas: [
                        {
                            title: 'TITLE 4'
                        },
                        {
                            title: 'TITLE 5'
                        }
                    ]
                }
            ]
        };

        assert.deepEqual(
                mapper({'a.b.c': 'items[0].datas[1].title',
                    'a.b.d': 'items[0].datas[2].title',
                    'a.e': 'items[1].datas[0].title'}, object)
                , {a: {b: {c: 'TITLE 2', d: 'TITLE 3'}, e: 'TITLE 4'}}
                , 'Mapper returned right value');
    });
});


