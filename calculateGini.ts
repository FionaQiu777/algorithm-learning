// 一开始有100个人，每个人都有100元
// 在每一轮都做如下的事情 :
// 每个人都必须拿出1元钱给除自己以外的其他人，给谁完全随机
// 如果某个人在这一轮的钱数为0，那么他可以不给，但是可以接收
// 发生很多很多轮之后，这100人的社会财富分布很均匀吗？

// console.log("一个社会的基尼系数是一个在0~1之间的小数");
// console.log("基尼系数为0代表所有人的财富完全一样");
// console.log("基尼系数为1代表有1个人掌握了全社会的财富");
// console.log("基尼系数越小，代表社会财富分布越均衡；越大则代表财富分布越不均衡");
// console.log("在2022年，世界各国的平均基尼系数为0.44");
// console.log("目前普遍认为，当基尼系数到达 0.5 时");
// console.log("就意味着社会贫富差距非常大，分布非常不均匀");
// console.log("社会可能会因此陷入危机，比如大量的犯罪或者经历社会动荡");
// console.log("测试开始");

// const people = 100;
// const turn = 1000000;

function experiment(size: number, times: number) {
  // 首先，把所有人放进一个数组里并给每个人发100元
  const wealth = new Array(size).fill(100);

  // 第二步，开始进行给钱的轮次
  const hasMoney = new Array(size).fill(false);
  for (let i = 0; i < times; i++) {
    // 首先要判断这个人有没有钱
    for (let j = 0; j < size; j++) {
      hasMoney[j] = wealth[j] > 0;
    }

    // 每个人在这一轮中，依次开始进行给钱的操作
    for (let j = 0; j < size; j++) {
      // 如果这个人有钱，则需要给除了自己以外的任意一个人1元
      if (hasMoney[j]) {
        let receiver = j;
        while (receiver === j) {
          receiver = Math.trunc(Math.random() * size);
        }
        wealth[j]--;
        wealth[receiver]++;
      }
    }
  }
  return wealth;
}

function calculateGini(wealthArray: number[]) {
  let sumOfDifferences = 0;
  let sumOfWealth = 0;
  const N = wealthArray.length;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      sumOfDifferences += Math.abs(wealthArray[i] - wealthArray[j]);
    }
    sumOfWealth += wealthArray[i];
  }
  return sumOfDifferences / (2 * N * sumOfWealth);
}

// console.log(">>>基尼系数是：", calculateGini(experiment(100, 1000000)));

// Gini = ｜差值｜之和 / 2 * 人数 * 财富总和

// 这个实验共计是几个动作？
// 1. 执行 turn 轮
// 2. 在每一轮内，进行以下动作：
//  首先，判断每个人是否有钱，如果这个人有钱则需要对外给1元
//  其次，确定每个人需要把钱给谁
//  最后，执行给钱的动作（增加和减去对应人的钱）

// Code from JunJun
function main(size: number, times: number) {
  console.log("一个社会的基尼系数是一个在 0~1 之间的小数");
  console.log("基尼系数为0代表所有人的财富完全一样");
  console.log("基尼系数为1代表有1个人掌握了全社会的财富");
  console.log(
    "基尼系数越小，代表社会财富分布越均衡；越大则代表财富分布越不均衡",
  );
  console.log("在2022年，世界各国的平均基尼系数为 0.44");
  console.log("目前普遍认为，当基尼系数到达 0.5 时");
  console.log("就意味着社会贫富差距非常大，分布非常不均匀");
  console.log("社会可能会因此陷入危机，比如大量的犯罪或者经历社会动荡");

  console.log(">>> 测试开始");
  const startTime = Date.now();
  console.log("人数: " + size);
  console.log("轮数: " + times);
  console.log(">>> 测试结束");
  console.log(">>> 基尼系数为：", calculateGini(experiment(size, times)));
  const duration = (Date.now() - startTime) / 1000;
  console.log(">>> duration", duration + "s");
}
const size = +process.argv[2] || 100;
const times = +process.argv[3] || 100;
main(size, times);
