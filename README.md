# GraphQL-demo

### I think graphQL is the future


- GraphQL 的操作类型 Operation Type  
  1. query  查询   对数据进行查
  2. mutation  变更 对数据进行增、删、改
  3. substription  订阅  当数据发送变更的时候 进行消息推送
```js
  query {
    user {id}
  }
```

- 对象类型和标量类型 Object Type & Scalar Type  
  1. 对象类型  在 schema 中定义的 type  
  2. 标量类型  GraphQL内置有一些标量类型 `String` `Int` `Float` `Boolean` `ID`  也可以自定义标量类型
  如果一个 GraphQL 服务接收到了一个 `query` 将从 `RootQuery` 开始查找 找到对象类型时使用它的解析函数 `Resolver` 来获取内容  
  如果返回的是对象类型则继续使用解析函数 如果返回的是 标量类型 则获取结束
```js
type User {
  name: String!        // 加了感叹号为 非空标量
  age: Int
}
```

- 模式 Schema  
  定义了字段类型 数据结构 描述接口数据请求规则 使用模式描述语言编写 
```
type Query {
  hello: String
  users: [User]!
  user(id: String): [User]!
}

type Mutation {
  createUser(id: ID!, name: String!, email: String!, age: Int, gender: Gender): User!
  updateUser(id: ID!, name: String, emial: String, age: Int, gender: Gender): User!
  deleteUser(id: ID!): User
}

type Subscription {
  subsUser(id: ID!): User
}

type User implements UserInterface {
  id: ID!
  name: String!
  age: Int
  gender: Gender
  email: String!
}

enum Gender {
  MAN
  WOMAN
}

interface UserInterface {
  id: ID!
  name: String!
  age: Int
  gender: Gender
}

```

- 解析函数 resolver

比如 一个 query :
```
query {
  hello
}
```

那么同名的解析函数应该是这样
```
Query: {
  parent  当前上一个解析函数返回值  
  args  查询中传入的参数  
  context  提供所有解析器上下文信息 
  info  保存于当前查询相关字段特定信息 以及 schema 详细信息值

  hello (parent, args, context, info) {
    return ....
  }
}
```
  
     
