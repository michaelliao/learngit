"""
你好，廖老师
我在您网站学习python有半个月了
目前在OOP阶段
不断探索
感谢您的网站
给了很多人学习的机会~
希望可以被选上
嘿嘿
"""


class Me(object):
    __slots__ = ("name", "age", "hobby", "address")

    def __init__(self, name, age, hobby, address):
        self.name = name
        self.age = age
        self.hobby = hobby
        self.address = address

    def say_hi(self):
        print("Hi, my name is {0}".format(self.name))
        print("I'm {0} year old".format(self.age))
        print("I like {0}, and I'm come from {1}".format(self.hobby, self.address))
        print("Thanks for Michael Liao")


me = Me("Like", 22, "coding", "ChengDu")
me.say_hi()
