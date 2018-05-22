def quadratic(x, y, z):#求ax*x+bX+c=0的值
	dat=y*y-4*x*z
	print('',dat,math.sqrt(dat))
	if dat>=0:
		x1=(-y+math.sqrt(dat))/2*x
		x2=(-y-math.sqrt(dat))/2*x
		print('',x1,x2)
	else:
		#print('无实数根')

quadratic(1,5,6)















