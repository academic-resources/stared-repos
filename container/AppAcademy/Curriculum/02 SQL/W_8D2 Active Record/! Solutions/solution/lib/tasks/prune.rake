namespace :prune do
  task old_urls: :environment do
    minutes = ENV['minutes'].to_i || 144
    puts "Pruning old urls..."
    ShortenedUrl.prune(minutes)
  end
end
