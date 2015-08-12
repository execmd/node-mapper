# node-mapper [![Build Status](https://travis-ci.org/execmd/node-mapper.svg)](https://travis-ci.org/execmd/node-mapper)
NodeJS library for dot notation mapping

# Install
```bash
npm install --save node-mapper
```

# How to use
Just require as any other module
```js
var mapper = require('node-mapper');
```
and use
```js
mapper(mapIn, objectIn[, objectOut)
```
where
 - mapIn - string, array or object
 - objectIn - object where we will perform lookup
 - objectOut - optional object which will be extended on object mappings
 
any examples you can find below

# TOC
   - [String mapping](#string-mapping)
   - [Array mapping](#array-mapping)
   - [Object mapping](#object-mapping)
<a name=""></a>
 
<a name="string-mapping"></a>
# String mapping
#simple

```js
var object = {
    key: {
        data: 'value'
    }
};
assert.equal(mapper('key.data', object), 'value', 'Mapper returned right value');
```

#with array

```js
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
```

#with array 2

```js
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
```

#with array 3

```js
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
```

#with multiple arrays

```js
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
```

#invalid path

```js
var object = {
    key: {
        data: 'value'
    }
};
assert.equal(typeof mapper('key.data2', object), 'undefined', 'Mapper returned right value');
```

<a name="array-mapping"></a>
# Array mapping
#return array

```js
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
```

#trying to get index of non array

```js
var object = {
    key: {
        data: 'value'
    }
};
assert.equal(typeof mapper('key[0].data', object), 'undefined', 'Mapper returned right value');
```

<a name="object-mapping"></a>
# Object mapping
#simple object

```js
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
```


