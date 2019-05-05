# 1+2+3+···+n的尾递归算法，因为是加法，所以result初始传参时 传0。tail_add(100,0)
def tail_add(n,result):
    if n == 0:
        return result
    else:
        return tail_add(n-1,n+result)
# print(tail_add(100,0))

# 1*2*3*···*n的尾递归算法，因为是乘法，所以result初始传参时 传1。tail_factorial(5,1)
# 另外，0!=1
def tail_factorial(n,result):
    if n == 0:
        return 1
    elif n == 1:
        return result
    else:
        return tail_factorial(n-1,n*result)
# print(tail_factorial(5,1))

# 斐波那契数列第n位是多少，这个函数就是求这个“多少”。初始传实参a=0，b=1
def tail_fibonacci(n,a,b):
    if n == 0:
        return a
    else:
        return tail_fibonacci(n-1,b,a+b)
# print(tail_fibonacci(5,0,1))