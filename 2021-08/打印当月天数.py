# 输入月份
# 如果是2月:
#     需要再输入年份。
# 输出当月天数

y = m = input('input month(1-12):')
if m.isnumeric() and int(m) == 2:
    y = input('input year(1900-2050):') + '0'
print((m.isnumeric() and y.isnumeric() and 1 <= int(m) <= 12 and (1900 <= int(y) / 10 <= 2050 or y == m)) and ((int(m) == 2 and y[:-1] + '年' or '') + str(m) + '月有' + str(bool((int(y) + 4000) / 10 % 4 == 0 and (int(y) + 4000) / 10 % 100 != 0 or (int(y) + 4000) / 10 % 400 == 0) + [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][int(m) - 1]) + '天') or '输入错误')
