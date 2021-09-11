json.array! @gifts do |gift|
    json.partial! 'gift', gift: gift 
    
end

