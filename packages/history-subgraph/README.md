### generate

```sh
CONFIG_PATH=your-config-path yarn generate
```

### codegen

```sh
yarn codegen
```

### auth (local doesn't need auth)

#### `yarn auth:hosted-service`

```sh
GRAPH_HOSTED_SERVICE_ACCESS_TOKEN=your-access-token-here yarn auth:hosted-service
```

#### `yarn auth:studio`

```sh
GRAPH_STUDIO_ACCESS_TOKEN=your-access-token-here yarn auth:studio
```

### build

```sh
yarn build
```

### create (studio|hosted-service not run this script to create, go to https://thegraph.com/ to create subgraph)

#### `yarn create:local`

```sh
SUBGRAPH_NAME=your-subgraph-name SUBGRAPH_NODE=your-subgraph-node yarn create:local
```

### deploy

#### `yarn deploy:studio`

```sh
SUBGRAPH_NAME=your-subgraph-name yarn deploy:studio
```

#### `yarn deploy:hosted-service`

```sh
SUBGRAPH_NAME=your-subgraph-name yarn deploy:hosted-service
```

#### `yarn deploy:local`

```sh
SUBGRAPH_NAME=your-subgraph-name SUBGRAPH_NODE=your-subgraph-node
SUBGRAPH_IPFS=your-subgraph-name yarn deploy:local
```

### Local config

| network          | subgraph_node                                      | subgraph_ipfs                                      |
| ---------------- | -------------------------------------------------- | -------------------------------------------------- |
| G.U.sandbox      | http://34.85.33.121:8020                           | http://34.85.33.121:5001                           |
| Japan Open Chain | https://graphnode-admin.mainnet.japanopenchain.org | https://graphnode-ipfs.mainnet.japanopenchain.org" |

### Example

#### Deploy to hosted-service

```sh
CONFIG_PATH=config/goerli-gusandbox-dev.json yarn generate
yarn codegen
GRAPH_HOSTED_SERVICE_ACCESS_TOKEN=f3862233d5a74dcf8c20028b29b37a33 yarn auth:hosted-service
yarn build
SUBGRAPH_NAME=cuonghx1108/test yarn deploy:hosted-service
```

#### Deploy to local

```sh
CONFIG_PATH=config/gusandbox-goerli-dev.json yarn generate
yarn codegen
yarn build
SUBGRAPH_NAME=test SUBGRAPH_NODE=http://34.85.33.121:8020 yarn create:local
SUBGRAPH_NAME=test SUBGRAPH_NODE=http://34.85.33.121:8020 SUBGRAPH_IPFS=http://34.85.33.121:5001 yarn deploy:local
```
