import phonenumbers
from phonenumbers import geocoder

phone_number2 = phonenumbers.parse("+919014705402")


print(geocoder.description_for_number(phone_number2,'en'))
