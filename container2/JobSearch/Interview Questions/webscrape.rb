
require "nokogiri"
require "httparty"
require "csv"

def scrape(city)
  page = HTTParty.get("https://#{city}.craigslist.org/search/apa?min_bedrooms=3&max_bedrooms=3&min_bathrooms=2&max_bathrooms=2&availabilityMode=0&sale_date=all+dates")
  parsed_page = Nokogiri::HTML(page)
  paragraphs = parsed_page.css("p.result-info")
  output = paragraphs.map do |p|
    [
      p.css("a.result-title").map { |link| link["href"] }[0],
      p.css("span.result-meta span.result-price").map(&:text)[0],
      p.css("span.result-meta span.result-hood").map(&:text)[0],
    ]
  end

  File.open("for_rent_#{city}.csv", "w") do |f|
    f.write(output.inject([]) do |csv, row|
      csv << CSV.generate_line(row)
    end.join(""))
  end
end

scrape("miami")