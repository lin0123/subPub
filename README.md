# Subscriber/Publisher

# 使用

如果是模块化，从对应的目录 require('***/pubsub.js')

如果是浏览器中script，直接引入即可

# 相关方法

订阅事件，返回对应事件ID
pubsub.subscribe()

发布事件
pubsub.publish()

根据事件id取消对应的事件某个方法，可入参单个和数组列表
pubsub.cancelSub()

取消对应的事件
pubsub.cancelEvent()

例：
function test (msg) {
    console.log('订阅事件需要执行的方法：' msg)
}

var evntId1 = pubsub.subscribe('action1', test, '开始执行了')

var evntId2 = pubsub.subscribe('action1', test, '又一次订阅了该事件')

var evntId3 = pubsub.subscribe('action2', test, '订阅的另一个事件5555')

pubsub.publish('action1')

控制台打印：
订阅事件需要执行的方法：开始执行了
订阅事件需要执行的方法：又一次订阅了该事件

pubsub.cancelSub(evntId1)

pubsub.publish('action1')
控制台打印：
订阅事件需要执行的方法：又一次订阅了该事件

pubsub.publish('action2')

控制台打印：
订阅事件需要执行的方法：订阅的另一个事件5555

pubsub.cancelEvent('action2')

pubsub.publish('action2')

控制台打印：
