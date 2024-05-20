
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
