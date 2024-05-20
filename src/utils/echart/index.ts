
export const option1 = {
  title: {
    text: '分类销售统计',
    subtext: '每种商品分类的近30天销售数据',
    left: 'left'
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: '单位：元',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 17078, name: 'Barbara' },
        { value: 30324, name: 'Helen' },
        { value: 20151, name: 'Mary' },
        { value: 34875, name: 'Anthony' },
        { value: 47485, name: 'Laura' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
export const option2 = {
  title: {
    text: '近30天销售趋势'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['订单数', '销售额', '退款额', '充值额']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [
      '06-28',
      '07-01',
      '07-04',
      '07-07',
      '07-10',
      '07-13',
      '07-16',
      '07-19',
      '07-22',
      '07-25'
    ]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '订单数',
      type: 'line',
      stack: 'Total',
      data: [4563, 1978, 101, 134, 90, 230, 210]
    },
    {
      name: '销售额',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '退款额',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '充值额',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    }
  ]
};
export const option3 = {
  title: {
    text: '会员消费Top10'
  },
  xAxis: {
    type: 'category',
    data: [
      '于洋',
      '沈霞',
      '徐涛',
      '孙丽',
      '吕勇',
      '顾桂英',
      '曾勇',
      '万霞',
      '雷勇',
      '宋丽'
    ]
  },
  yAxis: {
    name: '单位：元',
    type: 'value'
  },
  series: [
    {
      data: [
        2000, 12000, 22000, 32000, 42000, 52000, 62000, 72000, 82000, 92000
      ],
      type: 'bar',
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#92c6f6' // 0% 处的颜色
          },
          {
            offset: 0.5,
            color: '#1c8ff0' // 50% 处的颜色
          },
          {
            offset: 1,
            color: '#188df0' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    }
  ]
};
export const option4 = {
  title: {
    text: '气温一盘表°C'
  },
  series: [
    {
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 60,
      splitNumber: 12,
      itemStyle: {
        color: '#FFAB91'
      },
      progress: {
        show: true,
        width: 40 // 橘色宽度
      },

      pointer: {
        show: true
      },
      axisLine: {
        lineStyle: {
          width: 28 // 外部指针与圆盘距离
        }
      },
      axisTick: {
        distance: -45,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      splitLine: {
        distance: -55,
        length: 14,
        lineStyle: {
          width: 4,
          color: '#999'
        }
      },
      axisLabel: {
        distance: -25,
        color: '#999',
        fontSize: 25
      },
      anchor: {
        show: false
      },
      title: {
        show: true
      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, '-15%'],
        fontSize: 50,
        fontWeight: 'bolder',
        formatter: '{value} °C',
        color: 'inherit'
      },
      data: [
        {
          value: 38
        }
      ]
    },

    {
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 60,
      itemStyle: {
        color: '#FD7347'
      },
      progress: {
        show: true,
        width: 15
      },

      pointer: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: true
      },
      splitLine: {
        show: true
      },
      axisLabel: {
        show: true,
        distance: 28
      },
      detail: {
        show: true,
        fontSize: 30
      },
      data: [
        {
          value: 38
        }
      ]
    }
  ]
};

