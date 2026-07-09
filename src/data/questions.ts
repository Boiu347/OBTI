import type { Question } from "../types";

export const defaultQuestions: Question[] = [
  {
    id: 1,
    text: "遇到一道题卡了 5 分钟，你更可能？",
    options: [
      { text: "再自己想想，不想马上看答案", scores: { CORE: 2, PATH: 1 } },
      { text: "先看一点提示，知道方向再做", scores: { TEAM: 1, CHARGE: 1 } },
      { text: "先跳过，等状态好了再回来", scores: { CHARGE: 2 } },
      { text: "看有没有更有意思的讲法", scores: { SPARK: 2 } },
    ],
  },
  {
    id: 2,
    text: "如果明天要小测，你今晚会？",
    options: [
      { text: "把重点过一遍，求稳", scores: { ROOT: 2 } },
      { text: "直接冲最可能考的内容，效率优先", scores: { RUSH: 2 } },
      { text: "找人一起复习，更容易进入状态", scores: { TEAM: 2 } },
      { text: "先看自己最不会的地方", scores: { CORE: 1, ROOT: 1 } },
    ],
  },
  {
    id: 3,
    text: "你最容易被哪种课吸引？",
    options: [
      { text: "目标明确，知道学完能提分", scores: { RUSH: 1, ROOT: 1 } },
      { text: "老师讲得有意思，有生活例子", scores: { SPARK: 2 } },
      { text: "能自己探索，不是一直被安排", scores: { PATH: 2 } },
      { text: "有人鼓励我，我会更想继续", scores: { RADAR: 2 } },
    ],
  },
  {
    id: 4,
    text: "学完一节课后，你更希望？",
    options: [
      { text: "有人告诉我哪里进步了", scores: { RADAR: 2 } },
      { text: "给我一个清楚的下一步任务", scores: { ROOT: 1, RUSH: 1 } },
      { text: "别管太多，我自己知道怎么安排", scores: { PATH: 2 } },
      { text: "能解锁一点新东西，比如称号或彩蛋", scores: { SPARK: 1, CHARGE: 1 } },
    ],
  },
  {
    id: 5,
    text: "做错题时，你更在意？",
    options: [
      { text: "我为什么错，能不能彻底搞懂", scores: { CORE: 2 } },
      { text: "下次遇到会做就行，不想纠结太久", scores: { RUSH: 1, CHARGE: 1 } },
      { text: "有没有更简单的理解方式", scores: { SPARK: 1, TEAM: 1 } },
      { text: "希望有人别只批评我错了", scores: { RADAR: 2 } },
    ],
  },
  {
    id: 6,
    text: "一份学习计划摆在你面前，你更喜欢？",
    options: [
      { text: "每天安排清楚，照着走", scores: { ROOT: 2 } },
      { text: "给我目标就行，中间我自己安排", scores: { PATH: 2 } },
      { text: "最好有人陪我一起执行", scores: { TEAM: 2 } },
      { text: "最好短一点，不然我容易断电", scores: { CHARGE: 2 } },
    ],
  },
  {
    id: 7,
    text: "你突然不想学的时候，最可能是因为？",
    options: [
      { text: "看不到短期成果", scores: { RUSH: 1, RADAR: 1 } },
      { text: "内容太无聊", scores: { SPARK: 2 } },
      { text: "任务太多，不知道从哪开始", scores: { CHARGE: 2 } },
      { text: "一直被催，反而更不想动", scores: { PATH: 1, RADAR: 1 } },
    ],
  },
  {
    id: 8,
    text: "家长提醒你学习时，你最烦的是？",
    options: [
      { text: "一直催，像不信任我", scores: { PATH: 1, RADAR: 1 } },
      { text: "只看结果，不看我过程", scores: { RADAR: 2 } },
      { text: "讲太多大道理，不如告诉我怎么做", scores: { RUSH: 1, ROOT: 1 } },
      { text: "打断我自己的节奏", scores: { CORE: 1, PATH: 1 } },
    ],
  },
  {
    id: 9,
    text: "你喜欢哪种挑战？",
    options: [
      { text: "稍微难一点，但能靠努力解决", scores: { CORE: 2 } },
      { text: "新奇、有意思，不一定和考试直接相关", scores: { SPARK: 2 } },
      { text: "有明确目标，完成后很有成就感", scores: { RUSH: 1, ROOT: 1 } },
      { text: "有人一起做，我会更有动力", scores: { TEAM: 2 } },
    ],
  },
  {
    id: 10,
    text: "如果课程里有闯关系统，你更喜欢？",
    options: [
      { text: "连续打卡、等级升级", scores: { ROOT: 2 } },
      { text: "隐藏称号、彩蛋剧情", scores: { SPARK: 2 } },
      { text: "排行榜或阶段目标", scores: { RUSH: 2 } },
      { text: "有人看到我的进步并反馈", scores: { RADAR: 2 } },
    ],
  },
  {
    id: 11,
    text: "你觉得自己学习状态最好的时候是？",
    options: [
      { text: "目标很明确，知道现在该干什么", scores: { ROOT: 1, RUSH: 1 } },
      { text: "内容突然变得有意思", scores: { SPARK: 2 } },
      { text: "有人陪我学，或者有人给我反馈", scores: { TEAM: 1, RADAR: 1 } },
      { text: "我能自己决定怎么学", scores: { PATH: 2 } },
    ],
  },
  {
    id: 12,
    text: "如果用一句话形容你的学习模式，你更像？",
    options: [
      { text: "平时蓄力，关键时刻开大", scores: { RUSH: 2 } },
      { text: "只要有趣，我能学得很快", scores: { SPARK: 2 } },
      { text: "慢慢来，但我能扎得很稳", scores: { ROOT: 2 } },
      { text: "状态对了就很强，状态不对就容易断电", scores: { CHARGE: 2 } },
    ],
  },
];
