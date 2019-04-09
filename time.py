import time
import datetime


class Sample:
    def __init__(self):
        print('这是一个例子')
        a = 100
    def fun(self):
        print('this is a function')
def main():
    print(time.time())       #返回时间戳
    print(time.localtime())  #返回当地时间元祖
    print(time.gmtime())     #返回格林尼治时间元祖
    print(time.mktime(time.localtime()))     #将时间元祖转化为时间戳
    print(time.asctime(time.localtime()))    #将时间元祖转化为可读形式
    print(time.ctime())                      #返回可读形式时间
    time.sleep(1)
    print(time.ctime())
    print()
    print()
    print()
    print()
    print()
    
    
    
    
    print('today:',datetime.datetime.today())
    print('now:',datetime.datetime.now())
    print('utcnow:',datetime.datetime.utcnow())
    print('fromtimestamp:',datetime.datetime.fromtimestamp(time.time()))
    print('utcfromtimestamp:',datetime.datetime.utcfromtimestamp(time.time()))
    
    dt = datetime.datetime.now()
    print(dt.strptime(str(dt),'%Y-%m-%d %H:%M:%S.%f'))   #这个格式是不能改的，会出错
    print(dt.strftime('%Y--%m--%d %H:%M:%S'))            #这个格式可以改
    print(dt.strftime('%Y--%m--%d--%Y-- %H:%M:%S')) 
    
    
    
main()