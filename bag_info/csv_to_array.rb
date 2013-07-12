require 'csv'
require 'kconv'

CSV.foreach("bags.csv"){|row|
  row = row.map { |v| /^[\d.]+$/ =~ v ? v : "\"#{v}\""}
  puts "[ #{row.join(', ').toutf8} ],"
}
