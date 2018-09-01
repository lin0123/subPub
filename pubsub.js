(function(w) {
  var container = Object.create(null), subEvents = {}, autoId = -1;

  // 订阅事件， 事件名称，方法，方法参数，是否只执行一次
  container.subscribe = function(event, func, args, one) {

    subEvents[event] = subEvents[event] || [];

    var eventId = (++autoId).toString(), once = one || false;

    subEvents[event].push({
      eventId: eventId,
      func: func,
      args: args,
      once: once,
    });
    return eventId;
  };

  // 发布消息
  container.publish = function (event, args) {

    if (!subEvents[event]) {
      console.warn(event + '该事件未定义或已删除！');
      return this;
    }

    var subs = subEvents[event], len = 0;

    while (len < subs.length) {
      // 优先取统一发布的信息
      var param = args || subs[len].args, sub = subs[len];
      if (typeof sub.func == 'function') {
        sub.func(param);
      }
      if (sub.once === true) {
        sub.func = null;
      }
      len++;
    }
    return this;
  };

  // 取消订阅，根据订阅单个事件id或者id列表
  container.cancelSub = function (eventId) {
    if (Array.isArray(eventId)) {
      eventId.forEach(el => {
        deleteEventId(el)
      })
    } else {
      deleteEventId(eventId)
    }
    return this;
  };

  // 取消单个订阅事件
  container.cancelEvent = function (event) {
    if (subEvents.hasOwnProperty(event)) {
      delete subEvents[event]
    }
    return this;
  };

  var deleteEventId = function (id) {
    for (var key in subEvents) {
      var arr = subEvents[key]
      for (var i = arr.length - 1; i > 0; i--) {
        if (arr[i].eventId == id) {
          arr.splice(i, 1)
        }
      }
    }
  }

  if (typeof module == 'object' && typeof module.exports == 'object') {
    module.exports = container;
  } else {
    w.pubsub = container;
  }
})(window);
