# 设备参数

## Vela 设备

| 设备                | 型号    | Product                 | 分辨率   | 水平 DP | DPR | 圆角 | 预留空间 |
| ------------------- | ------- | ----------------------- | -------- | ------- | --- | ---- | -------- |
| 小米手环 8 Pro      | m67     | ?                       | 336\*480 | 168     | 2.1 | 48   |          |
| 小米手环 9          | n66     | Xiaomi Smart Band 9     | 192\*490 | 96      | 2   | 96   | 64MB     |
| 小米手环 9 Pro      | n67     | Xiaomi Smart Band 9 Pro | 336\*480 | 160     | 2.1 | 48   | 64MB     |
| 小米手环 10         | o66     | Xiaomi Smart Band 10    | 212\*520 | 106     | 2   | 104  |          |
| 小米手环 10 NFC     | o66NFC  | ?                       | 212\*520 | 106     | 2   | 104  |          |
| 小米手表 H1         | n60     | ?                       | 466\*466 | 233     | 2   | 50%  |          |
| 小米手表 S1 Pro     | ?       | ?                       | 480\*480 | 240     | 2   | 50%  |          |
| 小米手表 S3         | n62     | Xiaomi Watch S3         | 466\*466 | 233     | 2   | 50%  |          |
| 小米手表 S3 eSIM    | n62     | Xiaomi Watch S3 eSIM    | 466\*466 | 233     | 2   | 50%  |          |
| 小米手表 S4         | o62     | Xiaomi Watch S4         | 466\*466 | 233     | 2   | 50%  |          |
| 小米手表 S4 eSIM    | o62m    | Xiaomi Watch S4 eSIM    | 466\*466 | 233     | 2   | 50%  |          |
| 小米手表 S4 Sport   | o62     | Xiaomi Watch S4 Sport   | 466\*466 | 233     | 2   | 50%  |          |
| 小米手表 S4 15 周年 | o62m    | marconi_o62m_watch      | 466\*466 | 233     | 2   | 50%  |          |
| 小米手表 S4 41mm    | o62/o63 | Xiaomi Watch S4 41mm    | 466\*466 | 233     | 2   | 50%  |          |
| 红米手表 4          | n65     | ?                       | 390\*450 | ?       | ?   | ?    |          |
| 红米手表 5          | o65     | REDMI Watch 5           | 432\*514 | 216     | 2   | 103  |          |
| 红米手表 5 eSIM     | o65m    | o65m                    | 432\*514 | 216     | 2   | 103  | 1024MB   |
| 红米手表 6          | p65     | REDMI Watch 6           | 432\*514 | 216     | 2   | 108  | 120MB    |

::: info 型号
[设备型号命名规律](./name)
:::

::: info 预留空间

指 file 等存储接口实际可使用的最大空间（系统预留空间），超出此值后无法正常写入数据。上方的值为近似值，在实际使用中如果接近此值，有可能会使设备重启或者进入恢复出厂页面。根据规律，预留空间大约是内存值的四分之一。

https://iot.mi.com/vela/quickapp/zh/features/basic/device.html#device-gettotalstorage-object
:::

::: info Product

`device.getInfo(OBJECT)` 返回内容中的 `product` 字段的值

https://iot.mi.com/vela/quickapp/zh/features/basic/device.html#device-getinfo-object
:::

::: info DPR 与 DP

dp 数值 = 物理分辨率 / 设备像素比 (device pixel ratio)

Vela 媒体查询宽高单位为 dp

https://iot.mi.com/vela/quickapp/zh/guide/multi-screens/specs.html#%E5%9B%BA%E5%AE%9A%E9%95%BF%E5%BA%A6%E5%8D%95%E4%BD%8D
:::
