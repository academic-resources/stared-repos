data= 'juan.marco@teslamotors.com Sat Jan 5'

atpos = data.find('@')
print atpos

sppos = data.find(' ',atpos)
print sppos

domain = data[atpos+1:sppos]
print domain
