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

const people = 100;
const turn = 1000000;

const experiment = function () {
  // 首先，把所有人放进一个数组里并给每个人发100元
  const wealth = new Array(people);
  wealth.fill(100);
  // 第二步，开始进行给钱的轮次
  for (let a = 0; a < turn; a++) {
    // 首先要判断这个人有没有钱
    const hasMoney = new Array(people);
    hasMoney.fill(false);
    for (let i = 0; i < people; i++) {
      wealth[i] > 0 ? (hasMoney[i] = true) : (hasMoney[i] = false);
    }
    // console.log('>>> hasMoney', hasMoney)
    // 每个人在这一轮中，依次开始进行给钱的操作
    for (let p = 0; p < people; p++) {
      // 如果这个人有钱，则需要给除了自己以外的任意一个人1元
      let receive = p;
      // console.log('>>> receive', receive);
      if (hasMoney[p]) {
        do {
          receive = Math.trunc(Math.random() * people);
          // console.log('>>>receive.random', receive)
        } while (receive === p);
        wealth[p]--;
        wealth[receive]++;
      }
    }
  }
  return wealth;
};

const calculateGini = (wealth = experiment()) => {
  let sumOfDifferences = 0;
  let sumOfWealth = 0;
  for (let b = 0; b < people; b++) {
    for (let c = 0; c < people; c++) {
      sumOfDifferences += Math.abs(wealth[b] - wealth[c]);
    }
    sumOfWealth += wealth[b];
  }
  return sumOfDifferences / (2 * people * sumOfWealth);
};

console.log(">>>基尼系数是：", calculateGini());

// Gini = ｜差值｜之和 / 2 * 人数 * 财富总和

// 这个实验共计是几个动作？
// 1. 执行 turn 轮
// 2. 在每一轮内，进行以下动作：
//  首先，判断每个人是否有钱，如果这个人有钱则需要对外给1元
//  其次，确定每个人需要把钱给谁
//  最后，执行给钱的动作（增加和减去对应人的钱）
//
