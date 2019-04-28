export default {
  "color": [
    '#f9c700', '#ff5400', '#6699cc', '#9cb3c5', '#e0e6ec',
    '#666666', '#787464', '#cc7e63', '#724e58', '#4b565b'
  ],
  "backgroundColor": "#ffffff",
  "textStyle": {},
  "title": {
    "textStyle": {
      "color": "#cccccc"
    },
    "subtextStyle": {
      "color": "#cccccc"
    }
  },
  visualMap: {
    color: ['#C1232B', '#FCCE10']
  },

  toolbox: {
    iconStyle: {
      normal: {
        borderColor: '#f9c700'
      }
    }
  },

  tooltip: {
    backgroundColor: 'rgba(50,50,50,0.5)',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#27727B',
        type: 'dashed'
      },
      crossStyle: {
        color: '#27727B'
      },
      shadowStyle: {
        color: 'rgba(200,200,200,0.3)'
      }
    }
  },

  dataZoom: {
    dataBackgroundColor: 'rgba(181,195,52,0.3)',
    fillerColor: 'rgba(181,195,52,0.2)',
    handleColor: '#27727B'
  },

  categoryAxis: {
    axisLine: {
      lineStyle: {
        color: '#27727B'
      }
    },
    splitLine: {
      show: false
    }
  },

  valueAxis: {
    axisLine: {
      show: false
    },
    splitArea: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: ['#ccc'],
        type: 'dashed'
      }
    }
  },

  timeline: {
    lineStyle: {
      color: '#27727B'
    },
    controlStyle: {
      normal: {
        color: '#27727B',
        borderColor: '#27727B'
      }
    },
    symbol: 'emptyCircle',
    symbolSize: 3
  },

  line: {
    itemStyle: {
      normal: {
        borderWidth: 2,
        borderColor: '#fff',
        lineStyle: {
          width: 3
        }
      },
      emphasis: {
        borderWidth: 0
      }
    },
    symbol: 'circle',
    symbolSize: 3.5
  },

  candlestick: {
    itemStyle: {
      normal: {
        color: '#C1232B',
        color0: '#B5C334',
        lineStyle: {
          width: 1,
          color: '#C1232B',
          color0: '#B5C334'
        }
      }
    }
  },

  map: {
    label: {
      normal: {
        textStyle: {
          color: '#C1232B'
        }
      },
      emphasis: {
        textStyle: {
          color: 'rgb(100,0,0)'
        }
      }
    },
    itemStyle: {
      normal: {
        areaColor: '#ddd',
        borderColor: '#eee'
      },
      emphasis: {
        areaColor: '#fe994e'
      }
    }
  },

  gauge: {
    axisLine: {
      lineStyle: {
        color: [[0.2, '#B5C334'], [0.8, '#27727B'], [1, '#C1232B']]
      }
    },
    axisTick: {
      splitNumber: 2,
      length: 5,
      lineStyle: {
        color: '#fff'
      }
    },
    axisLabel: {
      textStyle: {
        color: '#fff'
      }
    },
    splitLine: {
      length: '5%',
      lineStyle: {
        color: '#fff'
      }
    },
    title: {
      offsetCenter: [0, -20]
    }
  }
}