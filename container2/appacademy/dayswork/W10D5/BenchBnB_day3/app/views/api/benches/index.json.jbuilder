@benches.each do |b|
  json.set! b.id do
    json.partial! "api/benches/bench", bench: b
  end
end
