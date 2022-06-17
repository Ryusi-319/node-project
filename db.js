const express = require("express");
const app = express();
const port = 3000;
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/";

const client = new MongoClient(url)

async function addData(data) {
  try {
    await client.connect();

    const database = client.db("study");
    const table = database.collection("study");

    if (data.length) {
      const options = { ordered: true };
      const result = await table.insertMany(data, options);
      console.log("新增结果", result)
    }
  } finally {
    await client.close();
  }
}

async function delData(data) {
  try {
    await client.connect();

    const database = client.db("study");
    const table = database.collection("study");
    if (data) {
      const result = await table.deleteOne(data);
      if (result.deletedCount === 1) {
        console.log("成功删除一条数据");
      } else {
        console.log("没有找到对应数据");
      }
    }
  } finally {
    await client.close();
  }
}

async function updateData(data) {
  try {
    await client.connect();

    const database = client.db("study");
    const table = database.collection("study");

    if (data && data.condition) {
      const options = { upsert: true };
      const filters = data.condition;
      const updateObj = {$set: data.data};
      const result = await table.updateOne(filters, updateObj, options);
      console.log("更新结果", result)
    }
  } finally {
    await client.close();
  }
}

async function findData(data) {
  try {
    await client.connect();

    const database = client.db("study");
    const table = database.collection("study");

    if (data) {
      const result = await table.findOne(data);
      console.log("查询结果", result)
      return result;
    }
  } finally {
    await client.close();
  }
}

const addDataTmp = [
  {
    name: "baidu",
    url: "www.baidu.com"
  },
  {
    name: "huya",
    url: "www.huya.com"
  },
  {
    name: "bilibili",
    url: "www.bilibili.com"
  }
]
const delDataTmp = {
  name: "菜鸟教程"
}
const updateDataTmp = {
  condition: {
    name: "bing"
  },
  data: {
    url: "bing.com"
  }
}
const findDataTmp = {
  name: "bing"
}

// addData(addDataTmp).catch(console.dir);
// delData(delDataTmp).catch(console.dir);
// updateData(updateDataTmp).catch(console.dir);
// findData(findDataTmp).catch(console.dir);

app.get("/find", async (req, res) => {
  const result = await findData({name: "huya"});
  res.send(result);
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

